"use client";

import React from "react";
import { useParams } from "next/navigation";
import { outboxData } from "../data";
import {
  Star,
  Trash2,
  Bold,
  Italic,
  Underline,
  List,
  Paperclip,
  Send,
  Sparkles,
  MoreHorizontal,
  CornerDownRight,
} from "lucide-react";

export default function MessageDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Find the message based on the ID in the URL
  const activeMessage = outboxData.find((m) => m.id === id);

  if (!activeMessage) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Message not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-8 space-y-6">
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            {activeMessage.subject}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">To:</span>
            <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium text-foreground">
              {activeMessage.recipient}
            </span>
            <span className="text-xs">•</span>
            <span className="text-xs">{activeMessage.timestamp}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-amber-500 hover:bg-muted/50 rounded-md transition-all">
            <Star size={18} />
          </button>
          <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* PREVIOUS EMAIL CONTENT (History) */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground border border-border">
            {activeMessage.recipient
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {activeMessage.recipient}
            </p>
            <p className="text-xs text-muted-foreground">Original Sender</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
          {activeMessage.body}
        </div>
      </div>

      {/* FULL WIDTH REPLY EDITOR */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden flex flex-col relative group focus-within:ring-1 focus-within:ring-ring transition-all">
        {/* RICH TEXT TOOLBAR */}
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
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <CornerDownRight size={12} /> Reply
          </div>
        </div>

        {/* TEXTAREA */}
        <textarea
          className="w-full p-6 bg-transparent outline-none resize-none min-h-50 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground"
          placeholder={`Reply to ${activeMessage.recipient.split(" ")[0]}...`}
        />

        {/* FOOTER ACTIONS */}
        <div className="px-4 py-3 bg-muted/10 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="bg-primary text-primary-foreground px-5 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm">
              <Send size={14} /> Send Response
            </button>
            <button className="text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2 rounded-md font-medium text-xs flex items-center gap-2 transition-all">
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
