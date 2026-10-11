# P0 security remediation — deployment and verification notes

## Current status

- Repository audit branch: `security/p0-auth-rls-remediation`
- Supabase project `egpwwzkwwxsrctzyhpnv` reported `INACTIVE` during the audit.
- Database table inventory/migration listing timed out; no production SQL was applied.
- The migration is a reviewable proposal and has not been executed against a live schema.
- Admin authorization fails closed until the migration is deployed and an explicit Auth user is assigned to `public.admin_users.user_id`.

## Admin provisioning

The migration adds `public.admin_users.user_id` linked to `auth.users.id`. Existing email-only allowlist rows do not automatically grant privileges. After restoring the project, verify the intended administrator identity, then set `user_id` using a trusted owner-only database operation. Never add a client-side admin flag or permit users to self-enroll.

Example owner-only provisioning statement (replace placeholders only after verification in the dashboard):

```sql
update public.admin_users
set user_id = '<verified-auth-user-uuid>', role = 'admin'
where lower(email) = lower('<verified-admin-email>');
```

Check exactly one row was updated before relying on it. Do not run this until the target account and email have been independently confirmed.

## Deployment order

1. Restore the correct Supabase project and confirm it is the Portfolio project.
2. Back up schema and data and inspect all actual tables, views, triggers, policies, grants, buckets, and URL usage.
3. Check the migration against the actual schema. The migration intentionally removes existing policies on the listed portfolio tables and all `storage.objects` policies, then recreates explicit policies. Confirm there are no unrelated storage consumers/policies before applying.
4. Apply the migration in a reviewed maintenance window.
5. Assign the intended administrator's verified `auth.users.id` to `admin_users.user_id` using a trusted owner-only action.
6. Run negative tests as anon and as a normal authenticated user; run positive CMS tests as the explicitly provisioned admin.
7. Verify public image/document URLs. For compatibility, the migration retains public reads for `resume-files`, treating portfolio resume downloads as intentionally public. Do not put private or sensitive documents in this bucket. Privatizing it requires changing all stored URL consumers to use authenticated access or short-lived signed URLs first.
8. Run Supabase security advisors and the app's typecheck, tests, and production build. Re-check all policies because this connector could not inspect the inactive database.

## Findings and changes

| Severity | Finding | Change on this branch | Status |
|---|---|---|---|
| P0 | Known hard-coded passcodes and localStorage boolean granted client-side admin state | Replaced passcode auth state with Supabase Auth identity verification and database RPC authorization | Implemented in repository; awaits DB migration and runtime tests |
| P0 | Authenticated users could write portfolio data under `USING (true)` policies | Migration replaces policies with an admin function gate and clears legacy permissive policies on managed tables | Proposed; not applied |
| P0 | Any authenticated user could read/update/delete contact messages | Migration restricts read/update/delete to database-verified admins; bounded public insert only | Proposed; not applied |
| P0 | Storage policies were global and unrestricted | Migration replaces `storage.objects` policies with bucket-scoped admin writes and explicit public reads | Proposed; requires bucket inventory review |
| P1 | Admin passcode change/reset only updated localStorage | Removed those controls; security page now reports real Supabase Auth/session state | Implemented |
| P1 | Supabase sign-in session alone was treated as administrator status | Context calls `auth.getUser()` and `rpc('is_portfolio_admin')`; authorization errors fail closed | Implemented; runtime verification blocked |

## Verification status

- Static security regression tests, TypeScript check (`tsc --noEmit`), and production build passed in GitHub Actions on the audited branch.
- `tests/security/p0-rls.integration.test.mjs` is an opt-in live integration suite. It is skipped unless the documented test-only environment variables are provided; it must run only against an isolated test project with dedicated admin and non-admin accounts and known test schema.
- The portfolio Supabase project was INACTIVE, so live Auth, RLS, storage, contact-workflow, and advisor verification could not be performed. The migration has not been applied.
- Repository-history/deployment secret scanning and browser-level end-to-end regression tests have not been completed.

A clean migration execution and passing role-based integration tests against an isolated restored database remain required before production-security claims.

## Rollback considerations

- Do not blindly reverse this migration after user data has been written. Policy rollback must restore an audited, captured baseline, not the insecure `USING (true)` policies.
- Before deployment, export existing policy definitions and schema; retain them as a rollback record in a secure admin workspace, not with secrets in Git.
- If app sign-in cannot verify `is_portfolio_admin()`, the app will deny admin access. Do not reintroduce a local passcode fallback; diagnose migration/provisioning instead.


## Isolated integration-test environment

The opt-in test suite in `tests/security/p0-rls.integration.test.mjs` expects all of these environment variables in a separate test-only environment:

- `P0_TEST_SUPABASE_URL`
- `P0_TEST_SUPABASE_ANON_KEY`
- `P0_TEST_ADMIN_EMAIL`
- `P0_TEST_ADMIN_PASSWORD`
- `P0_TEST_NON_ADMIN_EMAIL`
- `P0_TEST_NON_ADMIN_PASSWORD`

The admin account must be explicitly provisioned in that isolated project's `admin_users.user_id` allowlist; the non-admin account must not be provisioned. The suite creates only UUID-scoped fixtures and cleans only the returned message ID, generated project ID, and generated storage path. Do not point these credentials at production.
