"use client";

import React from "react";
import {
  User as UserIcon,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Save,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
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
