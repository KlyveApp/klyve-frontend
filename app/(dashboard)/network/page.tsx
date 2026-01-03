"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import {
  IconUserPlus,
  IconDotsVertical,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconMail,
  IconPhone,
  IconBuildingCommunity,
  IconInfoCircle,
} from "@tabler/icons-react";

interface Contact {
  id: number;
  name: string;
  role: string;
  initial: string;
  avatar: string;
  tags: string[];
  email: string;
  phone: string;
  company: string;
  bio: string;
  lastActive: string;
}

export default function NetworkPage() {
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Designer",
      initial: "AJ",
      avatar: "/avatars/01.png",
      tags: ["Remote"],
      email: "alice.j@example.com",
      phone: "+1 (555) 123-4567",
      company: "Innovate Solutions",
      bio: "Passionate product designer focused on creating intuitive user experiences. Specialized in UI/UX research and prototyping.",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jackson Lee",
      role: "Engineer",
      initial: "JL",
      avatar: "/avatars/02.png",
      tags: ["React"],
      email: "jackson.l@example.com",
      phone: "+1 (555) 234-5678",
      company: "Code Builders Inc.",
      bio: "Frontend engineer with expertise in React, Next.js, and building scalable web applications. Loves open-source contributions.",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      role: "Marketing",
      initial: "IN",
      avatar: "/avatars/03.png",
      tags: ["Growth"],
      email: "isabella.n@example.com",
      phone: "+1 (555) 345-6789",
      company: "Brand Spark",
      bio: "Results-driven marketing lead, focusing on digital strategy, content creation, and campaign management.",
      lastActive: "5 hours ago",
    },
    {
      id: 4,
      name: "William Kim",
      role: "CEO",
      initial: "WK",
      avatar: "/avatars/04.png",
      tags: ["Lead"],
      email: "william.k@example.com",
      phone: "+1 (555) 456-7890",
      company: "Klyve Inc.",
      bio: "Visionary CEO leading Klyve's innovation in AI-powered workspace solutions. Committed to fostering a collaborative environment.",
      lastActive: "30 minutes ago",
    },
    {
      id: 5,
      name: "Evan Wright",
      role: "Data",
      initial: "EW",
      avatar: "/avatars/05.png",
      tags: ["AI"],
      email: "evan.w@example.com",
      phone: "+1 (555) 567-8901",
      company: "Data Insight Group",
      bio: "Data scientist specializing in machine learning, predictive analytics, and large-scale data processing.",
      lastActive: "6 hours ago",
    },
    {
      id: 6,
      name: "Fiona Glenn",
      role: "HR",
      initial: "FG",
      avatar: "/avatars/06.png",
      tags: ["Hiring"],
      email: "fiona.g@example.com",
      phone: "+1 (555) 678-9012",
      company: "People & Culture Co.",
      bio: "Experienced HR professional dedicated to talent acquisition, employee development, and fostering positive workplace culture.",
      lastActive: "1 day ago",
    },
    {
      id: 7,
      name: "Marcus Aurelius",
      role: "Founder",
      initial: "MA",
      avatar: "/avatars/07.png",
      tags: ["Strategy"],
      email: "marcus.a@example.com",
      phone: "+1 (555) 789-0123",
      company: "Stoic Ventures",
      bio: "Serial entrepreneur and strategic advisor with a focus on early-stage tech startups.",
      lastActive: "2 days ago",
    },
    {
      id: 8,
      name: "Sarah Chen",
      role: "Lead",
      initial: "SC",
      avatar: "/avatars/08.png",
      tags: ["UI/UX"],
      email: "sarah.c@example.com",
      phone: "+1 (555) 890-1234",
      company: "Pixel Perfect Studio",
      bio: "Frontend lead passionate about crafting beautiful and performant user interfaces.",
      lastActive: "45 minutes ago",
    },
    {
      id: 9,
      name: "Leo Das",
      role: "Product",
      initial: "LD",
      avatar: "/avatars/09.png",
      tags: ["Mobile"],
      email: "leo.d@example.com",
      phone: "+1 (555) 901-2345",
      company: "App Innovations",
      bio: "Product manager driving mobile-first strategies and user engagement for consumer applications.",
      lastActive: "3 hours ago",
    },
    {
      id: 10,
      name: "Sophia R.",
      role: "Sales",
      initial: "SR",
      avatar: "/avatars/10.png",
      tags: ["Global"],
      email: "sophia.r@example.com",
      phone: "+1 (555) 012-3456",
      company: "Global Reach Solutions",
      bio: "Dynamic sales executive with a proven track record in enterprise software and international market expansion.",
      lastActive: "7 hours ago",
    },
    {
      id: 11,
      name: "Noah J.",
      role: "Finance",
      initial: "NJ",
      avatar: "/avatars/11.png",
      tags: ["Ops"],
      email: "noah.j@example.com",
      phone: "+1 (555) 123-9876",
      company: "Capital Growth Group",
      bio: "Financial analyst optimizing operational efficiency and investment strategies for tech companies.",
      lastActive: "1 day ago",
    },
    {
      id: 12,
      name: "Mia Wong",
      role: "Security",
      initial: "MW",
      avatar: "/avatars/12.png",
      tags: ["Cloud"],
      email: "mia.w@example.com",
      phone: "+1 (555) 234-8765",
      company: "CyberSecure Solutions",
      bio: "Cybersecurity expert focused on cloud security architecture, incident response, and data protection.",
      lastActive: "8 hours ago",
    },
    {
      id: 13,
      name: "Oliver P.",
      role: "Writer",
      initial: "OP",
      avatar: "/avatars/13.png",
      tags: ["Content"],
      email: "oliver.p@example.com",
      phone: "+1 (555) 345-7654",
      company: "Narrative Hub",
      bio: "Content writer and strategist crafting compelling narratives for B2B and B2C audiences.",
      lastActive: "2 days ago",
    },
    {
      id: 14,
      name: "Ava L.",
      role: "Legal",
      initial: "AL",
      avatar: "/avatars/14.png",
      tags: ["Policy"],
      email: "ava.l@example.com",
      phone: "+1 (555) 456-6543",
      company: "LexCorp Partners",
      bio: "Legal counsel specializing in intellectual property and corporate law for technology firms.",
      lastActive: "1 day ago",
    },
    {
      id: 15,
      name: "Lucas M.",
      role: "Support",
      initial: "LM",
      avatar: "/avatars/15.png",
      tags: ["CX"],
      email: "lucas.m@example.com",
      phone: "+1 (555) 567-5432",
      company: "Client Success Co.",
      bio: "Customer experience specialist dedicated to providing exceptional support and building strong client relationships.",
      lastActive: "1 hour ago",
    },
    {
      id: 16,
      name: "Emma B.",
      role: "DevOps",
      initial: "EB",
      avatar: "/avatars/16.png",
      tags: ["K8s"],
      email: "emma.b@example.com",
      phone: "+1 (555) 678-4321",
      company: "Cloud Operations Inc.",
      bio: "DevOps engineer passionate about automation, CI/CD, and managing Kubernetes infrastructure.",
      lastActive: "3 hours ago",
    },
  ];

  const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(
    null,
  );

  const handleProfileClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsProfileDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">My Network</h1>
          <p className="text-sm text-muted-foreground">
            Manage your connections and collaborators.
          </p>
        </div>
        <Button size="sm">
          <IconUserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search network..."
          className="pl-9 bg-muted/30 border-none ring-1 ring-border focus-visible:ring-ring"
        />
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="group relative flex flex-col items-center overflow-hidden border-border/40 hover:ring-2 hover:ring-primary/20 transition-all duration-300 py-4 px-2"
          >
            {/* Minimal Dots - Only on hover */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground"
              >
                <IconDotsVertical size={14} />
              </Button>
            </div>

            <CardContent className="flex flex-col items-center justify-center p-0 text-center w-full">
              {/* Massive Filling Avatar */}
              <button
                className="relative rounded-full mb-3 transition-transform duration-300 group-hover:scale-110 active:scale-95"
                onClick={() => handleProfileClick(contact)}
              >
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-background shadow-sm">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="bg-primary/5 text-primary text-lg font-bold">
                    {contact.initial}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Minimal Info */}
              <div
                className="space-y-0.5 min-w-0 w-full"
                onClick={() => handleProfileClick(contact)}
              >
                <h3 className="font-bold text-xs truncate group-hover:text-primary transition-colors cursor-pointer">
                  {contact.name}
                </h3>
                <p className="text-[10px] text-muted-foreground truncate font-medium">
                  {contact.role}
                </p>
              </div>

              {/* Single Tiny Tag */}
              <div className="mt-2 flex flex-wrap justify-center">
                {contact.tags.slice(0, 1).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[9px] px-1.5 py-0 h-3.5 font-bold bg-muted/50 border-none uppercase tracking-tighter"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-between px-2 pt-4 mt-auto">
        <p className="text-xs text-muted-foreground font-medium">
          Showing <span className="text-foreground">1-16</span> of{" "}
          <span className="text-foreground">64</span> contacts
        </p>
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium">Cards</p>
            <div className="h-8 w-[60px] border rounded-lg flex items-center justify-between px-2 text-[11px] bg-card cursor-pointer hover:bg-muted/50 transition-colors">
              16 <IconChevronDown className="h-3.5 w-3.5 opacity-50" />
            </div>
          </div>
          <div className="flex w-[80px] items-center justify-center text-xs font-medium">
            Page 1 of 4
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 rounded-lg"
              disabled
            >
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0 rounded-lg">
              <IconChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Detail Dialog */}
      {selectedContact && (
        <Dialog
          open={isProfileDialogOpen}
          onOpenChange={setIsProfileDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px] rounded-xl p-0 overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary/10 to-background h-32 flex items-center justify-center">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg -mb-16">
                <AvatarImage
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {selectedContact.initial}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="pt-20 pb-6 px-6 text-center space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedContact.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedContact.role}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {selectedContact.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-2.5 py-1 font-medium bg-muted border-none"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 text-left text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <IconMail size={16} className="text-primary" />
                  <span>{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconPhone size={16} className="text-primary" />
                  <span>{selectedContact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconBuildingCommunity size={16} className="text-primary" />
                  <span>Works at {selectedContact.company}</span>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <IconInfoCircle size={16} className="text-primary mt-1" />
                  <p className="flex-1">{selectedContact.bio}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-4 pt-0">
              <Button variant="outline" className="w-full max-w-[200px]">
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
