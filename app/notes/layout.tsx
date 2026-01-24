"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notesData } from "./data";
import { Plus, Search, FileText, PenLine, Save } from "lucide-react";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isReading = pathname !== "/notes";

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* LEFT HALF: DYNAMIC VIEWPORT (Editor or Viewer) */}
      <div className="w-1/2 border-r border-border bg-background relative overflow-y-auto">
        {!isReading ? (
          /* CREATE NOTE MODE */
          <div className="p-8 max-w-3xl mx-auto h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <PenLine size={18} className="text-primary" />
                </div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                  New Note
                </h1>
              </div>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
                <Save size={16} /> Save Note
              </button>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-sm flex-1 flex flex-col p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Subject
                </label>
                <input
                  placeholder="Note title..."
                  className="w-full px-0 py-2 bg-transparent border-b border-border focus:border-foreground outline-none text-xl font-semibold transition-all placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Tags
                </label>
                <input
                  placeholder="Work, urgent, ideas..."
                  className="w-full px-3 py-2 bg-muted/30 border border-border rounded-md focus:ring-1 focus:ring-ring outline-none text-sm transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Content
                </label>
                <textarea
                  placeholder="Start typing your note here..."
                  className="w-full flex-1 p-4 bg-muted/10 border border-border rounded-md focus:ring-1 focus:ring-ring outline-none resize-none text-sm leading-relaxed text-foreground transition-all placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE (STANDARD LOOK) */
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {notesData.map((note) => {
              const isActive = pathname.includes(note.id);
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
                      {note.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 line-clamp-1 relative z-10">
                    {note.subject}
                  </h3>
                  <p
                    className={`text-xs line-clamp-3 leading-relaxed relative z-10 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {note.content}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
