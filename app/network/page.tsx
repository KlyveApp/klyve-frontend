"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Building2, GraduationCap, X, Copy, Loader2, ExternalLink, Send, Briefcase } from "lucide-react";
import Link from "next/link";

interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  linkedin_url?: string;
  status: string;
  email_chain_status: string;
  initials: string;
  created_at: string;
  updated_at: string;
}

function ProfileModal({ candidate, isOpen, onClose }: { candidate: Candidate | null; isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !candidate) return null;

  const handleCopy = () => {
    const text = `Name: ${candidate.name}
Role: ${candidate.role}
Company: ${candidate.company}
Location: ${candidate.location}
LinkedIn: ${candidate.linkedin_url || 'N/A'}
Status: ${candidate.status}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Generate a mock email based on name
  const email = `${candidate.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - Single column, cleaner design */}
      <div className="relative bg-background rounded-lg shadow-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-foreground">Contact Profile</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 transition-colors text-sm ${
                copied 
                  ? "text-emerald-600 font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Copy size={16} />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors ml-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content - Single Column Layout */}
        <div className="p-6 space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-2xl font-semibold border border-border shrink-0">
              {candidate.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground">{candidate.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{candidate.role}</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 size={16} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Company</p>
                <p className="text-sm font-medium text-foreground">{candidate.company}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                <p className="text-sm font-medium text-foreground">{candidate.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase size={16} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                <p className="text-sm font-medium text-foreground capitalize">{candidate.status.replace('_', ' ')}</p>
              </div>
            </div>
          </div>

          {/* Email Action */}
          <div className="pt-4 border-t border-border">
            <a 
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-all"
            >
              <Send size={16} />
              Send Email
            </a>
          </div>

          {/* LinkedIn */}
          {candidate.linkedin_url && (
            <div className="pt-2">
              <a
                href={candidate.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline text-sm"
              >
                <span>View LinkedIn Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NetworkPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCandidates(candidates);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = candidates.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.role.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query)
      );
      setFilteredCandidates(filtered);
    }
  }, [searchQuery, candidates]);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/candidates?limit=100');
      if (res.ok) {
        const data = await res.json();
        setCandidates(data.candidates);
        setFilteredCandidates(data.candidates);
      }
    } catch (error) {
      console.error('Error loading candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, company, or location..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-md text-sm outline-none focus:ring-1 focus:ring-ring transition-all placeholder:text-muted-foreground"
              />
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Showing{" "}
              <span className="text-foreground font-semibold">
                {filteredCandidates.length}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-semibold">
                {candidates.length}
              </span>{" "}
              candidates
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="animate-spin text-muted-foreground" size={32} />
            </div>
          ) : (
            /* 4-Column Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCandidates.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => handleCandidateClick(candidate)}
                  className="group bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/50 transition-all duration-200 text-left w-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4 border border-border group-hover:border-primary/20 transition-colors">
                      <span className="text-2xl font-semibold text-secondary-foreground">
                        {candidate.initials}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {candidate.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">
                      {candidate.role}
                    </p>

                    <div className="mt-6 w-full space-y-3 pt-4 border-t border-border text-left">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Building2 size={14} className="shrink-0" />
                        <span className="truncate font-medium">
                          {candidate.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <GraduationCap size={14} className="shrink-0" />
                        <span className="truncate capitalize">{candidate.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && filteredCandidates.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No candidates found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <ProfileModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
