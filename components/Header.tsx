"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import KlyveLogo from "./KlyveLogo";

interface User {
  id: string;
  name: string;
  university?: string;
  role?: string;
  avatar_url?: string;
}

const USER_EMAIL = "admin@klyve.com"; // Demo user email

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // LOGIC: Get the first segment of the URL (e.g., "outbox" from "/outbox/1")
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Capitalize the first segment, or default to "Dashboard" if at root
  const pageTitle = firstSegment
    ? firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1).toLowerCase()
    : "Dashboard";

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user?email=${USER_EMAIL}`);
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract first and last name from full name
  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Extract first name only
  const getFirstName = (name: string) => {
    if (!name) return "User";
    return name.split(" ")[0];
  };

  return (
    <header className="sticky top-0 z-20 h-20 w-full border-b border-stone-200 bg-white/80 backdrop-blur-xl px-8 flex items-center justify-between">
      {/* LEFT SIDE: Logo (mobile) + Title */}
      <div className="flex items-center gap-6">
        {/* Mobile logo - visible on small screens */}
        <Link href="/" className="lg:hidden flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-stone-800 text-stone-100">
            <KlyveLogo size={24} className="text-stone-100" />
          </div>
        </Link>
        
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-stone-800 tracking-tight">
            {pageTitle}
          </h2>
          <p className="text-sm text-stone-500 font-normal hidden sm:block">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Profile */}
      <div className="flex items-center">
        {/* Profile Link */}
        <Link href="/profile" className="flex items-center gap-4 group pl-3 pr-4 py-2 rounded-xl hover:bg-stone-50 transition-colors">
          <div className="text-right hidden sm:block">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin text-stone-400" size={16} />
                <span className="text-sm text-stone-400">Loading...</span>
              </div>
            ) : user ? (
              <>
                <p className="text-base font-medium text-stone-800 group-hover:text-stone-900 transition-colors leading-none">
                  {getFirstName(user.name)}
                </p>
                <p className="text-sm text-stone-500 font-normal mt-1">
                  {user.university || user.role || "Recruiter"}
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-medium text-stone-800">Guest</p>
                <p className="text-sm text-stone-500 font-normal mt-1">Not logged in</p>
              </>
            )}
          </div>
          
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200 group-hover:border-stone-300 transition-colors text-stone-600 text-base font-medium">
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : user?.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(user?.name || "")
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
