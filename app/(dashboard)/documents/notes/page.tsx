import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconNote, IconPlus, IconSearch, IconTrash, IconCalendar } from "@tabler/icons-react";

export default function NotesPage() {
  const notes = [
    { id: 1, title: "Project Brainstorming", content: "Ideas for the new project including marketing strategies and tech stack...", date: "Oct 24, 2023" },
    { id: 2, title: "Meeting Minutes", content: "Discussed the quarterly goals and budget allocation for next year...", date: "Oct 22, 2023" },
    { id: 3, title: "Shopping List", content: "Eggs, Milk, Coffee beans, Bread, Avocados, Chicken breast...", date: "Oct 20, 2023" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">Capture your thoughts and ideas quickly.</p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search notes..."
          className="pl-8"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="flex flex-col h-full cursor-pointer hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <IconNote size={20} />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <IconTrash size={16} />
                </Button>
              </div>
              <CardTitle className="mt-4 text-lg">{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {note.content}
              </p>
            </CardContent>
            <div className="px-6 py-3 border-t flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
              <IconCalendar size={12} />
              {note.date}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
