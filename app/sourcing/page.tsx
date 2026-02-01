"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/sourcing/SearchForm";
import ResultsTable, { Candidate } from "@/components/sourcing/ResultsTable";

export default function SourcingPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState<"database" | "ai">("database");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalEntries, setTotalEntries] = useState(12416); // Mock total database entries
  const [searchFilters, setSearchFilters] = useState<{
    name?: string;
    location?: string;
    university?: string;
    company?: string;
    position?: string;
  }>({});

  useEffect(() => {
    if (searchMode === "database") {
      loadData();
    }
  }, [currentPage, searchFilters, searchMode]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', '5');
      if (searchFilters.name) params.set('name', searchFilters.name);
      if (searchFilters.location) params.set('location', searchFilters.location);
      if (searchFilters.company) params.set('company', searchFilters.company);
      if (searchFilters.position) params.set('role', searchFilters.position);
      if (searchFilters.university) params.set('university', searchFilters.university);
      
      // Load candidates
      const res = await fetch(`/api/candidates?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch candidates');
      
      const result = await res.json();
      
      // Transform database results to match Candidate interface
      const transformedCandidates: Candidate[] = result.candidates.map((candidate: any) => ({
        id: candidate.id,
        name: candidate.name,
        role: candidate.role,
        company: candidate.company,
        location: candidate.location,
        linkedinUrl: candidate.linkedin_url,
        status: candidate.status || "none",
        emailChainStatus: candidate.email_chain_status || "not_started",
        initials: candidate.initials
      }));
      
      setCandidates(transformedCandidates);
      setTotalResults(result.totalCount);
      setTotalPages(result.totalPages);
      setTotalEntries(result.totalCount > totalEntries ? result.totalCount : totalEntries);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (formData: FormData) => {
    if (searchMode === "ai") {
      // AI search not yet available
      return;
    }

    const filters = {
      name: formData.get('name') as string || undefined,
      location: formData.get('location') as string || undefined,
      university: formData.get('university') as string || undefined,
      company: formData.get('company') as string || undefined,
      position: formData.get('position') as string || undefined,
    };

    try {
      // Execute search via API
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters, record: true })
      });
      
      if (!res.ok) throw new Error('Search failed');
      
      // Update filters and reset pagination
      setSearchFilters(filters);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error during search:', error);
      alert('Search failed. Please try again.');
    }
  };

  const handleStatusChange = async (candidateId: string, status: string) => {
    try {
      const res = await fetch(`/api/candidates/${candidateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      // Update local state
      setCandidates(prev => prev.map(c => 
        c.id === candidateId ? { ...c, status: status as Candidate["status"] } : c
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleEmailChainChange = async (candidateId: string, emailStatus: string) => {
    try {
      const res = await fetch(`/api/candidates/${candidateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_chain_status: emailStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update email chain status');
      
      // Update local state
      setCandidates(prev => prev.map(c => 
        c.id === candidateId ? { ...c, emailChainStatus: emailStatus as Candidate["emailChainStatus"] } : c
      ));
    } catch (error) {
      console.error('Error updating email chain status:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchModeChange = (mode: "database" | "ai") => {
    setSearchMode(mode);
    if (mode === "ai") {
      setCandidates([]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-muted/20 h-full p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <SearchForm 
          onSearch={handleSearch}
          searchMode={searchMode}
          onSearchModeChange={handleSearchModeChange}
          totalEntries={totalEntries}
        />
        
        {loading && searchMode === "database" ? (
          <div className="bg-card rounded-lg border border-border shadow-sm p-8 text-center">
            <div className="text-muted-foreground">Loading candidates...</div>
          </div>
        ) : (
          <ResultsTable
            candidates={candidates}
            onStatusChange={handleStatusChange}
            onEmailChainChange={handleEmailChainChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={totalResults}
            isAiMode={searchMode === "ai"}
          />
        )}
      </div>
    </div>
  );
}
