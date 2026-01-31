"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/sourcing/SearchForm";
import ResultsTable, { Candidate } from "@/components/sourcing/ResultsTable";

export default function SourcingPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchesRemaining, setSearchesRemaining] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchFilters, setSearchFilters] = useState<{
    name?: string;
    location?: string;
    university?: string;
    company?: string;
    position?: string;
  }>({});

  useEffect(() => {
    loadData();
  }, [currentPage, searchFilters]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load search quota
      const quotaRes = await fetch('/api/search-quota');
      if (quotaRes.ok) {
        const quota = await quotaRes.json();
        setSearchesRemaining(quota.remaining);
      }
      
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
        status: candidate.status,
        emailChainStatus: candidate.email_chain_status,
        initials: candidate.initials
      }));
      
      setCandidates(transformedCandidates);
      setTotalResults(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (formData: FormData) => {
    if (searchesRemaining <= 0) {
      alert('No searches remaining. Please try again tomorrow.');
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
      
      if (res.status === 403) {
        const error = await res.json();
        alert(error.error);
        return;
      }
      
      if (!res.ok) throw new Error('Search failed');
      
      const result = await res.json();
      
      // Update searches remaining
      setSearchesRemaining(result.searchesRemaining);
      
      // Update filters and reset pagination
      setSearchFilters(filters);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error during search:', error);
      alert('Search failed. Please try again.');
    }
  };

  const handleNextStepSelect = async (candidateId: string, nextStep: string) => {
    try {
      const res = await fetch('/api/candidates/next-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId, nextStep })
      });
      
      if (!res.ok) throw new Error('Failed to update next step');
      
      // Reload data to show the updated next step
      await loadData();
    } catch (error) {
      console.error('Error updating next step:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-muted/20 h-full p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <SearchForm 
          onSearch={handleSearch} 
          searchesRemaining={searchesRemaining}
        />
        
        {loading ? (
          <div className="bg-card rounded-lg border border-border shadow-sm p-8 text-center">
            <div className="text-muted-foreground">Loading candidates...</div>
          </div>
        ) : (
          <ResultsTable
            candidates={candidates}
            onNextStepSelect={handleNextStepSelect}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={totalResults}
          />
        )}
      </div>
    </div>
  );
}
