import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconUserPlus,
  IconDotsVertical,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

export default function NetworkPage() {
  const contacts = [
    {
      name: "Alice Johnson",
      role: "Designer",
      initial: "AJ",
      avatar: "/avatars/01.png",
      tags: ["Remote"],
    },
    {
      name: "Jackson Lee",
      role: "Engineer",
      initial: "JL",
      avatar: "/avatars/02.png",
      tags: ["React"],
    },
    {
      name: "Isabella Nguyen",
      role: "Marketing",
      initial: "IN",
      avatar: "/avatars/03.png",
      tags: ["Growth"],
    },
    {
      name: "William Kim",
      role: "CEO",
      initial: "WK",
      avatar: "/avatars/04.png",
      tags: ["Lead"],
    },
    {
      name: "Evan Wright",
      role: "Data",
      initial: "EW",
      avatar: "/avatars/05.png",
      tags: ["AI"],
    },
    {
      name: "Fiona Glenn",
      role: "HR",
      initial: "FG",
      avatar: "/avatars/06.png",
      tags: ["Hiring"],
    },
    {
      name: "Marcus Aurelius",
      role: "Founder",
      initial: "MA",
      avatar: "/avatars/07.png",
      tags: ["Strategy"],
    },
    {
      name: "Sarah Chen",
      role: "Lead",
      initial: "SC",
      avatar: "/avatars/08.png",
      tags: ["UI/UX"],
    },
    {
      name: "Leo Das",
      role: "Product",
      initial: "LD",
      avatar: "/avatars/09.png",
      tags: ["Mobile"],
    },
    {
      name: "Sophia R.",
      role: "Sales",
      initial: "SR",
      avatar: "/avatars/10.png",
      tags: ["Global"],
    },
    {
      name: "Noah J.",
      role: "Finance",
      initial: "NJ",
      avatar: "/avatars/11.png",
      tags: ["Ops"],
    },
    {
      name: "Mia Wong",
      role: "Security",
      initial: "MW",
      avatar: "/avatars/12.png",
      tags: ["Cloud"],
    },
    {
      name: "Oliver P.",
      role: "Writer",
      initial: "OP",
      avatar: "/avatars/13.png",
      tags: ["Content"],
    },
    {
      name: "Ava L.",
      role: "Legal",
      initial: "AL",
      avatar: "/avatars/14.png",
      tags: ["Policy"],
    },
    {
      name: "Lucas M.",
      role: "Support",
      initial: "LM",
      avatar: "/avatars/15.png",
      tags: ["CX"],
    },
    {
      name: "Emma B.",
      role: "DevOps",
      initial: "EB",
      avatar: "/avatars/16.png",
      tags: ["K8s"],
    },
  ];

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
            key={contact.name}
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
              <button className="relative rounded-full mb-3 transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-background shadow-sm">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="bg-primary/5 text-primary text-lg font-bold">
                    {contact.initial}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Minimal Info */}
              <div className="space-y-0.5 min-w-0 w-full">
                <h3 className="font-bold text-xs truncate group-hover:text-primary transition-colors">
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
    </div>
  );
}
