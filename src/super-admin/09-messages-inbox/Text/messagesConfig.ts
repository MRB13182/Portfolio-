/**
 * 09 - MESSAGES INBOX (SUPER ADMIN)
 * 
 * Codebase-driven Messages Inbox & Inquiries Configuration.
 * 
 * Public contact form messages are delivered directly to the configured
 * recipient email (`recipientEmail`), and optionally stored in local browser
 * persistence or authoritative database when Supabase is active.
 */

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  status: 'read' | 'unread' | 'archived';
}

export interface MessagesInboxConfig {
  recipientEmail: string;
  backupEmail?: string;
  notificationSubjectPrefix: string;
  autoReplyEnabled: boolean;
  autoReplySubject: string;
  autoReplyBody: string;
  spamFilter: {
    enabled: boolean;
    blocklistKeywords: string[];
    rateLimitPerMinute: number;
  };
  archivedMessages: ContactMessageRecord[];
}

export const messagesInboxConfig: MessagesInboxConfig = {
  recipientEmail: 'borshonsweb@gmail.com',
  backupEmail: 'contact@moshiur.dev',
  notificationSubjectPrefix: '[Portfolio Inquiry]',
  autoReplyEnabled: false,
  autoReplySubject: 'Thank you for reaching out — Moshiur Rahman',
  autoReplyBody: 'Hello,\n\nThank you for reaching out. I have received your message and will review it promptly.\n\nBest regards,\nMoshiur Rahman',
  spamFilter: {
    enabled: true,
    blocklistKeywords: ['viagra', 'crypto casino', 'seo spam blast', 'telegram bot scam'],
    rateLimitPerMinute: 3,
  },
  archivedMessages: [
    {
      id: 'msg-sample-01',
      name: 'Elena Rostova',
      email: 'elena@vanguardventures.io',
      subject: 'Senior Technical Lead & Cloud Architecture Opportunity',
      message: 'Hi Moshiur, we reviewed your work on Apex AI Workspace and would love to discuss leading our core platform engineering initiative.',
      receivedAt: '2026-03-15T10:30:00Z',
      status: 'read',
    },
    {
      id: 'msg-sample-02',
      name: 'David Chen',
      email: 'david@fintechalpha.co',
      subject: 'Consulting on Real-time Financial Engine',
      message: 'Impressive architecture on the Quantum Financial Engine project. Are you available for a 3-month consulting engagement?',
      receivedAt: '2026-03-28T14:15:00Z',
      status: 'read',
    },
  ],
};

export default messagesInboxConfig;
