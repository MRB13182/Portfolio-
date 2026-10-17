# Portfolio Super Admin — Implementation Brief (READ FIRST)

## Goal
Refactor the existing portfolio repository `MRB13182/Portfolio-` to use a protected, file-based Super Admin configuration workflow inspired by the existing `MRB13182/RagDay27` project's `src/super-admin/` conventions. READ BOTH REPOSITORIES FIRST, then implement in the portfolio codebase. Do not blindly copy RagDay27 code because its domain and database are different.

This is an implementation specification, not permission to merge or deploy without verification. Preserve the public portfolio's appearance and all current working behavior except the obsolete hidden passcode-entry workflow that must be removed.

## Required 11 Super Admin Sections
These are the ONLY main navigation sections:
1. Overview
2. Profile & Bio
3. Projects
4. Skills Matrix
5. Experience
6. Education
7. Certificates
8. Social Links
9. Messages Inbox
10. Footer CMS
11. Website Settings

## Repository reconnaissance — mandatory before editing
1. Inspect all files in both repositories. For RagDay27, specifically study:
   - `src/super-admin/README.md`
   - `src/lib/superAdminConfig.ts`
   - `src/lib/superAdminTextSettings.ts`
   - `src/lib/supabase.ts`
   - `src/components/AdminPortal.tsx`
   - `src/components/Footer.tsx`
   - `src/App.tsx`
   - `scripts/verify-super-admin-structure.mjs`
   - `src/super-admin/**` text and picture assets
2. In the portfolio inspect:
   - `src/App.tsx`
   - `src/components/admin/AdminLayout.tsx`
   - `src/components/admin/ProtectedRoute.tsx`
   - `src/components/common/PasscodeModal.tsx`
   - `src/context/AuthContext.tsx`
   - all 11 current admin page components
   - `src/context/DataContext.tsx`, data/service/repository layers
   - Supabase schema and migrations, RLS, Storage policies, environment setup, and README/package scripts.
3. Write a concise codebase map before changes. Identify every place a portfolio edit can happen (admin form, hidden footer trigger, client config, local/session storage, exposed routes, direct Supabase access and policies). Ensure no old edit path remains active after migration.

## Architecture
Create a single protected Super Admin console in the existing portfolio app. Reuse the existing 11 admin page components and data flows wherever reasonable; do not create a parallel second application or duplicate 11 page implementations.

Create a protected configuration directory following the spirit of RagDay27:
`src/super-admin/`
- `README.md`: security contract, folder map, editing rules, setup/checks.
- `01. profile-bio/Text/` and `Pic/`
- `02. projects/` with text/config per project and associated `Pic/` assets
- `03. skills-matrix/`
- `04. experience/`
- `05. education/`
- `06. certificates/` with certificate images
- `07. social-links/`
- `08. messages-inbox/` (do not store message contents as committed files; messages stay in the database)
- `09. footer-cms/Text/` and `Pic/`
- `10. website-settings/Text/` and `Pic/`
- `11. overview/` (derived statistics, never a source of truth)
Use clear, stable names and include only files that are genuinely required. A file-based folder is a default/template and build-time asset source; never pretend browser edits can alter Git-tracked files on the deployed website. Runtime edits must persist through a secure server/database/storage API, and export/download options may generate files for the owner.

## Content and media editing
For all applicable sections, provide:
- Create, read, update, delete, reorder, visible/hidden, and featured controls where meaningful.
- Human-friendly form fields for structured data, not just a raw-text editor.
- Plain-text editing for approved text/config values with validation and safe preview.
- Image upload/replacement, preview, alt text, file-size/type validation, remove/reset-to-default, and clear upload progress/errors.
- Keep pictures as image files; never encode or reinterpret image assets as editable text.
- Support replacement of profile photo, project covers/gallery, certificate images, logo/favicon, and footer imagery where used by the public website.
- Update the public portfolio immediately after a successful server confirmation; show unsaved/saved/error state and provide discard/cancel.
- Validate input, safely render plain text, and sanitize allowed rich text. Do not use unsafe raw HTML. If rich text is supported, use an allowlist sanitizer.

## Super Admin access model — critical
The owner must be the only person able to edit the Super Admin configuration, until the owner explicitly authorizes a change. Normal visitors and any non-owner/admin account must be unable to change public portfolio content.

Remove the portfolio's hidden footer click/press trigger and passcode modal completely from the public website. Do not leave a visible lock icon, secret gesture, known passcode, `/admin/login` shortcut or client-side alternative. The public footer should be only the normal portfolio footer content.

Do NOT use client-side passcode arrays, hardcoded passwords, `localStorage` authentication flags, URL obscurity, hidden gestures, or front-end-only route guards as security. Remove the known weak passcode variants from `src/context/AuthContext.tsx`, remove reliance on `portfolio_admin_passkey_auth`, and remove the old `PasscodeModal` flow. Search the complete repo for all passcode strings and references before finishing. Do not repeat any discovered credential values in docs.

Implement server-verified owner identity. Prefer Supabase Auth with owner identity allow-list and server-side authorization. Require MFA for owner access if available, rate-limit failed sign-ins, use secure session handling, expire sessions, support explicit logout, validate the owner role on the server for every write, and deny by default. Never expose service-role keys in client bundles. Store secrets only in the host's secret manager/environment. The publishable/anon key may be client-side only when RLS is correctly restrictive.

## Database, API, and storage security
Inspect existing Supabase schema before modifying it. Add migrations (do not silently rewrite production data) to ensure:
- Public clients can SELECT only fields/content intended for public display.
- Public visitors can INSERT a contact message only with strict validation; they cannot SELECT, update, or delete inbox messages.
- Portfolio writes, settings writes, upload/delete operations, and content management are restricted to the owner-authorized server identity.
- Never use policies like `USING (true) WITH CHECK (true)` for authenticated write access.
- Role/owner checks use verified identity claims or secure server-side records, not a user-controlled client flag.
- Storage uploads/updates/deletes are protected; bucket paths are isolated and MIME/size checked.
- Keep public image URLs only for assets intended to be public. Keep private records private.
- Use least privilege and test both positive and negative cases with anon, normal authenticated user, and owner session.
- Do not commit real passwords, API keys, Supabase service-role keys, contact-message PII, or private files.

## Existing content / schema compatibility
Preserve all currently stored portfolio content and relationships. Do not seed fake items on top of real data. For each of the 11 sections, map existing fields and rows to the current UI before editing. Provide safe migrations/backups and document rollback steps. Keep messages in their existing database table, not in checked-in files. Do not delete portfolio data. Avoid broad refactors outside scope.

## UI/UX
Build a premium, responsive Super Admin dashboard consistent with the portfolio's existing aesthetic. Include:
- Clear left navigation for exactly the 11 sections.
- Overview cards and recent inbox summary using real data.
- Search/filter, pagination where appropriate, loading/empty/error states.
- Desktop, tablet, and mobile layouts; keyboard accessible controls, labels, focus states, and confirmation before destructive operations.
- Image thumbnails, lightbox/preview and sensible upload limits.
- Explicit save, cancel, reset, and success/error feedback.
- A clear warning for destructive changes and a restore/reset option where safe.
- No admin UI rendered to a visitor before authorization is confirmed.

## README and supporting files
Create/update the project README with:
- Overview of the owner-only Super Admin.
- The exact 11 sections and editable fields.
- Architecture/data-flow diagram in Mermaid.
- Folder structure with examples for Text and Pic assets.
- Environment variable names (names only; no values).
- Supabase migrations and RLS/storage setup steps.
- Local development, lint, verification and build commands.
- Owner setup/MFA instructions.
- Backup/export, rollback, and recovery procedure.
- Security limitations and deployment checklist.
Create `src/super-admin/README.md` documenting which configuration/assets are protected and what normal development must not edit. Add an automated verification script and package script (e.g. `verify:super-admin`) that checks required folders/files and asserts that the old footer trigger, legacy passcode modal, hardcoded passcode checks, and unsafe broad write policies are not being reintroduced. Validation must report missing required structure; it must NEVER recreate protected files automatically.

## Implementation steps
1. Inspect both projects completely and document current behaviour and dependencies.
2. Map the portfolio's current fields and existing database data to the 11 sections.
3. Design a migration plan with rollback.
4. Remove old hidden footer trigger and insecure front-end passcode auth.
5. Add server-verified owner authentication and deny-by-default authorization.
6. Add owner-only protected dashboard and use exactly the 11 sections listed above.
7. Wire every section to real validated CRUD/data services.
8. Add secure image upload/storage with preview and reset.
9. Add migrations and restrictive RLS/storage policies; do not make broad public data writes.
10. Add README, protected folder docs, automated checks, and deployment instructions.
11. Run type-check/lint, verification script, production build, relevant tests; fix failures before declaring completion.
12. Review the final diff file by file and search for old triggers, old passcode strings, localStorage auth flags, exposed secrets, unsafe SQL policies, and unprotected write paths.

## Acceptance criteria
- Exactly 11 main sections are accessible after owner authentication.
- The public website has no hidden footer admin trigger, passcode popup, public login route, or client-only route to editing.
- All 11 sections edit the live portfolio data and media only after verified owner authorization.
- Unauthenticated and non-owner attempts to write content, settings, messages, or storage are rejected server-side.
- The current portfolio remains visually and functionally intact for visitors.
- Real data is retained; all migrations are reversible/documented.
- README and automated validation are included.
- Build and type checks pass.
- Provide a final report listing changed files, migrations applied (or not applied), tests run, remaining risks and manual deployment steps. Do not claim live Supabase/deployment changes unless actually completed and verified.

## Execution safety
This is an authorization/security-sensitive refactor. Do not remove live functionality or alter production data until the inspected implementation and migration plan make the impact clear. Never modify RagDay27 itself; use it only as a read-only reference. Work only in `MRB13182/Portfolio-`. Avoid changing `src/super-admin/**` without explicit owner authorization for the particular protected file. If the implementation prompt itself is not explicit enough to authorize these project-level security changes, stop and report the exact blocker rather than inventing credentials or relaxing access controls.
