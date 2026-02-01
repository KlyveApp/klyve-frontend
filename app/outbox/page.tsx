"use client";

import React from "react";
import Link from "next/link";
import { Mail, Plus, MousePointerClick } from "lucide-react";

export default function OutboxIndexPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-muted/20">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Minimal Icon Composition */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center border border-border">
            <Mail
              size={40}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full border-[3px] border-background shadow-sm">
            <Plus size={16} strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Your Outbox is Waiting
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mx-auto">
            Select an email from the left to read or edit it, or compose a new
            email to get started.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/outbox/compose"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium text-sm hover:bg-primary/90 transition-all shadow-sm active:scale-95"
          >
            <Plus size={16} />
            Compose New
          </Link>

          <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider px-3 py-2">
            <MousePointerClick size={14} className="animate-bounce" />
            Or select an email
          </div>
        </div>
      </div>
    </div>
  );
}
