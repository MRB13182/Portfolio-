/**
 * 08 - SOCIAL LINKS (SUPER ADMIN)
 * 
 * Edit this file to add, modify, or reorganize social and developer profile links
 * displayed in the hero, navbar, contact page, and footer.
 */

import { SocialLink } from '../../../types';

export const socialLinksData: SocialLink[] = [
  {
    id: 'social-github',
    name: 'GitHub',
    platform: 'GitHub',
    url: 'https://github.com/MRB13182',
    icon: 'Github',
    color: '#24292e',
    actionType: 'link',
    enabled: true,
  },
  {
    id: 'social-linkedin',
    name: 'LinkedIn',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/moshiur-rahman',
    icon: 'Linkedin',
    color: '#0077b5',
    actionType: 'link',
    enabled: true,
  },
  {
    id: 'social-whatsapp',
    name: 'WhatsApp',
    platform: 'WhatsApp',
    url: 'https://wa.me/8801700000000',
    icon: 'MessageCircle',
    color: '#25D366',
    actionType: 'whatsapp',
    enabled: true,
  },
  {
    id: 'social-telegram',
    name: 'Telegram',
    platform: 'Telegram',
    url: 'https://t.me/moshiur_dev',
    icon: 'Send',
    color: '#229ED9',
    actionType: 'telegram',
    enabled: true,
  },
  {
    id: 'social-facebook',
    name: 'Facebook',
    platform: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: 'Facebook',
    color: '#1877F2',
    actionType: 'link',
    enabled: true,
  },
  {
    id: 'social-email',
    name: 'Email',
    platform: 'Email',
    url: 'mailto:borshonsweb@gmail.com',
    icon: 'Mail',
    color: '#EA4335',
    actionType: 'email',
    enabled: true,
  },
];

export default socialLinksData;
