-- =============================================================================
-- LUXURY PORTFOLIO - SUPABASE DATABASE SCHEMA
-- Project ID: egpwwzkwwxsrctzyhpnv
-- Generated for: MD. Moshiur Rahman Portfolio & Admin Portal
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  titles TEXT[] DEFAULT '{}',
  bio TEXT,
  extended_bio TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  telegram_username TEXT,
  availability_status TEXT DEFAULT 'Open for Opportunities',
  resume_url TEXT,
  years_of_experience NUMERIC DEFAULT 4.5,
  profile_image TEXT,
  logo_light TEXT,
  logo_dark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. PROJECTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  fallback_gradient TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  architecture TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. SKILLS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  logo TEXT,
  experience TEXT,
  experience_duration TEXT,
  icon_name TEXT,
  description TEXT,
  projects TEXT[] DEFAULT '{}',
  projects_using TEXT[] DEFAULT '{}',
  proficiency_highlights TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  accent_color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. EXPERIENCE TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experience (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  duration TEXT,
  period TEXT,
  type TEXT DEFAULT 'Full-time',
  description TEXT,
  achievements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. EDUCATION TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT,
  duration TEXT,
  grade TEXT,
  highlights TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. CERTIFICATES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issuer_logo TEXT,
  theme TEXT,
  category TEXT,
  accent TEXT,
  image TEXT NOT NULL,
  issue_date TEXT,
  expiry_date TEXT,
  credential_id TEXT,
  credential_url TEXT,
  skills TEXT[] DEFAULT '{}',
  description TEXT,
  verified BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 7. SOCIAL LINKS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT,
  action_type TEXT DEFAULT 'link',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 8. CONTACT MESSAGES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. SITE SETTINGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_title TEXT DEFAULT 'MD. Moshiur Rahman | Luxury Portfolio',
  meta_description TEXT,
  contact_email TEXT DEFAULT 'borshonsweb@gmail.com',
  active_theme TEXT DEFAULT 'dual',
  show_stats BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  custom_announcement TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. ADMIN USERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS on all tables
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

-- Public READ policies for portfolio content
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public projects read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public experience read" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public education read" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public certificates read" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public social_links read" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public site_settings read" ON public.site_settings FOR SELECT USING (true);

-- Authenticated ADMIN write policies for portfolio content
CREATE POLICY "Admin profiles manage" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin projects manage" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin skills manage" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin experience manage" ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin education manage" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin certificates manage" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin social_links manage" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin site_settings manage" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin users manage" ON public.admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contact Messages: Anyone can INSERT, only Authenticated Admin can READ / UPDATE / DELETE
CREATE POLICY "Public contact messages insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin contact messages select" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin contact messages update" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin contact messages delete" ON public.contact_messages FOR DELETE TO authenticated USING (true);

-- -----------------------------------------------------------------------------
-- STORAGE BUCKETS SETUP
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('profile-images', 'profile-images', true),
  ('project-images', 'project-images', true),
  ('certificate-images', 'certificate-images', true),
  ('logos', 'logos', true),
  ('resume-files', 'resume-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Admin Storage Insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin Storage Update" ON storage.objects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin Storage Delete" ON storage.objects FOR DELETE TO authenticated USING (true);
