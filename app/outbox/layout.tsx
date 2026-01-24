"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { outboxData } from "./data";
import { Plus, Search } from "lucide-react";

export default function OutboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* LEFT COLUMN: LIST VIEW */}
      <div className="w-[320px] xl:w-[360px] border-r border-border flex flex-col shrink-0 bg-background">
        {/* Header Section */}
        <div className="p-4 space-y-3 border-b border-border">
          <Link
            href="/outbox/compose"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
          >
            <Plus size={18} /> Compose New
          </Link>
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              placeholder="Search outbox..."
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto">
          {outboxData.map((msg) => {
            const isActive = pathname.includes(msg.id);
            return (
              <Link
                key={msg.id}
                href={`/outbox/${msg.id}`}
                className={`w-full text-left border-b border-border flex items-start p-4 transition-all group ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted/50 text-foreground"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-sm font-semibold truncate ${isActive ? "text-foreground" : ""}`}
                    >
                      {msg.recipient}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p
                    className={`text-sm font-medium truncate ${isActive ? "text-foreground/90" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-1 leading-relaxed">
                    {msg.preview}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: DYNAMIC CONTENT */}
      <div className="flex-1 bg-muted/20 overflow-y-auto">{children}</div>
    </div>
  );
}
