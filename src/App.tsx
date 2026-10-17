import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { LuxuryBackground } from './components/common/LuxuryBackground';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { PageTransition } from './components/common/PageTransition';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ContactPage } from './pages/ContactPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminBrandingPage } from './pages/admin/AdminBrandingPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminSkillsPage } from './pages/admin/AdminSkillsPage';
import { AdminExperiencePage } from './pages/admin/AdminExperiencePage';
import { AdminEducationPage } from './pages/admin/AdminEducationPage';
import { AdminCertificatesPage } from './pages/admin/AdminCertificatesPage';
import { AdminResumePage } from './pages/admin/AdminResumePage';
import { AdminSocialsPage } from './pages/admin/AdminSocialsPage';
import { AdminContactPage } from './pages/admin/AdminContactPage';
import { AdminHomepagePage } from './pages/admin/AdminHomepagePage';
import { AdminThemePage } from './pages/admin/AdminThemePage';
import { AdminSeoPage } from './pages/admin/AdminSeoPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminSecurityPage } from './pages/admin/AdminSecurityPage';
import { AdminStoragePage } from './pages/admin/AdminStoragePage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminFooterPage } from './pages/admin/AdminFooterPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { DownloadCustomizationModal } from './components/modals/DownloadCustomizationModal';
import { PdfDownloadType } from './types';
import { AnimatePresence } from 'motion/react';

function AppContent() {
  const { isDark } = useTheme();
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin/login';
  const isAdminDashboard = location.pathname.startsWith('/admin') && !isAdminLogin;

  const [pdfDownloadModal, setPdfDownloadModal] = useState<{
    isOpen: boolean;
    type: PdfDownloadType;
  }>({
    isOpen: false,
    type: 'resume',
  });

  const handleOpenPdfDownload = (type: PdfDownloadType) => {
    setPdfDownloadModal({
      isOpen: true,
      type,
    });
  };

  const handleClosePdfDownload = () => {
    setPdfDownloadModal(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  // Dedicated Admin Login Page
  if (isAdminLogin) {
    return <AdminLoginPage />;
  }

  // If in executive Admin Dashboard, render AdminLayout
  if (isAdminDashboard) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<AdminOverviewPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route path="/admin/branding" element={<AdminBrandingPage />} />
            <Route path="/admin/skills" element={<AdminSkillsPage />} />
            <Route path="/admin/projects" element={<AdminProjectsPage />} />
            <Route path="/admin/certificates" element={<AdminCertificatesPage />} />
            <Route path="/admin/resume" element={<AdminResumePage />} />
            <Route path="/admin/socials" element={<AdminSocialsPage />} />
            <Route path="/admin/contact" element={<AdminContactPage />} />
            <Route path="/admin/homepage" element={<AdminHomepagePage />} />
            <Route path="/admin/theme" element={<AdminThemePage />} />
            <Route path="/admin/seo" element={<AdminSeoPage />} />
            <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
            <Route path="/admin/security" element={<AdminSecurityPage />} />
            <Route path="/admin/storage" element={<AdminStoragePage />} />
            <Route path="/admin/experience" element={<AdminExperiencePage />} />
            <Route path="/admin/education" element={<AdminEducationPage />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
            <Route path="/admin/footer" element={<AdminFooterPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-300 flex flex-col justify-between ${
      isDark 
        ? 'bg-[#050505] text-[#F8FAFC] selection:bg-[#7C3AED]/40' 
        : 'bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00E5FF]/30'
    }`}>
      {/* Ambient Animated Glows */}
      <LuxuryBackground />

      {/* Center-Aligned Sticky Glass Navbar */}
      <Navbar />

      {/* Dynamic Route View Transitions */}
      <main className="relative z-10 flex-grow pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route
              path="/"
              element={
                <PageTransition key="home-root">
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/home"
              element={
                <PageTransition key="home-page">
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/skills"
              element={
                <PageTransition key="skills-page">
                  <SkillsPage />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition key="projects-page">
                  <ProjectsPage />
                </PageTransition>
              }
            />
            <Route
              path="/certificates"
              element={
                <PageTransition key="certificates-page">
                  <CertificatesPage 
                    onOpenResumeDownload={() => handleOpenPdfDownload('resume')} 
                  />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition key="contact-page">
                  <ContactPage />
                </PageTransition>
              }
            />
            {/* Redirect old routes */}
            <Route path="/experience" element={<Navigate to="/certificates" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Minimal Glass Footer displaying "© 2026 MR Portfolio" from 10-footer-cms */}
      <Footer />

      {/* Download Customization Modal (Resume & Certificates) */}
      <DownloadCustomizationModal
        isOpen={pdfDownloadModal.isOpen}
        type={pdfDownloadModal.type}
        onClose={handleClosePdfDownload}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <BrowserRouter>
              <ScrollToTop />
              <ScrollProgressBar />
              <AppContent />
            </BrowserRouter>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
