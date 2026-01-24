"use client";

import React from "react";
import Link from "next/link";
import { Search, MapPin, Building2, GraduationCap } from "lucide-react";
import { networkData } from "./data";

export default function NetworkPage() {
  return (
    <div className="h-full flex flex-col bg-muted/20 overflow-y-auto">
      <div className="p-8 max-w-[1600px] mx-auto w-full space-y-8">
        {/* Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={18}
            />
            <input
              placeholder="Search network by name, company, or school..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md text-sm outline-none focus:ring-1 focus:ring-ring transition-all placeholder:text-muted-foreground"
            />
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Showing{" "}
            <span className="text-foreground font-semibold">
              {networkData.length}
            </span>{" "}
            connections
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {networkData.map((person) => (
            <Link
              key={person.id}
              href={`/network/${person.id}`}
              className="group bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4 border border-border group-hover:border-primary/20 transition-colors">
                  <span className="text-2xl font-semibold text-secondary-foreground">
                    {person.avatar}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {person.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                  {person.position}
                </p>

                <div className="mt-6 w-full space-y-3 pt-4 border-t border-border text-left">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Building2 size={14} className="shrink-0" />
                    <span className="truncate font-medium">
                      {person.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">{person.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <GraduationCap size={14} className="shrink-0" />
                    <span className="truncate">{person.education}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
