"use client";

import React, { useState } from "react";
import { Search, MapPin, Building2, GraduationCap, X, Edit, Copy, Archive, MoreVertical, Mail, MessageSquare, ExternalLink, ChevronRight, Info, Briefcase, Phone, Calendar, Clock, Tag, Hash, Users, Link2, Send, FileText } from "lucide-react";
import { networkData, NetworkContact } from "./data";
import Link from "next/link";

function ProfileModal({ person, isOpen, onClose }: { person: NetworkContact | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !person) return null;

  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Mock data for fields not in the data structure
  const email = `${person.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
  const phone = "+1 (555) 123-4567";
  const connectedDate = "November 14";
  const lastInteraction = "Just now";
  const linkedinUrl = `linkedin.com/in/${person.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-xl border border-border w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-foreground">Contact Profile</h2>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Edit size={16} />
              <span>Edit</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Copy size={16} />
              <span>Copy</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Archive size={16} />
              <span>Archive</span>
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MoreVertical size={16} />
            </button>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Top Section: Avatar, Name, Position, Status, Location */}
          <div className="flex items-start gap-8 mb-10">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-3xl font-semibold border border-border shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{person.name}</h1>
                  <p className="text-base text-foreground mb-4">{person.position}</p>
                </div>
                {/* Send Email Button */}
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 shrink-0">
                  <Send size={16} />
                  Send Email
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-5">
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} />
                  <span>Not Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{person.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Tag size={14} />
                  <span>Tags</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Hash size={14} />
                  <span># Keywords</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>Groups</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            {/* Left Column: Contact Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email</span>
                </div>
                <a href={`mailto:${email}`} className="text-sm text-primary font-medium hover:underline block">
                  {email}
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Phone</span>
                </div>
                <a href={`tel:${phone}`} className="text-sm text-foreground font-medium hover:underline block">
                  {phone}
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Education</span>
                </div>
                <p className="text-sm text-foreground font-medium">{person.education}</p>
              </div>
            </div>

            {/* Middle Column: Interaction Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Connected</span>
                </div>
                <p className="text-sm text-foreground font-medium">{connectedDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last Interaction</span>
                </div>
                <p className="text-sm text-foreground font-medium">{lastInteraction}</p>
              </div>
            </div>

            {/* Right Column: Notes, Conversation Tracker, Insights */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Notes</h3>
                <div className="min-h-[60px] text-sm text-muted-foreground">
                  {/* Notes content would go here */}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={16} className="text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Conversation Tracker</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Link a Google Docs document to track conversations and automatically populate insights.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Google Docs link"
                    className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2">
                    <Link2 size={14} />
                    Link
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Insights</h3>
                <div className="min-h-[60px] text-sm text-muted-foreground">
                  {/* Insights content would go here */}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-border pt-8">
            <h3 className="text-sm font-semibold text-foreground mb-4">Social Links</h3>
            <a
              href={`https://${linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <span>LinkedIn</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NetworkPage() {
  const [selectedPerson, setSelectedPerson] = useState<NetworkContact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePersonClick = (person: NetworkContact) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
  };

  return (
    <>
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
              <button
                key={person.id}
                onClick={() => handlePersonClick(person)}
                className="group bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/50 transition-all duration-200 text-left w-full"
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
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProfileModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
