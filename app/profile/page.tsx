"use client";

import React, { useState, useEffect } from "react";
import {
  User as UserIcon,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Save,
  Camera,
  Search,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [searchesRemaining, setSearchesRemaining] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      // For demo purposes, using a default user email
      // In production, this would come from authentication
      const userRes = await fetch('/api/user?email=alex.rivera@example.com');
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
        setSearchesRemaining(userData.remaining_searches || 5);
      } else {
        // If no user found, use default quota
        const quotaRes = await fetch('/api/search-quota');
        if (quotaRes.ok) {
          const quota = await quotaRes.json();
          setSearchesRemaining(quota.remaining);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-muted/20 overflow-y-auto h-full p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* PROFILE HEADER / INITIALS SECTION */}
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-3xl font-semibold border border-border transition-all group-hover:bg-secondary/80">
              AR
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </div>

          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Alex Rivera
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              Premium User
            </p>
          </div>
        </div>

        {/* SEARCH QUOTA SECTION */}
        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 rounded-md text-amber-600">
              <Search size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Search Quota</h2>
              <p className="text-xs text-muted-foreground">Daily search limit</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">{searchesRemaining}</p>
              <p className="text-xs text-muted-foreground">Searches Remaining</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-medium text-amber-600">
                {searchesRemaining > 0 ? 'Active' : 'Limit Reached'}
              </span>
            </div>
          </div>
          
          {searchesRemaining === 0 && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-600">
                You have used all your searches for today. Your quota will reset tomorrow.
              </p>
            </div>
          )}
        </div>

        {/* MAIN FORM SECTION */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-6 space-y-8">
            {/* Name & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <UserIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                    size={16}
                  />
                  <input
                    defaultValue="Alex"
                    className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide ml-1">
                  Last Name
                </label>
                <input
                  defaultValue="Rivera"
                  className="w-full px-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide ml-1">
                  City
                </label>
                <div className="relative group">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                    size={16}
                  />
                  <input
                    defaultValue="Austin"
                    className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide ml-1">
                  State
                </label>
                <input
                  defaultValue="Texas"
                  className="w-full px-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                />
              </div>
            </div>

            {/* Education Section */}
            <div className="pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-primary" />
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    University
                  </label>
                </div>
                <input
                  defaultValue="University of Texas at Austin"
                  className="w-full px-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-primary" />
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Major
                  </label>
                </div>
                <input
                  defaultValue="Computer Science"
                  className="w-full px-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-primary" />
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Grad Year
                  </label>
                </div>
                <input
                  defaultValue="2026"
                  className="w-full px-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all"
                />
              </div>
            </div>

            {/* About Me Section */}
            <div className="pt-6 border-t border-border space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide ml-1">
                About Me
              </label>
              <textarea
                rows={5}
                defaultValue="Aspiring software engineer with a passion for building clean, user-centric dashboard experiences. Currently focused on mastering the Next.js ecosystem and building the Nexus platform."
                className="w-full p-3 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm leading-relaxed resize-none transition-all"
              />
            </div>
          </div>

          {/* SAVE BUTTON FOOTER */}
          <div className="bg-muted/30 px-6 py-4 border-t border-border flex justify-end">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-all shadow-sm">
              <Save size={16} />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
