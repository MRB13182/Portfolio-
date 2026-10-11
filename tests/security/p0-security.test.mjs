import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');

test('admin context does not grant access with editable localStorage flags or hard-coded passcodes', async () => {
  const auth = await read('src/context/AuthContext.tsx');
  const modal = await read('src/components/common/PasscodeModal.tsx');
  const securityPage = await read('src/pages/admin/AdminSecurityPage.tsx');

  assert.doesNotMatch(auth, /portfolio_admin_passkey_auth|signInWithPasskey|luxury2025|prtf[._-]mrb182|localStorage/);
  assert.match(auth, /supabase\.auth\.getUser/);
  assert.match(auth, /supabase\.rpc\('is_portfolio_admin'\)/);
  assert.doesNotMatch(modal, /signInWithPasskey|Unlock Panel|Enter passcode/i);
  assert.match(modal, /signIn\(email, password\)/);
  assert.doesNotMatch(securityPage, /portfolio_admin_custom_passcode|default passcode|Reset Default|Change Admin Passcode/i);
});

test('admin route fails closed and waits for auth/authorization state', async () => {
  const route = await read('src/components/admin/ProtectedRoute.tsx');
  assert.match(route, /loading/);
  assert.match(route, /if \(!isAdmin\)/);
  assert.match(route, /Navigate to="\/" replace/);
});

test('storage upload validates MIME/size and does not claim local fallback as upload success', async () => {
  const storage = await read('src/lib/supabase.ts');
  assert.match(storage, /MAX_IMAGE_BYTES/);
  assert.match(storage, /MAX_RESUME_BYTES/);
  assert.match(storage, /IMAGE_TYPES/);
  assert.match(storage, /DOCUMENT_TYPES/);
  assert.match(storage, /upsert: false/);
  assert.doesNotMatch(storage, /fileToDataUrl|Base64 local fallback|localDataUrl/);
  assert.match(storage, /if \(!isSupabaseConfigured\)/);
});

test('reviewed SQL migration has database-side admin checks and removes permissive legacy policies', async () => {
  const migration = await read('supabase/migrations/20261011090000_p0_admin_authorization_rls.sql');
  assert.match(migration, /create or replace function public\.is_portfolio_admin\(\)/);
  assert.match(migration, /security definer/i);
  assert.match(migration, /set search_path = pg_catalog, public, auth/i);
  assert.match(migration, /admin\.user_id = \(select auth\.uid\(\)\)/);
  assert.match(migration, /drop policy if exists/);
  assert.match(migration, /p0_admin_contact_read/);
  assert.match(migration, /public\.footer_settings/);
  assert.match(migration, /p0_public_contact_insert/);
  assert.match(migration, /bucket_id in \('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files'\)/);
  assert.doesNotMatch(migration, /for all to authenticated using \(true\) with check \(true\)/i);
  assert.doesNotMatch(migration, /create policy [^;]+on storage\.objects for select[^;]+using \(true\)/i);
});

test('contact message writes fail closed instead of claiming localStorage persistence is server delivery', async () => {
  const messages = await read('src/services/messageService.ts');
  assert.match(messages, /isSupabaseConfigured/);
  assert.match(messages, /Message delivery failed/);
  assert.match(messages, /if \(error \|\| !data\) throw/);
  assert.doesNotMatch(messages, /saveLocalMessages|portfolio_local_messages.*setItem/s);
  assert.doesNotMatch(messages, /const combined = \\[...remote/);
});

test('publishable key config is build/deploy-time only and no privileged key is referenced', async () => {
  const supabase = await read('src/lib/supabase.ts');
  const settings = await read('src/pages/admin/AdminSettingsPage.tsx');
  const example = await read('.env.example');
  assert.doesNotMatch(supabase, /localStorage\.getItem\(['"]supabase_(publishable|anon)_key/);
  assert.doesNotMatch(settings, /savePublishableKey|Save &amp; Connect Key|paste it here to activate/i);
  assert.doesNotMatch(settings, /Admin All (Profiles|Projects|Skills|Experience|Education|Certificates|Socials|Messages|Settings|Footer).*USING \\(true\\)/i);
  assert.match(settings, /20261011090000_p0_admin_authorization_rls\\.sql/);
  assert.doesNotMatch(supabase, /SERVICE_ROLE_KEY|service_role|SUPABASE_SECRET_KEY/i);
  assert.match(example, /YOUR_PUBLISHABLE_KEY/);
});
