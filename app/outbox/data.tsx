export interface OutboxMessage {
  id: string;
  recipient: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  role?: string;
  company?: string;
  location?: string;
  linkedin?: string;
  nextSteps?: string;
}

export const outboxData: OutboxMessage[] = [
  {
    id: '1',
    recipient: 'Sarah Chen',
    subject: 'Follow up: Senior Frontend Role',
    preview: 'Hi Sarah, it was great chatting today about the...',
    body: "Hi Sarah,\n\nIt was great chatting today about the Senior Frontend role. The team was really impressed with your portfolio.\n\nBest,\nAlex",
    timestamp: '10:42 AM',
    status: 'Sent',
    role: 'Senior Frontend Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahchen',
    nextSteps: 'send_follow_up'
  },
  {
    id: '2',
    recipient: 'Marcus Wright',
    subject: 'Interview Schedule for Next Week',
    preview: 'Please let me know your availability for a 30-min...',
    body: "Hi Marcus,\n\nWe'd like to move forward to the next stage. Please let me know your availability for a 30-min technical screen.\n\nThanks!",
    timestamp: '9:15 AM',
    status: 'Scheduled',
    role: 'Fullstack Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/marcuswright',
    nextSteps: 'send_thank_you_email'
  },
  {
    id: '3',
    recipient: 'Elena Rodriguez',
    subject: 'Welcome to the Nexus Team!',
    preview: 'Congratulations! We are thrilled to officially...',
    body: "Hi Elena,\n\nCongratulations! We are thrilled to officially welcome you to the team. See the attached PDF for your onboarding details.",
    timestamp: 'Yesterday',
    status: 'Sent',
    role: 'Product Manager',
    company: 'Meta',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/elenarodriguez',
    nextSteps: 'send_catch_up_email'
  }
];