/**
 * SUPER ADMIN ROOT ENTRYPOINT
 * 
 * Aggregates and exports all 11 numbered content management sections:
 * 01 - Website Settings
 * 02 - Profile & Bio
 * 03 - Projects
 * 04 - Skills Matrix
 * 05 - Experience
 * 06 - Education
 * 07 - Certificates
 * 08 - Social Links
 * 09 - Messages Inbox
 * 10 - Footer CMS
 * 11 - Overview
 */

export * from './01-website-settings';
export * from './02-profile-bio';
export * from './03-projects';
export * from './04-skills-matrix';
export * from './05-experience';
export * from './06-education';
export * from './07-certificates';
export * from './08-social-links';
export * from './09-messages-inbox';
export * from './10-footer-cms';
export * from './11-overview';

import websiteSettings from './01-website-settings';
import profileBio from './02-profile-bio';
import projectsData from './03-projects';
import skillsData from './04-skills-matrix';
import experienceData from './05-experience';
import educationData from './06-education';
import certificatesData from './07-certificates';
import socialLinksData from './08-social-links';
import messagesInboxConfig from './09-messages-inbox';
import footerCms from './10-footer-cms';
import overviewData from './11-overview';

export const superAdminContent = {
  websiteSettings,
  profileBio,
  projectsData,
  skillsData,
  experienceData,
  educationData,
  certificatesData,
  socialLinksData,
  messagesInboxConfig,
  footerCms,
  overviewData,
};

export default superAdminContent;
