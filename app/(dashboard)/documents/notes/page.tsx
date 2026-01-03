import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconNote,
  IconPlus,
  IconSearch,
  IconTrash,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";

export default function NotesPage() {
  const notes = [
    {
      id: 1,
      title: "Project Brainstorming",
      content:
        "Ideas for the new project including marketing strategies and tech stack...",
      date: "Oct 24",
    },
    {
      id: 2,
      title: "Meeting Minutes",
      content:
        "Discussed the quarterly goals and budget allocation for next year...",
      date: "Oct 22",
    },
    {
      id: 3,
      title: "Shopping List",
      content: "Eggs, Milk, Coffee beans, Bread, Avocados, Chicken breast...",
      date: "Oct 20",
    },
    {
      id: 4,
      title: "UI Research",
      content:
        "Reviewing Perplexity and ChatGPT interface patterns for the new dashboard.",
      date: "Oct 19",
    },
    {
      id: 5,
      title: "Blog Draft",
      content:
        "Drafting a post about the future of AI agents in the workspace.",
      date: "Oct 18",
    },
    {
      id: 6,
      title: "Gym Schedule",
      content:
        "Mon: Legs, Wed: Push, Fri: Pull. Focus on progressive overload.",
      date: "Oct 15",
    },
    {
      id: 7,
      title: "Reading List",
      content:
        "Finish 'Build' by Tony Fadell and start 'Slow Productivity' by Cal Newport.",
      date: "Oct 12",
    },
    {
      id: 8,
      title: "Gift Ideas",
      content:
        "Mechanical keyboard for Sarah, Noise cancelling headphones for Dad.",
      date: "Oct 10",
    },
    {
      id: 9,
      title: "Travel Itinerary",
      content:
        "Flights booked for Tokyo. Need to finalize hotels in Shibuya and Kyoto.",
      date: "Oct 8",
    },
    {
      id: 10,
      title: "Recipe Ideas",
      content:
        "Creamy mushroom risotto, spicy tuna crispy rice, and matcha lava cake.",
      date: "Oct 5",
    },
    {
      id: 11,
      title: "Tech Stack",
      content:
        "Next.js 15, Tailwind 4, Shadcn v4, and Gemini 1.5 Pro for the backend.",
      date: "Oct 3",
    },
    {
      id: 12,
      title: "Weekly Focus",
      content:
        "Finish the settings pages, polish the chat UI, and fix the build errors.",
      date: "Oct 1",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Notes
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your thoughts and quick captures in one place.
          </p>
        </div>
        <Button size="sm" className="w-fit">
          <IconPlus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search your notes..."
          className="pl-9 bg-muted/30 border-none ring-1 ring-border focus-visible:ring-ring"
        />
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="group flex flex-col h-[180px] cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-200 shadow-sm border-border/50"
          >
            <CardHeader className="p-3 pb-1 space-y-0 flex-none">
              <div className="flex items-start justify-between">
                <div className="p-1.5 bg-primary/5 rounded text-primary/80 group-hover:bg-primary/10 transition-colors">
                  <IconNote size={14} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <IconTrash size={12} />
                </Button>
              </div>
              <CardTitle className="mt-2 text-sm font-semibold truncate leading-tight">
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-1 flex-1 overflow-hidden">
              <p className="text-xs text-muted-foreground leading-normal line-clamp-4">
                {note.content}
              </p>
            </CardContent>
            <div className="px-3 py-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-medium">
              <div className="flex items-center gap-1">
                <IconCalendar size={10} />
                <span>{note.date}</span>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Open →
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-between px-2 pt-4 mt-auto">
        <p className="text-xs text-muted-foreground font-medium">
          Showing <span className="text-foreground">1-12</span> of{" "}
          <span className="text-foreground">48</span> notes
        </p>
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium">Cards</p>
            <div className="h-8 w-[60px] border rounded-lg flex items-center justify-between px-2 text-[11px] bg-card cursor-pointer hover:bg-muted/50 transition-colors">
              12 <IconChevronDown className="h-3.5 w-3.5 opacity-50" />
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
