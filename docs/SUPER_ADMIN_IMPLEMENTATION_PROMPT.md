# TASK: REPLACE THE PORTFOLIO ADMIN SYSTEM WITH A FRONTEND-ONLY, FILE-BASED SUPER ADMIN

You are working directly in the existing GitHub repository `MRB13182/Portfolio-`. Implement the change in the codebase itself. Do not create another prompt/specification file instead of doing the work.

## Important scope
Build a static/frontend-only Portfolio Super Admin authoring system. Do not add a backend, database, Supabase tables, database migrations, API server, authentication server, or backend dependency for this task. The owner will edit files in the source tree and commit/deploy those edits to update the published portfolio.

Because this is frontend-only, do not claim that browser-based edits securely write to GitHub or permanently change source files on the deployed website. Explain in the README that actual content changes are file-based and require editing/committing the corresponding source files and redeploying. Do not implement browser localStorage as a persistence/security substitute.

## Required first step: inspect the existing code
Inspect the existing Portfolio repository structure, app entry point, footer, current 11 admin screens, authentication context, route guard, data context/services, current content models, images, config, package scripts, and README. Trace every dependency of the existing admin flow before deleting or replacing anything.

Do not reference another repository or instruct an agent to read a reference repository. Work exclusively in this repository.

## Required final structure
Create a protected-by-project-convention, file-based authoring area under `src/super-admin/`, following the existing source tree's conventions:
- `src/super-admin/README.md`
- 11 numbered section folders, each using separate `Text/` and `Pic/` subfolders where appropriate
- 11 sections in this exact order:
  01. Website Settings
  02. Profile & Bio
  03. Projects
  04. Skills Matrix
  05. Experience
  06. Education
  07. Certificates
  08. Social Links
  09. Messages Inbox
  10. Footer CMS
  11. Overview

Each section must have clear human-readable text/config files and image assets where appropriate. Use actual existing Portfolio content and existing public assets when mapping configuration. Do not add fake profile/project/skill/experience/education/certificate/social-link content. Never place private contact-message data in committed files; Messages Inbox should only define its UI structure/static explanation in this frontend-only build and must not invent backend persistence. Do not create dummy working inbox records.

Create a source-code-based editor/preview UI for local development/owner use, but the authoritative content values must come from tracked source files, imported text/assets, or strongly typed TS configuration—not from localStorage. The README must be explicit that editing a static browser preview does not modify Git files. Ensure the 11 section folders are the source/config organization for the implementation; do not create a disconnected unused folder tree.

## Delete the old system, not just hide it
Remove the old footer admin trigger and its password modal flow. Remove old client-side passcode lists and passcode-based/localStorage admin authentication. Remove obsolete admin route guards, old auth context functions, and old admin CMS flows where the new frontend-only system replaces them. Remove legacy code files that become genuinely unused, and remove every stale import, route, callback, package reference, and test reference.

Specifically investigate and handle:
- `src/App.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/common/PasscodeModal.tsx`
- `src/context/AuthContext.tsx`
- `src/components/admin/ProtectedRoute.tsx`
- `src/components/admin/AdminLayout.tsx`
- `src/pages/admin/**`
- `src/context/DataContext.tsx`
- all data services and config imports
- any old admin/login routes and related styles

Do not simply hide the old Admin trigger with CSS. Remove it and its implementation. Delete the obsolete `PasscodeModal.tsx` if unused. Remove hardcoded credentials from source completely; do not repeat them in docs or logs.

Preserve the public site's existing design and working visitor functionality, including homepage, navigation, projects, skills, certificates, contact form, footer text, and resume/download flows as applicable. Do not delete or damage real portfolio content or useful components unrelated to the old admin access workflow.

## File-driven section requirements
For each of the following 11 sections, provide a coherent, working source/config folder. Use a `Text/` folder for human-editable text/config and `Pic/` for image assets, when applicable:
1. Website Settings — title, description and relevant existing static settings; logo/favicon images where used.
2. Profile & Bio — profile text and profile image assets.
3. Projects — per-project text/config and associated cover/gallery images.
4. Skills Matrix — skill definitions and categories using the actual existing content.
5. Experience — experience entries using actual existing content.
6. Education — education entries using actual existing content.
7. Certificates — certificate metadata and associated images.
8. Social Links — actual configured social URLs and labels.
9. Messages Inbox — no private messages or fake records in files; frontend-only placeholder explaining backend inbox persistence is intentionally out of scope.
10. Footer CMS — footer/copyright text and any existing footer asset.
11. Overview — derived overview config/UI only; no duplicate source of truth.

Use typed configuration and import text/image files the way a Vite/TypeScript project supports. Verify bundler support for importing raw text and images before using import syntax. Do not store images as text or base64 giant strings.

## UI requirements
Create a professional responsive frontend preview/authoring interface with exactly these 11 main section entries, in the order above. It should use the project's existing React/TypeScript/styling conventions and visually fit the Portfolio design.

The section screens should allow the owner/developer to inspect the actual file-driven values, preview text/images, and clearly see which source file or image to edit. They must not falsely suggest that buttons persist changes to source files. For editing, either:
- provide meaningful editable forms with an explicit “download/export updated file” workflow that produces a file the owner can place in the repository, or
- present a documented source-file editor/preview workflow with direct links/path hints to each tracked source file.
Do not use fake Save buttons that only update React state. Do not use localStorage as authoritative persistence. Do not include a secret/password entry in the public footer.

For Messages Inbox, show a clear status that persistent inbox management requires a backend and is intentionally disabled in the requested frontend-only architecture.

## README requirements
Create/update the root README and `src/super-admin/README.md`. Document:
- the 11-section directory structure
- which Text/Pic file controls each public website value
- how text and images are updated by editing source files
- how to preview locally, build, verify, and deploy
- that a static web browser cannot safely rewrite committed Git source files
- Messages Inbox is not persistently implemented without a backend
- no backend/database/Auth/Supabase features are included in this frontend-only scope
- how the old Admin entry flow was removed
Do not add actual credentials or secrets.

## Validation / acceptance criteria
- Exactly 11 main sections, in the required order.
- All section content is based on real existing content or honest empty states.
- Section folders are actually used by the app, not orphaned.
- Image assets remain separate image files in Pic folders.
- Public footer contains no Admin button/lock/hidden trigger.
- PasscodeModal and hardcoded passcode auth flow are gone and no stale references remain.
- No backend/database/migration/Supabase dependencies are introduced for the new Super Admin.
- No fake browser persistence; no false claim that browser edits modify source files.
- Public Portfolio behavior and styling remain intact.
- TypeScript checks/lint/build succeed, or exact blockers are clearly reported.
- Add/update a verification script if useful to check the 11 folders/files, no footer trigger, and no legacy passcode references.
- At the end, report the exact changed/deleted files and actual test/build results. Never claim tests were run if they were not.

## Execution instructions
Carry out the implementation now. Inspect existing dependencies, make the required code and file changes, remove the obsolete admin system, connect the 11 file-based sections to actual app content, update README files, and verify the final diff. Do not create another prompt file. Do not perform backend or database work. Do not introduce any new authentication or claim that hiding the entry point is security; this is a static owner-maintained source-file workflow, not a secure runtime admin service.