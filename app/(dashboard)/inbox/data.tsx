export type Mail = {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  dateLabel: string;
  read: boolean;
  university?: string;
  jobTitle?: string;
  location?: string;
  status?: "Active" | "Pending" | "Closed";
  linkedin?: string;
};

export const mails: Mail[] = [
  {
    id: "1",
    name: "Alice Smith",
    email: "alicesmith@example.com",
    subject: "Re: Project Update",
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nThanks, Alice",
    dateLabel: "1 min ago",
    read: false,
    university: "Stanford",
    jobTitle: "Product Manager",
    location: "Palo Alto, CA",
    status: "Active",
    linkedin: "https://linkedin.com",
  },
  {
    id: "2",
    name: "William Smith",
    email: "williamsmith@example.com",
    subject: "Meeting Tomorrow",
    text: "I've been reviewing the project details and have some ideas I'd like to share. Let's touch base at 10 AM if you have a moment.",
    dateLabel: "2 days ago",
    read: true,
    university: "MIT",
    jobTitle: "Software Engineer",
    location: "Cambridge, MA",
    status: "Active",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    subject: "Weekend Plans",
    text: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we caught up!",
    dateLabel: "2 days ago",
    read: true,
    university: "UC Berkeley",
    jobTitle: "UX Designer",
    location: "San Francisco, CA",
    status: "Closed",
    linkedin: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    subject: "Re: Question about Budget",
    text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation for marketing vs development.",
    dateLabel: "3 days ago",
    read: false,
    university: "Harvard",
    jobTitle: "Financial Analyst",
    location: "Boston, MA",
    status: "Pending",
    linkedin: "https://linkedin.com",
  },
  {
    id: "5",
    name: "David Lee",
    email: "davidlee@example.com",
    subject: "New Project Idea",
    text: "I have an exciting new project idea to discuss with you. It involves expanding our services into the AI-driven analytics space.",
    dateLabel: "3 days ago",
    read: false,
    university: "Georgia Tech",
    jobTitle: "Data Scientist",
    location: "Atlanta, GA",
    status: "Active",
    linkedin: "https://linkedin.com",
  },
  {
    id: "6",
    name: "Sarah Miller",
    email: "smiller@example.com",
    subject: "Partnership Inquiry",
    text: "We are interested in exploring a potential partnership with your team. I think there are some great synergies between our companies.",
    dateLabel: "4 days ago",
    read: true,
    university: "Oxford",
    jobTitle: "Business Development",
    location: "London, UK",
    status: "Pending",
    linkedin: "https://linkedin.com",
  },
  {
    id: "7",
    name: "James Wilson",
    email: "j.wilson@example.com",
    subject: "Updated Contract",
    text: "Please find the updated contract attached. We've made the changes we discussed in our last call. Let me know if you have any questions.",
    dateLabel: "1 week ago",
    read: true,
    university: "Yale",
    jobTitle: "Legal Counsel",
    location: "New York, NY",
    status: "Closed",
    linkedin: "https://linkedin.com",
  },
];
