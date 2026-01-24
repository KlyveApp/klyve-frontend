export interface Experience {
  year: string;
  role: string;
  company: string;
}

export interface Email {
  date: string;
  subject: string;
}

export interface NetworkContact {
  id: string;
  name: string;
  location: string;
  company: string;
  position: string;
  education: string;
  avatar: string;
  bio: string;
  experience: Experience[];
  notes: string[];
  emails: Email[];
  role?: string;
  about?: string;
}

export const networkData: NetworkContact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    company: "Google",
    position: "Senior Software Engineer",
    education: "Stanford University",
    avatar: "SC",
    bio: "Passionate about building scalable distributed systems and mentoring junior developers.",
    experience: [
      { year: "2021 - Present", role: "Senior SWE", company: "Google" },
      { year: "2018 - 2021", role: "Full Stack Dev", company: "Uber" },
    ],
    notes: ["Met at JSConf 2024", "Expert in React and Node.js"],
    emails: [
      { date: "Oct 12", subject: "Re: Technical Interview follow-up" },
      { date: "Sep 28", subject: "Coffee chat?" },
    ],
  },
  {
    id: "2",
    name: "Marcus Wright",
    location: "New York, NY",
    company: "Stripe",
    position: "Product Designer",
    education: "RISD",
    avatar: "MW",
    bio: "Focusing on financial accessibility through clean, intuitive interface design.",
    experience: [
      { year: "2022 - Present", role: "Product Designer", company: "Stripe" },
      { year: "2019 - 2022", role: "UI/UX Designer", company: "Figma" },
    ],
    notes: ["Incredible portfolio", "Prefers remote work"],
    emails: [{ date: "Nov 02", subject: "Design Systems discussion" }],
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    location: "Austin, TX",
    company: "Tesla",
    position: "Hardware Engineer",
    education: "MIT",
    avatar: "ER",
    bio: "Specializing in sustainable battery technology and autonomous vehicle hardware.",
    experience: [
      { year: "2020 - Present", role: "Hardware Lead", company: "Tesla" },
      { year: "2017 - 2020", role: "Systems Engineer", company: "SpaceX" },
    ],
    notes: [
      "Looking for leadership roles",
      "Relocation possible to West Coast",
    ],
    emails: [{ date: "Jan 15", subject: "Happy New Year / Career Check-in" }],
  },
  {
    id: "4",
    name: "James Wilson",
    location: "London, UK",
    company: "Revolut",
    position: "Backend Developer",
    education: "Oxford University",
    avatar: "JW",
    bio: "Fintech enthusiast with a deep background in Rust and high-frequency trading systems.",
    experience: [
      { year: "2021 - Present", role: "Staff Engineer", company: "Revolut" },
      { year: "2018 - 2021", role: "Backend Dev", company: "Monzo" },
    ],
    notes: ["Rust expert", "Strong mentor"],
    emails: [{ date: "Dec 05", subject: "Rust Workshop Invitation" }],
  },
  {
    id: "5",
    name: "Lila Voss",
    location: "Berlin, DE",
    company: "SoundCloud",
    position: "Data Scientist",
    education: "TU Berlin",
    avatar: "LV",
    bio: "Applying machine learning models to improve music recommendation algorithms.",
    experience: [
      {
        year: "2022 - Present",
        role: "Senior Data Scientist",
        company: "SoundCloud",
      },
      { year: "2019 - 2022", role: "ML Researcher", company: "Spotify" },
    ],
    notes: ["Expert in Python and PyTorch", "Fluent in German and English"],
    emails: [{ date: "Oct 30", subject: "Data Science Summit 2025" }],
  },
  {
    id: "6",
    name: "David Kim",
    location: "Seattle, WA",
    company: "Microsoft",
    position: "Cloud Architect",
    education: "University of Washington",
    avatar: "DK",
    bio: "Building the future of Azure with a focus on serverless architectures.",
    experience: [
      {
        year: "2018 - Present",
        role: "Principal Architect",
        company: "Microsoft",
      },
      { year: "2015 - 2018", role: "Cloud Engineer", company: "Amazon" },
    ],
    notes: ["Azure/AWS specialist", "Avid hiker"],
    emails: [{ date: "Feb 12", subject: "Cloud Infrastructure Trends" }],
  },
  {
    id: "7",
    name: "Maya Patel",
    location: "Toronto, ON",
    company: "Shopify",
    position: "Engineering Manager",
    education: "University of Waterloo",
    avatar: "MP",
    bio: "Leading teams to scale e-commerce solutions for millions of merchants.",
    experience: [
      {
        year: "2020 - Present",
        role: "Engineering Manager",
        company: "Shopify",
      },
      { year: "2016 - 2020", role: "Senior Developer", company: "HubSpot" },
    ],
    notes: ["Great people lead", " Waterloo alum"],
    emails: [{ date: "Jan 20", subject: "Hiring Strategy for Q1" }],
  },
  {
    id: "8",
    name: "Samuel Okafor",
    location: "Lagos, Nigeria",
    company: "Paystack",
    position: "Mobile Developer",
    education: "University of Lagos",
    avatar: "SO",
    bio: "Flutter and Kotlin expert building seamless payment experiences for Africa.",
    experience: [
      { year: "2021 - Present", role: "Mobile Lead", company: "Paystack" },
      { year: "2019 - 2021", role: "Android Dev", company: "Andela" },
    ],
    notes: ["Mobile specialist", "Strong advocate for tech in Africa"],
    emails: [{ date: "Nov 14", subject: "Mobile Dev Best Practices" }],
  },
  {
    id: "9",
    name: "Chloe Dubois",
    location: "Paris, FR",
    company: "LVMH",
    position: "Digital Strategy Lead",
    education: "HEC Paris",
    avatar: "CD",
    bio: "Bridging the gap between luxury heritage and digital innovation.",
    experience: [
      { year: "2022 - Present", role: "Strategy Lead", company: "LVMH" },
      { year: "2019 - 2022", role: "Consultant", company: "McKinsey" },
    ],
    notes: ["MBA from HEC", "Loves photography"],
    emails: [{ date: "Dec 18", subject: "Digital Transformation in Luxury" }],
  },
  {
    id: "10",
    name: "Kenji Sato",
    location: "Tokyo, JP",
    company: "Sony",
    position: "Robotics Engineer",
    education: "University of Tokyo",
    avatar: "KS",
    bio: "Designing humanoid robotic systems to assist in elderly care.",
    experience: [
      { year: "2017 - Present", role: "Robotics Researcher", company: "Sony" },
      { year: "2014 - 2017", role: "Mechanical Engineer", company: "Toyota" },
    ],
    notes: ["PhD in Robotics", "Looking for collaborative projects"],
    emails: [{ date: "Feb 05", subject: "Conference in Kyoto" }],
  },
  {
    id: "11",
    name: "Amara Singh",
    location: "Bangalore, IN",
    company: "Flipkart",
    position: "Product Manager",
    education: "IIT Delhi",
    avatar: "AS",
    bio: "Defining product roadmaps for supply chain automation.",
    experience: [
      { year: "2021 - Present", role: "Product Manager", company: "Flipkart" },
      { year: "2018 - 2021", role: "Business Analyst", company: "Zomato" },
    ],
    notes: ["IIT Alumna", "Great at data analytics"],
    emails: [{ date: "Oct 05", subject: "Supply Chain Optimization" }],
  },
  {
    id: "12",
    name: "Thomas Müller",
    location: "Munich, DE",
    company: "BMW Group",
    position: "Security Specialist",
    education: "Technical University of Munich",
    avatar: "TM",
    bio: "Protecting connected car ecosystems from cyber threats.",
    experience: [
      { year: "2019 - Present", role: "Cybersecurity Lead", company: "BMW" },
      { year: "2016 - 2019", role: "Security Analyst", company: "Siemens" },
    ],
    notes: ["CISSP Certified", "White hat hacker"],
    emails: [{ date: "Dec 12", subject: "Connected Car Security Audit" }],
  },
  {
    id: "13",
    name: "Sofia Rossi",
    location: "Milan, IT",
    company: "Prada",
    position: "E-commerce Manager",
    education: "Bocconi University",
    avatar: "SR",
    bio: "Leading global e-commerce operations for luxury retail.",
    experience: [
      { year: "2021 - Present", role: "E-commerce Manager", company: "Prada" },
      { year: "2018 - 2021", role: "Digital Marketing", company: "Yoox" },
    ],
    notes: ["Expert in Salesforce Commerce Cloud", "Fluent in 4 languages"],
    emails: [{ date: "Nov 22", subject: "Global Rollout Plan" }],
  },
  {
    id: "14",
    name: "Isaac Newton",
    location: "Cambridge, MA",
    company: "Biogen",
    position: "Bioinformatics Lead",
    education: "Harvard University",
    avatar: "IN",
    bio: "Using computational biology to accelerate drug discovery for Alzheimer's.",
    experience: [
      { year: "2020 - Present", role: "Lead Researcher", company: "Biogen" },
      {
        year: "2017 - 2020",
        role: "Postdoc Fellow",
        company: "Broad Institute",
      },
    ],
    notes: ["Deep expertise in R and genomics", "Marathon runner"],
    emails: [{ date: "Jan 08", subject: "Genomic Sequencing Results" }],
  },
  {
    id: "15",
    name: "Yuki Tanaka",
    location: "Osaka, JP",
    company: "Nintendo",
    position: "Game Director",
    education: "Kyoto University",
    avatar: "YT",
    bio: "Crafting immersive worlds and innovative gameplay mechanics.",
    experience: [
      { year: "2015 - Present", role: "Game Director", company: "Nintendo" },
      { year: "2012 - 2015", role: "Level Designer", company: "Capcom" },
    ],
    notes: ["Legendary status in gamedev", "Prefers email to calls"],
    emails: [{ date: "Feb 18", subject: "Next Project Pitch" }],
  },
  {
    id: "16",
    name: "Fatima Al-Sayed",
    location: "Dubai, UAE",
    company: "Careem",
    position: "UX Researcher",
    education: "American University of Sharjah",
    avatar: "FS",
    bio: "Human-centered design advocate for the MENA region's leading Super App.",
    experience: [
      {
        year: "2021 - Present",
        role: "Senior UX Researcher",
        company: "Careem",
      },
      { year: "2018 - 2021", role: "UX Designer", company: "Souq" },
    ],
    notes: ["Expert in ethnography", "Speaks Arabic and English"],
    emails: [{ date: "Oct 15", subject: "User Research Findings" }],
  },
  {
    id: "17",
    name: "Anders Jensen",
    location: "Copenhagen, DK",
    company: "LEGO Group",
    position: "Creative Lead",
    education: "Design School Kolding",
    avatar: "AJ",
    bio: "Reimagining play for the next generation through digital-physical hybrids.",
    experience: [
      { year: "2020 - Present", role: "Creative Director", company: "LEGO" },
      {
        year: "2015 - 2020",
        role: "Senior Designer",
        company: "Bang & Olufsen",
      },
    ],
    notes: ["Design thinker", "Furniture maker on weekends"],
    emails: [{ date: "Dec 01", subject: "Project Playroom 2025" }],
  },
  {
    id: "18",
    name: "Lucia Mendez",
    location: "Mexico City, MX",
    company: "Kavak",
    position: "Operations Director",
    education: "IPN Mexico",
    avatar: "LM",
    bio: "Scaling logistics and supply chain for the unicorn of Latin America.",
    experience: [
      { year: "2021 - Present", role: "Ops Director", company: "Kavak" },
      { year: "2017 - 2021", role: "Ops Manager", company: "Uber Eats" },
    ],
    notes: ["Expert in Lean Six Sigma", "Great at crisis management"],
    emails: [{ date: "Nov 28", subject: "Operational Efficiency Report" }],
  },
  {
    id: "19",
    name: "Ben Thompson",
    location: "Sydney, AU",
    company: "Atlassian",
    position: "Developer Advocate",
    education: "UNSW Sydney",
    avatar: "BT",
    bio: "Empowering developers to build better software through community and tools.",
    experience: [
      {
        year: "2022 - Present",
        role: "Developer Advocate",
        company: "Atlassian",
      },
      { year: "2019 - 2022", role: "Software Engineer", company: "Canva" },
    ],
    notes: ["Prolific blogger", "Surfer"],
    emails: [{ date: "Feb 10", subject: "Community Meetup in Sydney" }],
  },
  {
    id: "20",
    name: "Olga Petrova",
    location: "Tallinn, EE",
    company: "Bolt",
    position: "Compliance Officer",
    education: "University of Tartu",
    avatar: "OP",
    bio: "Ensuring global regulatory compliance for high-growth mobility tech.",
    experience: [
      { year: "2020 - Present", role: "Senior Compliance", company: "Bolt" },
      { year: "2016 - 2020", role: "Legal Associate", company: "TransferWise" },
    ],
    notes: ["Fintech law expert", "Loves Estonian winters"],
    emails: [{ date: "Jan 12", subject: "EU Regulatory Update" }],
  },
];
