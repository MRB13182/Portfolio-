import React from 'react';
import { CertificatesShowcase } from '../components/sections/CertificatesShowcase';
import { ResumeSection } from '../components/sections/ResumeSection';

interface CertificatesPageProps {
  onOpenResumeDownload?: () => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ onOpenResumeDownload }) => {
  return (
    <div className="w-full pb-16">
      {/* 1. Verified Certificates Showcase */}
      <CertificatesShowcase />

      {/* 2. Professional Resume & Credentials Preview */}
      <ResumeSection onOpenResumeDownload={onOpenResumeDownload} />
    </div>
  );
};
