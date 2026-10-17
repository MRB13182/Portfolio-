# IMPLEMENTATION TASK — Replace the old Portfolio Admin System with a codebase-driven Super Admin

You are an AI coding agent working directly in the existing repository `MRB13182/Portfolio-`. **Implement the changes in the application source code. Do not stop after writing a plan, explanation, issue, or another prompt file.** Inspect the current repository, modify the code, remove obsolete code, run the available checks, and report exactly what changed.

## Goal
Replace the legacy footer-triggered passcode Admin/CMS with a maintainable, frontend-only, codebase-driven content structure under `src/super-admin/`. Website content must be editable by changing committed text/configuration files and image assets, then committing and redeploying. Do not add a backend or database for the new Super Admin.

## Required sections (use this exact order and numbering)
1. `01-website-settings/` — Website Settings
2. `02-profile-bio/` — Profile & Bio
3. `03-projects/` — Projects
4. `04-skills-matrix/` — Skills Matrix
5. `05-experience/` — Experience
6. `06-education/` — Education
7. `07-certificates/` — Certificates
8. `08-social-links/` — Social Links
9. `09-messages-inbox/` — Messages Inbox
10. `10-footer-cms/` — Footer CMS
11. `11-overview/` — Overview

Each section must have an appropriate text/config file and a `Pic/` directory for section-specific image assets where images apply. Use readable, consistent file names; add `.gitkeep` or a short README in asset folders that would otherwise be empty. Use real existing portfolio content where it can be safely migrated—do not invent personal achievements, projects, credentials, or social URLs. Preserve and reuse existing image assets when applicable.

## Required implementation
1. Start by inspecting the actual repository structure and references: app entry/routing, Footer, old auth/passcode modal, ProtectedRoute, AdminLayout/pages, data context/services, Supabase references, package scripts, migrations/policies and public contact form. Build a dependency map before deleting files.
2. Build `src/super-admin/` as a source-of-truth for relevant public website content. Connect the public app to these files so edits to the relevant typed configuration/content files and assets are actually reflected on the public website. Prefer typed TS/JSON/Markdown content modules compatible with the existing stack. Migrate existing static data carefully, preserving the current site design, routes, behavior, copy, responsive layout, accessibility and functional downloads.
3. Remove the footer Admin button and every hidden/long-press/shortcut trigger associated with the old admin flow. Remove the passcode modal, client-side passcode lists, `localStorage` passcode-auth flags, fake auth state, old protected admin routing/layout, and obsolete admin pages/components after confirming no remaining imports. Remove/update references cleanly; do not leave dead code, unused imports, broken routes, or console errors. A direct visit to any retired `/admin/*` URL should safely redirect to the public home route.
4. Make the new structure frontend-only. Do not implement a browser editor that claims it can write directly to Git-tracked source files: ordinary browser JavaScript cannot persist changes to repository files. Explain in the Super Admin README that owners edit text/config files and replace assets in `src/super-admin/`, then commit and redeploy.
5. Backend cleanup must be scoped and dependency-aware. Remove Supabase Auth and database/storage functions, credentials/config, migrations, policies, types and services only when they exclusively supported the old Admin/CMS and are no longer used. Preserve public features that still rely on external services (especially public contact submission) unless you safely replace them; never silently break public functionality just to claim the project has no backend anywhere. The **new Super Admin itself** must not depend on Supabase, a database, authentication service, localStorage persistence, API, or server.
6. Messages Inbox is section 09 but this frontend-only architecture must not fabricate private messages or pretend to store incoming messages. Keep an empty, clearly documented placeholder/config structure. State that a real persistent message inbox/contact submission storage needs an external backend/service and is outside this static Super Admin scope. Preserve existing contact page behavior and document its actual dependency.
7. Add `src/super-admin/README.md` documenting all 11 numbered sections, exact file locations and edit workflow, text/image conventions, how content flows to the website, validation/build steps, the Messages Inbox limitation, and that only explicit owner authorization allows AI agents to modify the protected `src/super-admin/` source files. Also update the repository root README with a concise architecture overview and local build/test steps. If no root README exists, create one.
8. Add a clear protected-file policy near the top of `src/super-admin/README.md`: **Do not edit, rename, move, delete, regenerate, or reformat files under `src/super-admin/` during unrelated work. Only modify those files when the repository owner explicitly authorizes a specific change to them.** Follow this policy for future tasks; do not add misleading security claims. A static route in a frontend bundle cannot be securely hidden from visitors, so do not present a public client-side page as authenticated/secure admin access.
9. Update dependencies and environment examples only if no longer used anywhere after inspection. Do not remove dependencies/features simply because they sound admin-related. Remove admin-specific database policies or migration assets when clearly isolated; never publish secrets. Avoid destructive blanket deletion of shared schema or Supabase assets if public features still use them.
10. Add section starter files with valid schemas/types and realistic placeholders only where actual data is unavailable. Ensure sections with corresponding public UI are genuinely connected to that UI; don't create decorative unused configuration files and claim they drive the site.
11. Run the repository's available lint/type-check/build/test scripts. Fix errors introduced by the changes. If a check cannot run due to missing credentials/environment or unavailable tooling, clearly report that limitation rather than claiming success.

## Constraints and acceptance criteria
- Do not change the reference repository or unrelated public-site behavior/design.
- Do not introduce a new backend or database for Super Admin.
- No footer Admin button, no hidden passcode trigger, no hard-coded passcode, no fake client-side auth flag.
- No obsolete imports/routes/components that are still reachable or referenced.
- All 11 numbered sections exist in `src/super-admin/` with Text/config files and Pic asset folders as applicable.
- Public site renders without runtime/import errors, and migrated text/images are connected to actual website components.
- Root README and `src/super-admin/README.md` are accurate.
- Clearly distinguish what is static/frontend-only from any existing external-service-powered public functionality.
- Make actual code changes directly. A documentation-only result is a failure.

At completion, provide a brief summary of files changed, what legacy admin/backend elements were removed (with evidence), what public external-service functionality was retained, and the exact build/test results. Never claim tests passed unless you actually ran them.