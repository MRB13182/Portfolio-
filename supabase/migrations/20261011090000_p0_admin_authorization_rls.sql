-- P0 security remediation for the Portfolio project.
-- REVIEW BEFORE DEPLOYMENT: this removes existing policies on the managed portfolio tables
-- and storage.objects so permissive policies cannot continue to OR-bypass the new rules.
-- It does not drop tables or delete data. The project was INACTIVE when audited, so this
-- migration has NOT been applied or live-verified.
--
-- Admin provisioning after deployment:
--   1. Ensure the intended administrator has a verified Supabase Auth account.
--   2. Get that account's auth.users.id from the Supabase Dashboard (never from client input).
--   3. As a trusted project owner only, insert/update the corresponding public.admin_users.user_id.
-- Existing email-only admin_users rows intentionally do NOT automatically grant admin rights.

begin;

-- Ensure the authorization source is tied to a concrete Supabase Auth identity.
alter table public.admin_users
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;
-- No client role may mutate admin_users; table/sequence privileges remain owner-only.

-- This SECURITY DEFINER predicate avoids circular RLS checks when other table policies
-- consult the allowlist. Its fixed search_path and fully-qualified names avoid object shadowing.
create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, auth
set row_security = off
as $function$
  select exists (
    select 1
    from public.admin_users as admin
    where admin.user_id = (select auth.uid())
      and lower(admin.role) = 'admin'
  );
$function$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

-- Remove every existing policy on portfolio-managed tables. PostgreSQL permissive policies
-- are OR-combined; leaving an older USING (true) policy would defeat a new admin-only policy.
do $block$
declare
  table_name text;
  policy_row record;
  managed_tables text[] := array[
    'profiles', 'projects', 'skills', 'experience', 'education', 'certificates',
    'social_links', 'site_settings', 'admin_users', 'contact_messages',
    'footer_content', 'footer_settings', 'testimonials', 'activity_logs'
  ];
begin
  foreach table_name in array managed_tables loop
    if to_regclass(format('public.%I', table_name)) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      for policy_row in
        select policyname
        from pg_policies
        where schemaname = 'public' and tablename = table_name
      loop
        execute format('drop policy if exists %I on public.%I', policy_row.policyname, table_name);
      end loop;
    end if;
  end loop;
end;
$block$;

-- Public read is intentionally allowed for portfolio presentation tables only.
create policy p0_public_read_profiles on public.profiles for select to anon, authenticated using (true);
create policy p0_public_read_projects on public.projects for select to anon, authenticated using (true);
create policy p0_public_read_skills on public.skills for select to anon, authenticated using (true);
create policy p0_public_read_experience on public.experience for select to anon, authenticated using (true);
create policy p0_public_read_education on public.education for select to anon, authenticated using (true);
create policy p0_public_read_certificates on public.certificates for select to anon, authenticated using (true);
create policy p0_public_read_social_links on public.social_links for select to anon, authenticated using (true);
create policy p0_public_read_site_settings on public.site_settings for select to anon, authenticated using (true);

-- Optional content tables discovered by the application are handled only if present.
do $block$
begin
  if to_regclass('public.footer_content') is not null then
    execute 'create policy p0_public_read_footer_content on public.footer_content for select to anon, authenticated using (true)';
  end if;
  if to_regclass('public.footer_settings') is not null then
    execute 'create policy p0_public_read_footer_settings on public.footer_settings for select to anon, authenticated using (true)';
  end if;
  if to_regclass('public.testimonials') is not null then
    execute 'create policy p0_public_read_testimonials on public.testimonials for select to anon, authenticated using (true)';
  end if;
end;
$block$;

-- Only actual admins may mutate portfolio content. Public visitors retain read-only access.
do $block$
declare
  table_name text;
  managed_tables text[] := array[
    'profiles', 'projects', 'skills', 'experience', 'education', 'certificates',
    'social_links', 'site_settings', 'footer_content', 'footer_settings', 'testimonials', 'activity_logs'
  ];
begin
  foreach table_name in array managed_tables loop
    if to_regclass(format('public.%I', table_name)) is not null then
      execute format(
        'create policy %I on public.%I for all to authenticated using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()))',
        'p0_admin_manage_' || table_name,
        table_name
      );
    end if;
  end loop;
end;
$block$;

-- Contact submission stays public with bounded fields; messages remain admin-only thereafter.
create policy p0_public_contact_insert
on public.contact_messages
for insert to anon, authenticated
with check (
  length(btrim(name)) between 1 and 120
  and length(btrim(email)) between 3 and 254
  and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  and length(btrim(subject)) between 1 and 200
  and length(btrim(message)) between 1 and 5000
  and coalesce(status, 'unread') = 'unread'
);

create policy p0_admin_contact_read
on public.contact_messages for select to authenticated
using ((select public.is_portfolio_admin()));

create policy p0_admin_contact_update
on public.contact_messages for update to authenticated
using ((select public.is_portfolio_admin()))
with check ((select public.is_portfolio_admin()));

create policy p0_admin_contact_delete
on public.contact_messages for delete to authenticated
using ((select public.is_portfolio_admin()));

-- admin_users is provisioned only through trusted SQL/dashboard/admin procedures, never by users.
-- No client-facing INSERT/UPDATE/DELETE policy is created for admin_users.

-- Storage policy reset is deliberately comprehensive because a broad pre-existing policy can
-- override bucket-specific policies through permissive OR semantics. Inspect any non-portfolio
-- bucket policies in this project before deployment.
do $block$
declare
  policy_row record;
begin
  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
  loop
    execute format('drop policy if exists %I on storage.objects', policy_row.policyname);
  end loop;
end;
$block$;

-- Apply Storage-side MIME/size limits as a second layer behind client validation.
-- Bucket visibility is intentionally left unchanged for compatibility with current public URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('profile-images', 'profile-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('project-images', 'project-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('certificate-images', 'certificate-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('logos', 'logos', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif','image/avif']),
  ('resume-files', 'resume-files', true, 10485760, array['application/pdf'])
on conflict (id) do update
set file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Keep the existing buckets and public URLs. These five buckets currently serve portfolio assets;
-- portfolio resume downloads are treated as intentionally public for compatibility. Do not place
-- private/sensitive documents in resume-files. To privatize that bucket, first migrate URL consumers
-- to authenticated access/signed URLs and verify existing resume links.
create policy p0_public_read_portfolio_assets
on storage.objects for select to anon, authenticated
using (bucket_id in ('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files'));

create policy p0_admin_upload_portfolio_assets
on storage.objects for insert to authenticated
with check (
  (select public.is_portfolio_admin())
  and bucket_id in ('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files')
  and length(name) between 1 and 512
);

create policy p0_admin_update_portfolio_assets
on storage.objects for update to authenticated
using (
  (select public.is_portfolio_admin())
  and bucket_id in ('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files')
)
with check (
  (select public.is_portfolio_admin())
  and bucket_id in ('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files')
);

create policy p0_admin_delete_portfolio_assets
on storage.objects for delete to authenticated
using (
  (select public.is_portfolio_admin())
  and bucket_id in ('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files')
);

commit;
