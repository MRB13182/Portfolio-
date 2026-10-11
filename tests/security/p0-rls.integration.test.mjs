import test from 'node:test';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

const env = process.env;
const required = [
  'P0_TEST_SUPABASE_URL',
  'P0_TEST_SUPABASE_ANON_KEY',
  'P0_TEST_ADMIN_EMAIL',
  'P0_TEST_ADMIN_PASSWORD',
  'P0_TEST_NON_ADMIN_EMAIL',
  'P0_TEST_NON_ADMIN_PASSWORD',
];
const missing = required.filter((key) => !env[key]);
const enabled = missing.length === 0;
const skipReason = 'Requires an isolated Supabase security-test project and dedicated test accounts; missing: ' + missing.join(', ');

test('P0 Auth/RLS/Storage integration: allow intended roles and deny all others', {
  skip: !enabled ? skipReason : false,
}, async (t) => {
  assert.ok(/^https:\/\//.test(env.P0_TEST_SUPABASE_URL), 'test project URL must use HTTPS');

  const anon = createClient(env.P0_TEST_SUPABASE_URL, env.P0_TEST_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const admin = createClient(env.P0_TEST_SUPABASE_URL, env.P0_TEST_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const nonAdmin = createClient(env.P0_TEST_SUPABASE_URL, env.P0_TEST_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const adminLogin = await admin.auth.signInWithPassword({
    email: env.P0_TEST_ADMIN_EMAIL,
    password: env.P0_TEST_ADMIN_PASSWORD,
  });
  assert.ifError(adminLogin.error);
  assert.ok(adminLogin.data.user, 'dedicated admin test account must authenticate');

  const nonAdminLogin = await nonAdmin.auth.signInWithPassword({
    email: env.P0_TEST_NON_ADMIN_EMAIL,
    password: env.P0_TEST_NON_ADMIN_PASSWORD,
  });
  assert.ifError(nonAdminLogin.error);
  assert.ok(nonAdminLogin.data.user, 'dedicated non-admin test account must authenticate');

  const { data: adminAuthorization, error: adminAuthorizationError } = await admin.rpc('is_portfolio_admin');
  assert.ifError(adminAuthorizationError);
  assert.equal(adminAuthorization, true, 'provisioned test admin must pass DB-side authorization');

  const { data: nonAdminAuthorization, error: nonAdminAuthorizationError } = await nonAdmin.rpc('is_portfolio_admin');
  assert.ifError(nonAdminAuthorizationError);
  assert.equal(nonAdminAuthorization, false, 'ordinary authenticated identity must not be an admin');

  const publicRead = await anon.from('projects').select('id').limit(1);
  assert.ifError(publicRead.error, 'public portfolio content should remain readable');

  const id = `p0-security-test-${randomUUID()}`;
  const messageToken = randomUUID();
  const storagePath = `p0-security-test/${randomUUID()}.png`;
  const uploadedByAdmin = `p0-security-test/${randomUUID()}.png`;
  let createdProject = false;
  let createdMessage = false;
  let createdAdminStorage = false;
  let messageId = null;

  try {
    // Anonymous users cannot perform protected CMS writes.
    const anonProject = await anon.from('projects').insert([{
      id: `${id}-anon`,
      title: 'P0 test must be denied',
      category: 'Full Stack',
    }]);
    assert.ok(anonProject.error, 'anonymous CMS insert must be denied');

    // Authenticated non-admins still cannot write CMS data.
    const nonAdminProject = await nonAdmin.from('projects').insert([{
      id,
      title: 'P0 test must be denied',
      category: 'Full Stack',
    }]);
    assert.ok(nonAdminProject.error, 'non-admin CMS insert must be denied');

    // A DB-verified admin must be able to use the CMS.
    const adminProject = await admin.from('projects').insert([{
      id,
      title: 'P0 security integration fixture',
      category: 'Full Stack',
      description: 'Temporary test fixture created by the isolated P0 test suite.',
    }]);
    assert.ifError(adminProject.error);
    createdProject = true;

    const updateByNonAdmin = await nonAdmin
      .from('projects')
      .update({ title: 'Unauthorized update' })
      .eq('id', id)
      .select('id');
    assert.ifError(updateByNonAdmin.error);
    assert.equal(updateByNonAdmin.data?.length ?? 0, 0, 'RLS must hide the protected row from non-admin updates');

    const verifyProject = await admin.from('projects').select('title').eq('id', id).single();
    assert.ifError(verifyProject.error);
    assert.equal(verifyProject.data.title, 'P0 security integration fixture');

    // Contact submission is the only intended public write path.
    const publicMessage = await anon.from('contact_messages').insert([{
      name: 'P0 Test',
      email: 'p0-security-test@example.invalid',
      subject: `P0 security fixture ${messageToken}`,
      message: 'Temporary integration test message. Safe to delete.',
      status: 'unread',
    }]).select('id').single();
    assert.ifError(publicMessage.error);
    assert.ok(publicMessage.data?.id);
    createdMessage = true;
    messageId = publicMessage.data.id;

    const anonReadMessages = await anon.from('contact_messages').select('id').eq('id', messageId);
    assert.ifError(anonReadMessages.error);
    assert.equal(anonReadMessages.data?.length ?? 0, 0, 'anonymous user must not read contact messages');

    const nonAdminReadMessages = await nonAdmin.from('contact_messages').select('id').eq('id', messageId);
    assert.ifError(nonAdminReadMessages.error);
    assert.equal(nonAdminReadMessages.data?.length ?? 0, 0, 'non-admin must not read contact messages');

    const unauthorizedMessageDelete = await nonAdmin
      .from('contact_messages')
      .delete()
      .eq('id', messageId)
      .select('id');
    assert.ifError(unauthorizedMessageDelete.error);
    assert.equal(unauthorizedMessageDelete.data?.length ?? 0, 0, 'non-admin must not delete contact messages');

    const adminMessage = await admin.from('contact_messages').select('id').eq('id', messageId).single();
    assert.ifError(adminMessage.error);
    assert.equal(adminMessage.data.id, messageId);

    // Database grants/RLS must prevent self-enrolment in the admin allowlist.
    const selfGrant = await nonAdmin.from('admin_users').update({
      role: 'admin',
      user_id: nonAdminLogin.data.user.id,
    }).eq('email', env.P0_TEST_NON_ADMIN_EMAIL).select('user_id');
    assert.ok(selfGrant.error || (selfGrant.data?.length ?? 0) === 0,
      'ordinary users must not grant themselves admin privileges');

    const selfInsert = await nonAdmin.from('admin_users').insert([{
      email: env.P0_TEST_NON_ADMIN_EMAIL,
      user_id: nonAdminLogin.data.user.id,
      role: 'admin',
    }]).select('id');
    assert.ok(selfInsert.error || (selfInsert.data?.length ?? 0) === 0,
      'ordinary users must not insert their own admin grant');
    const recheckNonAdmin = await nonAdmin.rpc('is_portfolio_admin');
    assert.ifError(recheckNonAdmin.error);
    assert.equal(recheckNonAdmin.data, false);

    // No non-admin storage upload is allowed. The admin can upload and clean up its own fixture.
    const tinyPng = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0b, 0x49, 0x44, 0x41,
      0x54, 0x78, 0x9c, 0x63, 0x60, 0x00, 0x02, 0x00,
      0x00, 0x05, 0x00, 0x01, 0xa5, 0xf6, 0x45, 0x40,
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
      0x42, 0x60, 0x82,
    ]);
    const deniedUpload = await nonAdmin.storage.from('project-images').upload(storagePath, tinyPng, {
      contentType: 'image/png',
      upsert: false,
    });
    assert.ok(deniedUpload.error, 'non-admin Storage upload must be denied');

    const adminUpload = await admin.storage.from('project-images').upload(uploadedByAdmin, tinyPng, {
      contentType: 'image/png',
      upsert: false,
    });
    assert.ifError(adminUpload.error);
    createdAdminStorage = true;

    const deniedOverwrite = await nonAdmin.storage.from('project-images').upload(uploadedByAdmin, tinyPng, {
      contentType: 'image/png',
      upsert: true,
    });
    assert.ok(deniedOverwrite.error, 'non-admin must not replace an existing protected object');

    const deniedDelete = await nonAdmin.storage.from('project-images').remove([uploadedByAdmin]);
    assert.ok(deniedDelete.error, 'non-admin must not delete protected Storage objects');

    // Logout clears the SDK session; a subsequent auth-bound admin predicate must be false.
    const logout = await admin.auth.signOut({ scope: 'local' });
    assert.ifError(logout.error);
    assert.equal((await admin.auth.getSession()).data.session, null);
    const afterLogout = await admin.rpc('is_portfolio_admin');
    assert.ifError(afterLogout.error);
    assert.equal(afterLogout.data, false, 'cleared session must not retain admin authorization');
  } finally {
    // Cleanup is restricted to generated fixture IDs/paths only.
    // The assertions above test local logout, so acquire a fresh dedicated cleanup session.
    // Cleanup queries are scoped only to UUID-derived fixtures created in this run.
    const cleanupAdmin = createClient(env.P0_TEST_SUPABASE_URL, env.P0_TEST_SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const cleanupLogin = await cleanupAdmin.auth.signInWithPassword({
      email: env.P0_TEST_ADMIN_EMAIL,
      password: env.P0_TEST_ADMIN_PASSWORD,
    });
    if (!cleanupLogin.error) {
      if (createdMessage && messageId) await cleanupAdmin.from('contact_messages').delete().eq('id', messageId);
      if (createdAdminStorage) await cleanupAdmin.storage.from('project-images').remove([uploadedByAdmin]);
      if (createdProject) await cleanupAdmin.from('projects').delete().eq('id', id);
      await cleanupAdmin.auth.signOut({ scope: 'local' });
    }
    await nonAdmin.auth.signOut({ scope: 'local' });
    await anon.auth.signOut({ scope: 'local' });
  }
});
