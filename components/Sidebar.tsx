"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Send,
  Users,
  FileText,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Home,
} from "lucide-react";

const tabs = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Sourcing", href: "/sourcing", icon: Search },
  { name: "Outbox", href: "/outbox", icon: Send },
  { name: "Network", href: "/network", icon: Users },
  { name: "Resume", href: "/resume", icon: FileText },
  { name: "Notes", href: "/notes", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0 h-full">
      {/* COMPANY LOGO */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <LayoutDashboard size={16} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Klyve
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
        <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
          Platform
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 group text-sm font-medium ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon
                size={18}
                className={`mr-3 transition-colors ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground/80 group-hover:text-accent-foreground"
                }`}
              />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER SETTINGS */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/settings"
          className={`flex items-center w-full px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
            pathname === "/settings"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Settings
            size={18}
            className={`mr-3 transition-colors ${
              pathname === "/settings"
                ? "text-accent-foreground"
                : "text-muted-foreground group-hover:text-accent-foreground"
            }`}
          />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
