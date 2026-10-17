# ⚠️ PROTECTED CODEBASE-BASED SUPER ADMIN CMS
All portfolio content, settings, and media are managed through the 11 numbered directories below.
Edit text files in Text/ and update images in Pic/ to update the live website upon commit & redeploy.

---

## 🏛 Architecture Overview

The previous footer-triggered, passcode-based administrative UI has been replaced with this frontend-only, codebase-driven content architecture under `src/super-admin/`.

This GitOps model provides:
1. **Zero Database Dependency**: Website content updates happen through Git commits and automated deployments.
2. **Strict Type-Safety**: All content is defined in structured TypeScript files with full compile-time checking.
3. **Organized Separation**: Every section contains a dedicated `Text/` directory for configuration & copy and a `Pic/` directory for visual media.
4. **Instant Synchronization**: Modifying any section directly updates the public website components without requiring manual database migration or external CMS logins.

---

## 📁 11 Numbered Super Admin Sections

| # | Directory | Purpose | Primary Content File |
|---|---|---|---|
| **01** | `01-website-settings/` | Website Settings & SEO | `Text/websiteSettings.ts` |
| **02** | `02-profile-bio/` | Profile, Bio, & Stats | `Text/profileBio.ts` |
| **03** | `03-projects/` | Projects & Case Studies | `Text/projectsData.ts` |
| **04** | `04-skills-matrix/` | Technical Skills & Badges | `Text/skillsData.ts` |
| **05** | `05-experience/` | Professional Work History | `Text/experienceData.ts` |
| **06** | `06-education/` | Academic Degrees & Honors | `Text/educationData.ts` |
| **07** | `07-certificates/` | Verified Credentials & Issuers | `Text/certificatesData.ts` |
| **08** | `08-social-links/` | Developer & Social Profiles | `Text/socialLinksData.ts` |
| **09** | `09-messages-inbox/` | Contact Form & Inquiries Config | `Text/messagesConfig.ts` |
| **10** | `10-footer-cms/` | Footer Text & Navigation Links | `Text/footerCms.ts` |
| **11** | `11-overview/` | System Overview & Versioning | `Text/overviewData.ts` |

---

## 🛠 How to Update Website Content

### 1. Update Profile or Bio (`02-profile-bio/`)
Open `src/super-admin/02-profile-bio/Text/profileBio.ts`. Edit `fullName`, `titles`, `bio`, or `stats`. Save the file, commit to Git, and redeploy.

### 2. Add or Edit a Project (`03-projects/`)
Open `src/super-admin/03-projects/Text/projectsData.ts`. Add a new project object to the `projectsData` array with your title, category, tech stack, and links. Place project screenshots in `public/projects/` and reference them in `image`.

### 3. Update Skills (`04-skills-matrix/`)
Open `src/super-admin/04-skills-matrix/Text/skillsData.ts`. Adjust proficiency percentages, add keywords, or reorder skills.

### 4. Update Footer or Copyright (`10-footer-cms/`)
Open `src/super-admin/10-footer-cms/Text/footerCms.ts`. Update `copyrightText`, `centerText`, or `navigationLinks`.

### 5. Contact Form Delivery (`09-messages-inbox/`)
The public contact form dispatches inquiries to the owner's email address (`borshonsweb@gmail.com`). Configuration parameters, spam keyword filters, and message archival templates are located in `src/super-admin/09-messages-inbox/Text/messagesConfig.ts`.

---

## 🛡 Protected File Policy
- Do NOT insert hardcoded passwords, plaintext secrets, or API tokens into these files.
- Always verify your TypeScript types compile cleanly before pushing (`npm run lint` and `npm run build`).
