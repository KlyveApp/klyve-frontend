"use client";

import React from "react";
import {
  Search,
  MapPin,
  GraduationCap,
  Building2,
  Briefcase,
  Database,
} from "lucide-react";

interface SearchFormProps {
  onSearch: (formData: FormData) => void;
  searchesRemaining: number;
}

export default function SearchForm({ onSearch, searchesRemaining }: SearchFormProps) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Mode Label */}
        <div className="flex bg-muted p-1 rounded-md w-fit">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-sm font-medium bg-background text-foreground shadow-sm">
            <Database size={14} /> Database
          </div>
        </div>
      </div>

      {/* Search Input Grid */}
      <form action={onSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              name="name"
              placeholder="Name or keyword..."
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative group">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              name="location"
              placeholder="Location..."
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative group">
            <GraduationCap
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              name="university"
              placeholder="University..."
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative group">
            <Building2
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              name="company"
              placeholder="Current Company..."
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative group">
            <Briefcase
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              name="position"
              placeholder="Current Position..."
              className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm active:scale-95"
          >
            Execute Search
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium text-amber-600">
              {searchesRemaining} Searches Remaining
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
