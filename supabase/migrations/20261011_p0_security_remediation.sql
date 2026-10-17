-- =============================================================================
-- MIGRATION: 20261011_p0_security_remediation.sql
-- TARGET PROJECT: egpwwzkwwxsrctzyhpnv
-- PURPOSE: Remediate P0 Row Level Security and Admin Authentication boundaries
-- =============================================================================

BEGIN;

-- 1. Ensure admin_users table exists and is indexed
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- 2. Seed primary administrator identity
INSERT INTO public.admin_users (email, role)
VALUES ('borshonsweb@gmail.com', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- 3. Create or replace secure admin evaluation function (SECURITY DEFINER with fixed search_path)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')
       OR id = auth.uid()
  );
$$;

-- 4. Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Drop obsolete open/insecure policies if they exist
DROP POLICY IF EXISTS "Admin profiles manage" ON public.profiles;
DROP POLICY IF EXISTS "Admin projects manage" ON public.projects;
DROP POLICY IF EXISTS "Admin skills manage" ON public.skills;
DROP POLICY IF EXISTS "Admin experience manage" ON public.experience;
DROP POLICY IF EXISTS "Admin education manage" ON public.education;
DROP POLICY IF EXISTS "Admin certificates manage" ON public.certificates;
DROP POLICY IF EXISTS "Admin social_links manage" ON public.social_links;
DROP POLICY IF EXISTS "Admin site_settings manage" ON public.site_settings;
DROP POLICY IF EXISTS "Admin users manage" ON public.admin_users;

DROP POLICY IF EXISTS "Admin contact messages select" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin contact messages update" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin contact messages delete" ON public.contact_messages;

DROP POLICY IF EXISTS "Admin Storage Insert" ON storage.objects;
DROP POLICY IF EXISTS "Admin Storage Update" ON storage.objects;
DROP POLICY IF EXISTS "Admin Storage Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public Storage Read" ON storage.objects;

-- 6. Apply strictly enforced role-based management policies
CREATE POLICY "Admin profiles manage" ON public.profiles 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin projects manage" ON public.projects 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin skills manage" ON public.skills 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin experience manage" ON public.experience 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin education manage" ON public.education 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin certificates manage" ON public.certificates 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin social_links manage" ON public.social_links 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin site_settings manage" ON public.site_settings 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin users manage" ON public.admin_users 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

-- 7. Secure Contact Messages: Public can submit inquiries, ONLY verified admin can view/manage
CREATE POLICY "Admin contact messages select" ON public.contact_messages 
  FOR SELECT TO authenticated 
  USING (public.is_admin());

CREATE POLICY "Admin contact messages update" ON public.contact_messages 
  FOR UPDATE TO authenticated 
  USING (public.is_admin());

CREATE POLICY "Admin contact messages delete" ON public.contact_messages 
  FOR DELETE TO authenticated 
  USING (public.is_admin());

-- 8. Secure Storage Policies (only public buckets readable, uploads/deletes restricted to verified admin)
CREATE POLICY "Public Storage Read" ON storage.objects 
  FOR SELECT 
  USING (bucket_id IN ('profile-images', 'project-images', 'certificate-images', 'logos', 'resume-files'));

CREATE POLICY "Admin Storage Insert" ON storage.objects 
  FOR INSERT TO authenticated 
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin Storage Update" ON storage.objects 
  FOR UPDATE TO authenticated 
  USING (public.is_admin());

CREATE POLICY "Admin Storage Delete" ON storage.objects 
  FOR DELETE TO authenticated 
  USING (public.is_admin());

COMMIT;
