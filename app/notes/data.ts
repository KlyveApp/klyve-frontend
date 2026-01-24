export interface Note {
  id: string;
  date: string;
  subject: string;
  tags: string[];
  content: string;
}

export const notesData: Note[] = [
  {
    id: '1',
    date: 'Jan 21, 2026',
    subject: 'Google Interview Prep',
    tags: ['Interview', 'Technical'],
    content: 'Focus on distributed systems and system design patterns. Remember to mention the scalability project from 2024.'
  },
  {
    id: '2',
    date: 'Jan 19, 2026',
    subject: 'Networking Tips',
    tags: ['Personal'],
    content: 'Always follow up within 24 hours. Send a personalized LinkedIn invite referencing specific conversation points.'
  },
  {
    id: '3',
    date: 'Jan 15, 2026',
    subject: 'Nexus Project Vision',
    tags: ['Draft', 'Project'],
    content: 'Building a CRM for recruiters that feels like a high-end document editor. Focus on speed and clean UI/UX.'
  }
];