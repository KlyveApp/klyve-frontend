"use client";

import React from "react";
import { useParams } from "next/navigation";
import { notesData } from "../data";
import { Trash2, Edit3, Calendar } from "lucide-react";

export default function NoteDetailPage() {
  const params = useParams();
  const note = notesData.find((n) => n.id === params.id);

  if (!note) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 h-full flex flex-col">
      {/* HEADER: Action Buttons & Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-all shadow-sm">
            <Edit3 size={16} /> Edit Note
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-md font-medium text-sm transition-all border border-transparent hover:border-destructive/20">
            <Trash2 size={16} /> Delete
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted/50 px-3 py-1.5 rounded-full border border-border">
          <Calendar size={12} />
          <span>Last Modified: {note.date}</span>
        </div>
      </div>

      {/* MAIN CARD CONTENT */}
      <div className="bg-card rounded-lg border border-border shadow-sm flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        <div className="space-y-4 border-b border-border pb-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Subject
            </label>
            <h1 className="text-2xl font-bold text-foreground mt-1 tracking-tight">
              {note.subject}
            </h1>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mt-2">
              {note.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Content
          </label>
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
            {note.content}
          </div>
        </div>
      </div>
    </div>
  );
}
