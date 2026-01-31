"use client";

import React from "react";
import {
  Building2,
  MapPin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NextStepsDropdown from "./NextStepsDropdown";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  linkedinUrl?: string;
  status: "qualified" | "contacted" | "responded" | "not_interested";
  emailChainStatus: "not_started" | "initial_sent" | "conversation_active" | "completed";
  initials: string;
}

interface ResultsTableProps {
  candidates: Candidate[];
  onNextStepSelect: (candidateId: string, nextStep: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
}

export default function ResultsTable({
  candidates,
  onNextStepSelect,
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
}: ResultsTableProps) {
  const getStatusBadge = (status: Candidate["status"]) => {
    const statusConfig = {
      qualified: { bg: "bg-emerald-500/10", text: "text-emerald-600", label: "Qualified" },
      contacted: { bg: "bg-blue-500/10", text: "text-blue-600", label: "Contacted" },
      responded: { bg: "bg-purple-500/10", text: "text-purple-600", label: "Responded" },
      not_interested: { bg: "bg-gray-500/10", text: "text-gray-600", label: "Not Interested" },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getEmailChainStatus = (status: Candidate["emailChainStatus"]) => {
    const statusMap = {
      not_started: "Not started",
      initial_sent: "Initial sent",
      conversation_active: "Conversation active",
      completed: "Completed",
    };
    return statusMap[status];
  };

  const startIndex = (currentPage - 1) * 5 + 1;
  const endIndex = Math.min(startIndex + candidates.length - 1, totalResults);

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

                {/* Status (with Next Steps dropdown) */}
                <td className="px-6 py-4 space-y-2">
                  <div>
                    {getStatusBadge(candidate.status)}
                  </div>
                  <div>
                    <NextStepsDropdown
                      onSelect={(nextStep) => onNextStepSelect(candidate.id, nextStep)}
                    />
                  </div>
                </td>

                {/* Email Chain */}
                <td className="px-6 py-4">
                  <span className="text-xs text-muted-foreground">
                    {getEmailChainStatus(candidate.emailChainStatus)}
                  </span>
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
