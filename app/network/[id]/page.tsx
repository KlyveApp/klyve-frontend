"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Mail,
  MapPin,
  Briefcase,
  ExternalLink,
  ChevronLeft,
  Loader2,
  Copy,
  CheckCircle,
} from "lucide-react";

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

export default function PersonProfilePage() {
  const params = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadCandidate();
    }
  }, [params.id]);

  const loadCandidate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/candidates/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setCandidate(data);
      }
    } catch (error) {
      console.error('Error loading candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!candidate) return;
    
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Candidate not found.
      </div>
    );
  }

  const email = `${candidate.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;

  return (
    <div className="flex-1 bg-muted/20 overflow-y-auto h-full p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <Link 
          href="/network"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="text-sm font-medium">Back to Network</span>
        </Link>

        {/* Main Profile Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          {/* Header with Avatar and Actions */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-3xl font-semibold border border-border">
                {candidate.initials}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                  {candidate.name}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">{candidate.role}</p>
              </div>
            </div>
            
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                copied 
                  ? "bg-emerald-500/10 text-emerald-600" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy Info"}
            </button>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Company</p>
                  <p className="text-base font-medium text-foreground">{candidate.company}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
                  <p className="text-base font-medium text-foreground">{candidate.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                  <a href={`mailto:${email}`} className="text-base font-medium text-primary hover:underline">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                  <p className="text-base font-medium text-foreground capitalize">{candidate.status.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-border">
            <a 
              href={`mailto:${email}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-md text-sm font-medium hover:bg-primary/90 transition-all"
            >
              <Mail size={16} />
              Send Email
            </a>
            
            {candidate.linkedin_url && (
              <a
                href={candidate.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-md text-sm font-medium hover:bg-muted transition-all"
              >
                <ExternalLink size={16} />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">Additional Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Chain Status</span>
              <span className="font-medium capitalize">{candidate.email_chain_status.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Added to Database</span>
              <span className="font-medium">{new Date(candidate.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">{new Date(candidate.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
