"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  linkedinUrl?: string;
  status: "none" | "qualified" | "contacted" | "responded";
  emailChainStatus: "not_started" | "started";
  initials: string;
}

interface ResultsTableProps {
  candidates: Candidate[];
  onStatusChange: (candidateId: string, status: string) => void;
  onEmailChainChange: (candidateId: string, status: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  isAiMode: boolean;
}

export default function ResultsTable({
  candidates,
  onStatusChange,
  onEmailChainChange,
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  isAiMode,
}: ResultsTableProps) {
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);

  const getStatusBadge = (status: Candidate["status"]) => {
    const statusConfig = {
      none: { bg: "bg-gray-500/10", text: "text-gray-600", label: "None" },
      qualified: { bg: "bg-emerald-500/10", text: "text-emerald-600", label: "Qualified" },
      contacted: { bg: "bg-blue-500/10", text: "text-blue-600", label: "Contacted" },
      responded: { bg: "bg-purple-500/10", text: "text-purple-600", label: "Responded" },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const startIndex = (currentPage - 1) * 5 + 1;
  const endIndex = Math.min(startIndex + candidates.length - 1, totalResults);

  // AI Mode Placeholder
  if (isAiMode) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-lg font-medium text-muted-foreground mb-2">
            AI Search Feature
          </div>
          <div className="text-sm text-muted-foreground/60">
            Rolling out currently
          </div>
        </div>
      </div>
    );
  }

  return (
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
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="group hover:bg-muted/30 transition-colors"
              >
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-xs border border-border">
                      {candidate.initials}
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {candidate.name}
                    </p>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground font-medium">
                    {candidate.role}
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
                      {candidate.company}
                    </span>
                  </div>
                </td>

                {/* Location */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {candidate.location}
                    </span>
                  </div>
                </td>

                {/* Linkedin */}
                <td className="px-6 py-4">
                  {candidate.linkedinUrl ? (
                    <a
                      href={candidate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </td>

                {/* Status Dropdown */}
                <td className="px-6 py-4">
                  {editingStatus === candidate.id ? (
                    <select
                      value={candidate.status}
                      onChange={(e) => {
                        onStatusChange(candidate.id, e.target.value);
                        setEditingStatus(null);
                      }}
                      onBlur={() => setEditingStatus(null)}
                      autoFocus
                      className="text-sm bg-background border border-input rounded px-2 py-1"
                    >
                      <option value="none">None</option>
                      <option value="qualified">Qualified</option>
                      <option value="contacted">Contacted</option>
                      <option value="responded">Responded</option>
                    </select>
                  ) : (
                    <div 
                      onClick={() => setEditingStatus(candidate.id)}
                      className="cursor-pointer"
                    >
                      {getStatusBadge(candidate.status)}
                    </div>
                  )}
                </td>

                {/* Email Chain Dropdown */}
                <td className="px-6 py-4">
                  {editingEmail === candidate.id ? (
                    <select
                      value={candidate.emailChainStatus}
                      onChange={(e) => {
                        onEmailChainChange(candidate.id, e.target.value);
                        setEditingEmail(null);
                      }}
                      onBlur={() => setEditingEmail(null)}
                      autoFocus
                      className="text-sm bg-background border border-input rounded px-2 py-1"
                    >
                      <option value="not_started">Not started</option>
                      <option value="started">Started</option>
                    </select>
                  ) : (
                    <span 
                      onClick={() => setEditingEmail(candidate.id)}
                      className="text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                    >
                      {candidate.emailChainStatus === "not_started" ? "Not started" : "Started"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
        <div className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{startIndex}-{endIndex}</span>{" "}
          of <span className="font-medium text-foreground">{totalResults}</span> results
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-md border border-border bg-background hover:bg-muted hover:text-foreground text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="p-2 rounded-md border border-border bg-background hover:bg-muted hover:text-foreground text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
