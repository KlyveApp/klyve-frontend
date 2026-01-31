"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Search, FileText, Loader2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isReading = pathname !== "/notes";
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* LEFT HALF: DYNAMIC VIEWPORT (Editor or Viewer) */}
      <div className="w-1/2 border-r border-border bg-background relative overflow-y-auto">
        {isReading ? (
          /* VIEW MODE (STANDARD LOOK) */
          <div className="h-full">{children}</div>
        ) : (
          /* CREATE NOTE MODE - Will be handled by the page component */
          <div className="h-full">{children}</div>
        )}
      </div>

      {/* RIGHT HALF: LIST VIEW */}
      <div className="w-1/2 bg-muted/20 flex flex-col h-full">
        <div className="p-4 flex items-center gap-4 border-b border-border bg-background/50 backdrop-blur-sm">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your notes..."
              className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>
          <Link
            href="/notes"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm shrink-0"
          >
            <Plus size={16} />
            Compose
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-muted-foreground" size={24} />
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchQuery ? "No notes found matching your search" : "No notes yet. Click Compose to create one!"}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredNotes.map((note) => {
                const isActive = pathname.includes(note.id);
                const dateStr = formatDate(note.updated_at);
                return (
                  <Link
                    key={note.id}
                    href={`/notes/${note.id}`}
                    className={`aspect-[1.5/1] p-5 rounded-lg border transition-all flex flex-col group relative overflow-hidden ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-sm"
                    }`}
                  >
                    {/* Decorative background element for inactive cards */}
                    {!isActive && (
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FileText size={48} />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {dateStr}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base mb-2 line-clamp-1 relative z-10">
                      {note.title}
                    </h3>
                    <p
                      className={`text-xs line-clamp-3 leading-relaxed relative z-10 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {note.content}
                    </p>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto pt-2 relative z-10">
                        {note.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                              isActive 
                                ? "bg-primary-foreground/20 text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {note.tags.length > 3 && (
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                              isActive 
                                ? "bg-primary-foreground/20 text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            +{note.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
