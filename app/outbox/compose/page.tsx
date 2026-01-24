"use client";

import React from "react";
import {
  Send,
  Bold,
  Italic,
  Underline,
  List,
  Sparkles,
  Paperclip,
  MoreHorizontal,
  PenLine,
} from "lucide-react";

export default function ComposePage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-8 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-primary/10 rounded-md">
          <PenLine size={18} className="text-primary" />
        </div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Compose Message
        </h1>
      </div>

      {/* NEW MESSAGE HEADER */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4 border-b border-border pb-3">
          <span className="text-sm font-medium text-muted-foreground w-12">
            To:
          </span>
          <input
            type="text"
            placeholder="recipient@example.com"
            className="flex-1 outline-none text-sm font-medium text-foreground bg-transparent placeholder:text-muted-foreground"
            autoFocus
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground w-12">
            Sub:
          </span>
          <input
            type="text"
            placeholder="Enter subject line..."
            className="flex-1 outline-none text-sm font-medium text-foreground bg-transparent placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* FULL WIDTH EDITOR */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden flex flex-col min-h-125 relative group focus-within:ring-1 focus-within:ring-ring transition-all">
        {/* TOOLBAR */}
        <div className="bg-muted/30 px-3 py-2 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
              <Bold size={14} />
            </button>
            <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
              <Italic size={14} />
            </button>
            <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
              <Underline size={14} />
            </button>
            <div className="w-px h-4 bg-border mx-1"></div>
            <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
              <List size={14} />
            </button>
            <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
              <Paperclip size={14} />
            </button>
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Draft
          </span>
        </div>

        {/* TEXTAREA */}
        <textarea
          className="w-full p-6 text-sm text-foreground bg-transparent placeholder:text-muted-foreground outline-none resize-none flex-1 leading-relaxed"
          placeholder="Start typing your email..."
        />

        {/* FOOTER */}
        <div className="px-4 py-3 bg-muted/10 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-primary/90 shadow-sm transition-all">
              <Send size={14} /> Send Email
            </button>
            <button className="text-muted-foreground hover:text-foreground hover:bg-muted px-4 py-2 rounded-md font-medium text-xs flex items-center gap-2 transition-all">
              <Sparkles size={14} /> AI Draft
            </button>
          </div>
          <button className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
