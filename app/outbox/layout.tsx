"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { outboxData } from "./data";
import { Plus, Search, MapPin, Building2, ArrowUpRight, ChevronDown } from "lucide-react";

function NextStepsDropdown({ 
  defaultValue = "", 
  onSelect 
}: { 
  defaultValue?: string;
  onSelect?: (value: string) => void;
}) {
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-xs bg-background border border-input rounded-md px-2 py-1 text-foreground shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors flex items-center justify-between hover:bg-muted/50 whitespace-nowrap"
      >
        <span className={selectedValue ? "" : "text-muted-foreground"}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={12}
          className={`text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-max min-w-full mt-1 bg-background border border-input rounded-md shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedValue(option.value);
                setIsOpen(false);
                onSelect?.(option.value);
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

export default function OutboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = outboxData.filter((msg) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.recipient.toLowerCase().includes(query) ||
      msg.subject.toLowerCase().includes(query) ||
      msg.preview.toLowerCase().includes(query) ||
      msg.role?.toLowerCase().includes(query) ||
      msg.company?.toLowerCase().includes(query) ||
      msg.location?.toLowerCase().includes(query) ||
      msg.nextSteps?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* LEFT COLUMN: LIST VIEW */}
      <div className="w-[750px] xl:w-[850px] border-r border-border flex flex-col shrink-0 bg-background">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto">
          {filteredData.map((msg) => {
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
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold shrink-0 ${isActive ? "text-foreground" : ""}`}
                    >
                      {msg.recipient}
                    </span>
                    
                    {/* Fields extending to the right */}
                    <div className="flex items-center gap-3 flex-wrap text-xs">
                      {msg.role && (
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-foreground font-medium">{msg.role}</span>
                        </div>
                      )}
                      {msg.company && (
                        <div className="flex items-center gap-1 shrink-0">
                          <Building2 size={12} className="text-muted-foreground shrink-0" />
                          <span className="text-foreground font-medium">{msg.company}</span>
                        </div>
                      )}
                      {msg.location && (
                        <div className="flex items-center gap-1 shrink-0">
                          <MapPin size={12} className="text-muted-foreground shrink-0" />
                          <span className="text-foreground font-medium">{msg.location}</span>
                        </div>
                      )}
                      {msg.linkedin && (
                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`https://${msg.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            <span>LinkedIn</span>
                            <ArrowUpRight size={10} />
                          </a>
                        </div>
                      )}
                      {msg.nextSteps && (
                        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                          <NextStepsDropdown defaultValue={msg.nextSteps} />
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide shrink-0 ml-auto">
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
