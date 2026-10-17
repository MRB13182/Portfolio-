# Portfolio Super Admin — বিস্তারিত বাস্তবায়ন নির্দেশনা

## উদ্দেশ্য
বিদ্যমান `MRB13182/Portfolio-` রিপোজিটরিতে RagDay27-এর `src/super-admin/`-এর ফাইলভিত্তিক কনফিগারেশন নীতি অনুসরণ করে একটি নিরাপদ, owner-only Super Admin CMS তৈরি করতে হবে। আগে দুটি রিপোজিটরির কোড পড়ে বুঝবে, তারপর Portfolio-তে কাজ করবে। RagDay27-এর কোড হুবহু কপি করবে না—তার ডোমেইন ও ডেটাবেস আলাদা।

## Super Admin-এর একমাত্র ১১টি প্রধান সেকশন
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

## কাজ শুরুর আগে পুরো কোড পড়া বাধ্যতামূলক
RagDay27-এ দেখবে:
- `src/super-admin/README.md`
- `src/lib/superAdminConfig.ts`
- `src/lib/superAdminTextSettings.ts`
- `src/lib/supabase.ts`
- `src/components/AdminPortal.tsx`
- `src/components/Footer.tsx`
- `src/App.tsx`
- `scripts/verify-super-admin-structure.mjs`
- `src/super-admin/**`-এর Text/Pic asset structure

Portfolio-তে দেখবে:
- `src/App.tsx`, `src/components/admin/AdminLayout.tsx`
- `src/components/admin/ProtectedRoute.tsx`
- `src/components/common/PasscodeModal.tsx`
- `src/context/AuthContext.tsx`
- এগারোটি বর্তমান admin page
- `DataContext`, সব data/service/repository layer
- Supabase schema, migrations, RLS/storage policies, environment এবং README/package scripts

প্রথমে একটি codebase map তৈরি করবে: কোথা থেকে public content বদলানো যায়, hidden footer trigger কোথায়, client storage কোথায়, কোন route-এ editor আছে, এবং কোন database/storage write path আছে। তারপর migration পরিকল্পনা করবে।

## ফাইল ও ডিরেক্টরি
বিদ্যমান অ্যাপের মধ্যেই `src/super-admin/`-এ সুশৃঙ্খল protected config structure ও একটি বিস্তারিত `README.md` তৈরি করবে। প্রয়োজন অনুযায়ী এই ধরনের ফোল্ডার থাকবে:
- `01. profile-bio/Text/`, `Pic/`
- `02. projects/` — প্রতিটি project-এর structured text/config ও ছবি
- `03. skills-matrix/`
- `04. experience/`
- `05. education/`
- `06. certificates/` — certificate images-সহ
- `07. social-links/`
- `08. messages-inbox/` — message content Git-এ text file হিসেবে রাখবে না; database-এ থাকবে
- `09. footer-cms/Text/`, `Pic/`
- `10. website-settings/Text/`, `Pic/`
- `11. overview/` — বাস্তব ডেটা থেকে তৈরি summary; নিজে আলাদা data source নয়

ফাইলভিত্তিক ফোল্ডার default/config asset ও project structure-এর জন্য। live website-এর browser থেকে Git-tracked file সরাসরি পরিবর্তন করা সম্ভব বলে দাবি করা যাবে না। Runtime পরিবর্তন secure server/database/storage API দিয়ে persist করতে হবে। দরকার হলে owner-এর জন্য export/download দেওয়া যাবে।

## প্রতিটি সেকশনের কাজ
যেখানে প্রযোজ্য, create/read/update/delete, reorder, featured/visible toggle থাকবে। শুধু raw text নয়—Profile, Project, Skill, Experience, Education, Certificate ও Social link-এর জন্য যথাযথ structured form দিতে হবে। Text field validate করবে, preview ও cancel/discard থাকবে, save success/error স্পষ্ট দেখাবে। সব প্রাসঙ্গিক ছবির জন্য upload, replace, preview, alt text, type/size validation, progress, remove বা reset-to-default থাকবে। ছবি কখনো text হিসেবে পড়বে না। Profile photo, project cover/gallery, certificate image, logo/favicon, footer image ইত্যাদি public site-এ ব্যবহৃত asset বদলানো যাবে। Database নিশ্চিত করার পরে public site-এ update দেখাবে।

Plain text নিরাপদভাবে render করবে। Raw HTML সরাসরি ব্যবহার করবে না; rich text প্রয়োজন হলে strict allowlist sanitizer ব্যবহার করবে।

## Owner-only নিরাপত্তা — অত্যন্ত গুরুত্বপূর্ণ
Super Admin সম্পাদনার ক্ষমতা শুধু অনুমোদিত owner-এর থাকবে, যতক্ষণ owner নিজে পরিবর্তনের অনুমতি না দেন। Public visitor কিংবা সাধারণ ব্যবহারকারী portfolio content বদলাতে পারবে না।

Portfolio public website থেকে hidden footer click/long-press trigger, lock icon, passcode popup/modal, public admin-login shortcut এবং পুরোনো client-side passcode flow পুরোপুরি সরাবে। কোনো গোপন gesture বা URL জানা থাকাকে security হিসেবে গণ্য করবে না।

Hardcoded password/passcode list, client-side passcode comparison, `localStorage`-এ auth flag বা শুধু frontend route guard ব্যবহার করবে না। পুরোনো AuthContext passcode bypass ও persistent auth-flag flow বাদ দেবে। পুরো repository-তে পুরোনো passcode ও trigger-এর সব reference খুঁজে দেখবে; README-তে কখনো credential value লিখবে না।

Supabase Auth দিয়ে server-verified owner identity ব্যবহার করবে। Owner allow-list বা role check server-side হবে; সম্ভব হলে MFA, rate-limited failed login, session expiry এবং proper logout যুক্ত করবে। প্রতিটি write request server-side authorize হবে এবং default হবে deny। Service-role key কখনো client bundle-এ প্রকাশ করবে না; secret host secret manager/environment-এ থাকবে। Publishable/anon key client-এ থাকলেও restrictive RLS দরকার।

## Database, RLS ও storage
বর্তমান Supabase schema আগে পড়ে বুঝবে। Production data মুছে না দিয়ে প্রয়োজনীয় migration যোগ করবে এবং rollback লিখবে।
- Public user শুধু public portfolio content পড়তে পারবে।
- Contact form validated message insert করতে পারবে, কিন্তু inbox message পড়া/পরিবর্তন/মুছতে পারবে না।
- Portfolio content, settings, upload/update/delete—সব write শুধু verified owner করতে পারবেন।
- Authenticated সবাইকে unrestricted write দেয় এমন `USING (true) WITH CHECK (true)` policy ব্যবহার করবে না।
- User-controlled client flag দিয়ে role/owner check করবে না।
- Storage-এ upload/update/delete owner-protected, path-isolated এবং MIME/size validated হবে।
- Public URL শুধু public asset-এর জন্য; private message ও ব্যক্তিগত তথ্য private থাকবে।
- anon, normal authenticated user ও owner session—তিন ধরনের positive/negative security test করতে হবে।
- Password, API key, service-role key, private messages বা ব্যক্তিগত তথ্য Git-এ commit করবে না।

## UI/UX
Portfolio-র বর্তমান visual identity বজায় রেখে responsive premium dashboard বানাবে। Left navigation-এ ঠিক ১১টি section থাকবে। Overview-তে real data statistics ও inbox summary থাকবে। Search/filter, প্রয়োজনমতো pagination, loading/empty/error states, mobile/tablet/desktop layout, keyboard accessibility, clear labels ও focus states থাকবে। Destructive action-এর আগে confirmation এবং যেখানে নিরাপদ সেখানে reset/restore থাকবে। Owner authorization যাচাই না হওয়া পর্যন্ত admin UI দেখাবে না।

## README ও automated validation
Root README-তে Super Admin overview, ১১টি section, editable field list, Mermaid data-flow diagram, folder structure, environment variable-এর নাম (secret value নয়), Supabase migration/RLS/storage setup, local dev/lint/build/check commands, owner/MFA setup, backup/rollback এবং deployment checklist লিখবে।

`src/super-admin/README.md`-তে protected folder/file policy লিখবে। একটি verification script ও package command (যেমন `verify:super-admin`) যোগ করবে যা directory/file structure পরীক্ষা করবে এবং পুরোনো footer trigger, PasscodeModal flow, hardcoded passcode, client-side auth flag ও broad write policy আবার যোগ হয়েছে কিনা পরীক্ষা করবে। কোনো file অনুপস্থিত হলে script error দেবে—নিজে থেকে ফাইল বানিয়ে দেবে না।

## বাস্তবায়নের ধাপ
1. দুই repository পড়ে বর্তমান architecture নথিভুক্ত করো।
2. ১১টি section-এর UI/data field-কে বর্তমান schema ও stored content-এর সঙ্গে map করো।
3. Migration, backup ও rollback পরিকল্পনা করো।
4. পুরোনো hidden footer trigger ও insecure client-side passcode auth সরাও।
5. Server-verified owner login ও deny-by-default write authorization যোগ করো।
6. বিদ্যমান app-এ protected dashboard ও ঠিক ১১টি section যুক্ত করো।
7. প্রতিটি section-কে real validated CRUD service-এ যুক্ত করো।
8. Secure image upload/storage, preview এবং reset যুক্ত করো।
9. প্রয়োজনীয় migration ও restrictive RLS/storage policy যোগ করে security test করো।
10. README, folder rules ও automated verification যোগ করো।
11. Type-check/lint, verification script, production build ও প্রাসঙ্গিক tests চালিয়ে fail ঠিক করো।
12. Final diff review এবং credential/trigger/storage/RLS/write-path search করো।

## গ্রহণযোগ্যতার শর্ত
- Owner authentication-এর পরে ঠিক ১১টি প্রধান section থাকবে।
- Public site-এ hidden admin trigger, passcode popup বা client-only editing route থাকবে না।
- প্রতিটি section-এর content ও image শুধু verified owner-এর মাধ্যমে বদলানো যাবে।
- Unauthenticated বা non-owner-এর write server-side reject হবে।
- Visitor-facing portfolio অক্ষত থাকবে এবং current real data হারাবে না।
- README, verification script, rollback/deployment নির্দেশনা থাকবে।
- Type-check ও build সফল হতে হবে।
- Final report-এ modified file, migration করা হয়েছে কি না, test result, remaining risk ও manual deployment step থাকবে। বাস্তবে test বা deploy না করে সফল দাবি করা যাবে না।

## Execution safety
RagDay27 শুধু read-only reference; সেটি পরিবর্তন করবে না। কাজ হবে শুধু `MRB13182/Portfolio-`-তে। `src/super-admin/**`-এর protected file পরিবর্তনের আগে সংশ্লিষ্ট নির্দিষ্ট file-এ owner-এর স্পষ্ট অনুমোদন চাইবে। Production data বা live functionality-তে destructive change করার আগে প্রভাব বুঝে migration/rollback প্রস্তুত করবে। Prompt অস্পষ্ট হলে credential উদ্ভাবন বা security দুর্বল না করে সুনির্দিষ্ট blocker রিপোর্ট করবে।
