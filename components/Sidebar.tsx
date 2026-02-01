"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Send,
  Users,
  FileText,
  Settings,
  MessageSquare,
  Home,
} from "lucide-react";
import KlyveLogo from "./KlyveLogo";

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
    <aside className="w-72 border-r border-stone-200 bg-white flex flex-col shrink-0 h-full">
      {/* COMPANY LOGO */}
      <div className="p-8 border-b border-stone-100">
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-stone-800 text-stone-100 transition-all group-hover:bg-stone-700">
            <KlyveLogo size={28} className="text-stone-100" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-stone-800">
              Klyve
            </span>
            <p className="text-xs text-stone-400 font-medium tracking-wide mt-0.5">RECRUITING PLATFORM</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-6">
        <div className="px-4 mb-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">
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
              className={`flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 group text-base font-medium mb-1 ${
                isActive
                  ? "bg-stone-800 text-stone-50"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              <Icon
                size={22}
                className={`mr-4 transition-colors ${
                  isActive
                    ? "text-stone-300"
                    : "text-stone-400 group-hover:text-stone-600"
                }`}
              />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER SETTINGS */}
      <div className="p-4 border-t border-stone-100 space-y-2">
        <Link
          href="/settings"
          className={`flex items-center w-full px-4 py-3.5 rounded-lg transition-all duration-200 text-base font-medium ${
            pathname === "/settings"
              ? "bg-stone-100 text-stone-900"
              : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
          }`}
        >
          <Settings
            size={22}
            className={`mr-4 transition-colors ${
              pathname === "/settings"
                ? "text-stone-700"
                : "text-stone-400"
            }`}
          />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
