import { PortfolioConfig } from '../types';
import websiteSettings from '../super-admin/01-website-settings';
import profileBio from '../super-admin/02-profile-bio';
import projectsData from '../super-admin/03-projects';
import skillsData from '../super-admin/04-skills-matrix';
import experienceData from '../super-admin/05-experience';
import educationData from '../super-admin/06-education';
import certificatesData from '../super-admin/07-certificates';
import socialLinksData from '../super-admin/08-social-links';
import footerCms from '../super-admin/10-footer-cms';

export const assets = {
  logo: {
    light: '/logos/logo1.png',
    dark: '/logos/logo2.png',
  },
  profile: profileBio.profileImage,
  projects: projectsData.map(p => p.image),
  certificates: certificatesData.map(c => c.image),
};

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: profileBio.personal.fullName,
    firstName: profileBio.personal.firstName,
    lastName: profileBio.personal.lastName,
    titles: profileBio.personal.titles,
    bio: profileBio.personal.bio,
    extendedBio: profileBio.personal.extendedBio,
    location: profileBio.personal.location,
    email: profileBio.personal.email,
    phone: profileBio.personal.phone,
    whatsappNumber: profileBio.personal.whatsappNumber,
    telegramUsername: profileBio.personal.telegramUsername,
    availabilityStatus: profileBio.personal.availabilityStatus,
    resumeUrl: profileBio.personal.resumeUrl,
    yearsOfExperience: profileBio.personal.yearsOfExperience,
  },

  assets: {
    logos: {
      light: '/logos/logo1.png',
      dark: '/logos/logo2.png',
    },
    profileImage: profileBio.profileImage,
  },

  socials: socialLinksData,
  stats: profileBio.stats,
  skills: skillsData,
  projects: projectsData,
  experience: experienceData,
  education: educationData,
  certificates: certificatesData,
};

export { websiteSettings, footerCms };
export default portfolioConfig;
