"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // LOGIC: Get the first segment of the URL (e.g., "outbox" from "/outbox/1")
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Capitalize the first segment, or default to "Dashboard" if at root
  const pageTitle = firstSegment
    ? firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1).toLowerCase()
    : "Dashboard";

  return (
    <header className="sticky top-0 z-20 h-16 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 flex items-center justify-between">
      {/* LEFT SIDE: Title */}
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-foreground tracking-tight">
          {pageTitle}
        </h2>
      </div>

      {/* RIGHT SIDE: Profile Link */}
      <div className="flex items-center gap-4">
        <Link href="/profile" className="flex items-center gap-3 group pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-none">
              Alex Rivera
            </p>
            <p className="text-xs text-muted-foreground mt-1">Premium User</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-transparent group-hover:border-border transition-all text-secondary-foreground text-sm font-medium shadow-sm">
            AR
          </div>
        </Link>
      </div>
    </header>
  );
}
