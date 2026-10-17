/**
 * 02 - PROFILE & BIO (SUPER ADMIN)
 * 
 * Edit this file to update biographical copy, personal branding titles,
 * contact details, and statistical metrics displayed across the portfolio.
 */

export interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
}

export interface ProfileBioConfig {
  personal: {
    fullName: string;
    firstName: string;
    lastName: string;
    titles: string[];
    headline: string;
    bio: string;
    extendedBio: string;
    location: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    telegramUsername: string;
    availabilityStatus: string;
    yearsOfExperience: number;
    resumeUrl: string;
  };
  stats: StatItem[];
  profileImage: string;
}

export const profileBio: ProfileBioConfig = {
  personal: {
    fullName: 'MD. MOSHIUR RAHMAN',
    firstName: 'Moshiur',
    lastName: 'Rahman',
    titles: [
      'Full Stack Developer',
      'UI/UX Designer',
      'Next.js & React Specialist',
      'Cloud & System Architect',
    ],
    headline: 'Senior Full-Stack & AI Systems Architect',
    bio: 'Crafting high-performance web applications, luxury digital experiences, and scalable cloud systems with meticulous attention to detail and modern engineering excellence.',
    extendedBio: 'I am a passionate Full Stack Software Engineer and UI/UX Designer with over 5+ years of hands-on expertise building enterprise-grade SaaS platforms, fluid web applications, and intuitive design systems. Blending technical rigor with Apple-level aesthetic sensibility, I architect robust end-to-end solutions that elevate brands and drive measurable business impact.',
    location: 'Dhaka, Bangladesh (Available Worldwide & Remote)',
    email: 'borshonsweb@gmail.com',
    phone: '+880 1700-000000',
    whatsappNumber: '+8801700000000',
    telegramUsername: 'moshiur_dev',
    availabilityStatus: 'Available for Full-time & High-Impact Projects',
    yearsOfExperience: 5,
    resumeUrl: '#resume-download',
  },
  stats: [
    {
      label: 'Years Experience',
      value: '5+',
      numericValue: 5,
      suffix: '+',
      description: 'Building modern web applications',
    },
    {
      label: 'Projects Completed',
      value: '50+',
      numericValue: 50,
      suffix: '+',
      description: 'Delivered for global clients',
    },
    {
      label: 'Happy Clients',
      value: '35+',
      numericValue: 35,
      suffix: '+',
      description: 'Worldwide satisfaction rate',
    },
    {
      label: 'Client Satisfaction',
      value: '99%',
      numericValue: 99,
      suffix: '%',
      description: 'Based on post-launch metrics',
    },
  ],
  profileImage: '/profile/profile.png',
};

export default profileBio;
