/**
 * 11 - OVERVIEW (SUPER ADMIN)
 * 
 * Executive summary, deployment status, and architecture dashboard for
 * the codebase-based Super Admin system.
 */

export interface SystemOverviewConfig {
  systemName: string;
  architectureVersion: string;
  cmsType: 'Codebase-Based Super Admin (GitOps)';
  releaseDate: string;
  developer: string;
  summary: {
    totalSections: number;
    totalProjects: number;
    totalSkills: number;
    totalCertificates: number;
    totalExperienceYears: number;
  };
  deployment: {
    workflow: string;
    branch: string;
    runtime: string;
    buildTool: string;
  };
  features: string[];
}

export const overviewData: SystemOverviewConfig = {
  systemName: 'MR Executive Portfolio Architecture',
  architectureVersion: '2026.4.0 (Super Admin v1.0)',
  cmsType: 'Codebase-Based Super Admin (GitOps)',
  releaseDate: 'October 2026',
  developer: 'MD. MOSHIUR RAHMAN',
  summary: {
    totalSections: 11,
    totalProjects: 6,
    totalSkills: 44,
    totalCertificates: 6,
    totalExperienceYears: 5,
  },
  deployment: {
    workflow: 'Edit files under src/super-admin/ -> git commit -> push -> auto deploy',
    branch: 'main',
    runtime: 'Node.js / React 19 / TypeScript / Vite',
    buildTool: 'Vite 6',
  },
  features: [
    'Zero backend dependency for website content management',
    'Full type-safety and compile-time validation of all portfolio data',
    'Separation of Text/ content configurations and Pic/ image assets',
    'Instant updates across all 11 numbered portfolio sections',
    'Pure GitOps content version control and rollback capability',
  ],
};

export default overviewData;
