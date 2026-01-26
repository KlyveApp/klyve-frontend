"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  GraduationCap,
  Building2,
  Database,
  ArrowUpRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

function NextStepsDropdown({ defaultValue = "" }: { defaultValue?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "send_follow_up", label: "Send Follow Up" },
    { value: "send_second_follow_up", label: "Send 2nd Follow Up" },
    { value: "send_thank_you_email", label: "Send Thank You Email" },
    { value: "send_catch_up_email", label: "Send Catch Up Email" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || "Next step...";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-xs bg-background border border-input rounded-md px-3 py-1.5 text-foreground shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors flex items-center justify-between hover:bg-muted/50"
      >
        <span className={selectedValue ? "" : "text-muted-foreground"}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setSelectedValue(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left text-xs px-3 py-2 hover:bg-muted/50 transition-colors text-foreground"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SourcingPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-muted/20 h-full p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* TOP SEARCH CONTROL CARD */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
                size={16}
              />
              <input
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
                placeholder="Current Position..."
                className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-2">
            <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm active:scale-95">
              Execute Search
            </button>

            <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-medium text-amber-600">
                5 Searches Remaining
              </span>
            </div>
          </div>
        </div>

        {/* RESULTS TABLE CARD */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Linkedin
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email Chain
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr
                    key={item}
                    className="group hover:bg-muted/30 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-xs border border-border">
                          JD
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          John Doe {item}
                        </p>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground font-medium">
                        Fullstack Engineer
                      </p>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2
                          size={14}
                          className="text-muted-foreground"
                        />
                        <span className="text-sm font-medium text-foreground">
                          Google
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          San Francisco, CA
                        </span>
                      </div>
                    </td>

                    {/* Linkedin */}
                    <td className="px-6 py-4">
                      <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                        View
                        <ArrowUpRight size={14} />
                      </button>
                    </td>

                    {/* Status (with Next Steps dropdown) */}
                    <td className="px-6 py-4 space-y-2">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600">
                          Qualified
                        </span>
                      </div>
                      <div>
                        <NextStepsDropdown />
                      </div>
                    </td>

                    {/* Email Chain */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">
                        Not started
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
            <div className="text-xs text-muted-foreground">
              Showing <span className="font-medium text-foreground">1-5</span>{" "}
              of <span className="font-medium text-foreground">24</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-md border border-border bg-background hover:bg-muted hover:text-foreground text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 rounded-md border border-border bg-background hover:bg-muted hover:text-foreground text-muted-foreground transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
