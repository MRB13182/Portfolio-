import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LuxuryBackground } from './components/common/LuxuryBackground';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageTransition } from './components/common/PageTransition';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactModal } from './components/modals/ContactModal';
import { DownloadCustomizationModal } from './components/modals/DownloadCustomizationModal';
import { PdfDownloadType } from './types';
import { AnimatePresence } from 'motion/react';

function AnimatedRoutes({
  onOpenContact,
  onOpenResumeDownload,
}: {
  onOpenContact: () => void;
  onOpenResumeDownload: (type: PdfDownloadType) => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <PageTransition key={location.pathname}>
              <Home 
                onOpenContact={onOpenContact} 
                onOpenResumeDownload={() => onOpenResumeDownload('resume')} 
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
                onOpenResumeDownload={() => onOpenResumeDownload('resume')} 
              />
            </PageTransition>
          }
        />
        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function PortfolioApp() {
  const { isDark } = useTheme();
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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={`min-h-screen relative font-sans selection:bg-[#00C896]/25 dark:selection:bg-[#7C3AED]/40 flex flex-col justify-between ${
        isDark ? 'theme-dark bg-[#050505] text-[#F8FAFC]' : 'bg-[#F7FAF9] text-[#0F172A]'
      }`}>
        {/* Ambient Animated Luxury Glows */}
        <LuxuryBackground />

        {/* Sticky Glass Navbar */}
        <Navbar
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenResumeDownload={() => handleOpenPdfDownload('resume')}
        />

        {/* Dynamic Route View Transitions */}
        <main className="relative z-10 flex-grow">
          <AnimatedRoutes
            onOpenContact={() => setIsContactModalOpen(true)}
            onOpenResumeDownload={handleOpenPdfDownload}
          />
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
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
