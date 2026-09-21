import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { LuxuryBackground } from './components/common/LuxuryBackground';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageTransition } from './components/common/PageTransition';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminSkillsPage } from './pages/admin/AdminSkillsPage';
import { AdminExperiencePage } from './pages/admin/AdminExperiencePage';
import { AdminEducationPage } from './pages/admin/AdminEducationPage';
import { AdminCertificatesPage } from './pages/admin/AdminCertificatesPage';
import { AdminSocialsPage } from './pages/admin/AdminSocialsPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { ContactModal } from './components/modals/ContactModal';
import { DownloadCustomizationModal } from './components/modals/DownloadCustomizationModal';
import { PdfDownloadType } from './types';
import { AnimatePresence } from 'motion/react';

function AppContent() {
  const { isDark } = useTheme();
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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

  // If in executive Admin Dashboard, render AdminLayout and bypass public headers/footers
  if (isAdminDashboard) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<AdminOverviewPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route path="/admin/projects" element={<AdminProjectsPage />} />
            <Route path="/admin/skills" element={<AdminSkillsPage />} />
            <Route path="/admin/experience" element={<AdminExperiencePage />} />
            <Route path="/admin/education" element={<AdminEducationPage />} />
            <Route path="/admin/certificates" element={<AdminCertificatesPage />} />
            <Route path="/admin/socials" element={<AdminSocialsPage />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
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
        : 'bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00C896]/30'
    }`}>
      {/* Ambient Animated Luxury / Emerald Glows */}
      <LuxuryBackground />

      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenResumeDownload={() => handleOpenPdfDownload('resume')}
      />

      {/* Dynamic Route View Transitions */}
      <main className="relative z-10 flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route
              path="/"
              element={
                <PageTransition key={location.pathname}>
                  <Home 
                    onOpenContact={() => setIsContactModalOpen(true)} 
                    onOpenResumeDownload={() => handleOpenPdfDownload('resume')} 
                  />
                </PageTransition>
              }
            />
            <Route
              path="/skills"
              element={
                <PageTransition key={location.pathname}>
                  <SkillsPage />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition key={location.pathname}>
                  <ProjectsPage />
                </PageTransition>
              }
            />
            <Route
              path="/experience"
              element={
                <PageTransition key={location.pathname}>
                  <ExperiencePage 
                    onOpenResumeDownload={() => handleOpenPdfDownload('resume')} 
                  />
                </PageTransition>
              }
            />
            <Route
              path="/admin/login"
              element={
                <PageTransition key={location.pathname}>
                  <AdminLoginPage />
                </PageTransition>
              }
            />
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Persistent Multi-Page Footer */}
      <Footer 
        onOpenContact={() => setIsContactModalOpen(true)} 
        onOpenResumeDownload={() => handleOpenPdfDownload('resume')}
        onOpenCertificatesDownload={() => handleOpenPdfDownload('certificates')}
      />

      {/* Floating Global Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Download Customization Modal (Resume & Verified Certificates) */}
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
              <AppContent />
            </BrowserRouter>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
