"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { networkData } from "../data";
import {
  Mail,
  MapPin,
  Briefcase,
  ExternalLink,
  MessageSquare,
  ChevronRight,
  Info,
} from "lucide-react";

export default function PersonProfilePage() {
  const params = useParams();
  const person = networkData.find((p) => p.id === params.id);

  if (!person)
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Person not found.
      </div>
    );

  return (
    <div className="flex-1 bg-muted/20 overflow-y-auto h-full p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER SECTION */}
        <div className="bg-card border border-border rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-3xl font-semibold border border-border">
            {person.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              {person.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground font-medium text-sm">
              <span className="flex items-center gap-1.5">
                <Briefcase size={16} /> {person.role} at {person.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={16} /> {person.location}
              </span>
            </div>
          </div>
        </div>

        {/* ADDITIONAL INFO - FULL WIDTH */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-foreground font-semibold">
            <Info size={16} className="text-primary" /> Additional Information
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm italic">
            &quot;
            {person.about ||
              "No additional bio details provided for this contact."}
            &quot;
          </p>
        </div>

        {/* INTERACTION HISTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECENT EMAILS */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5 text-foreground font-semibold">
              <Mail size={16} className="text-primary" /> Recent Emails
            </div>
            <div className="space-y-2">
              {person.emails.map((email, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-pointer p-3 hover:bg-muted/50 rounded-md transition-all border border-transparent hover:border-border"
                >
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                      {email.date}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {email.subject}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RECENT NOTES */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5 text-foreground font-semibold">
              <MessageSquare size={16} className="text-primary" /> Recent Notes
            </div>
            <div className="space-y-2">
              {person.notes && person.notes.length > 0 ? (
                person.notes.map((note, i) => (
                  <Link
                    key={i}
                    href={`/notes`}
                    className="flex items-center justify-between group p-3 hover:bg-muted/50 rounded-md transition-all border border-transparent hover:border-border"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                        Dec 20, 2025
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {note.length > 45
                          ? note.substring(0, 45) + "..."
                          : note}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm italic">
                  No notes found for this contact.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
