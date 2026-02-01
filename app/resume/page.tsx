"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Star, 
  Trash2, 
  ChevronDown, 
  Search,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface Resume {
  id: string;
  filename: string;
  file_size: number;
  file_type: string;
  is_starred: boolean;
  created_at: string;
  updated_at: string;
}

const USER_ID = "cc0bdfbe-4ba4-48a5-8846-7749a8ab6212"; // Demo user ID

export default function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadResumes();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/api/resumes?userId=${USER_ID}`);
      if (!res.ok) throw new Error('Failed to load resumes');
      
      const data = await res.json();
      setResumes(data);
      
      // Set active resume to starred one, or first one
      if (data.length > 0) {
        const starred = data.find((r: Resume) => r.is_starred);
        setActiveResume(starred || data[0]);
      }
    } catch (err) {
      setError('Failed to load resumes. Please try again.');
      console.error('Error loading resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', USER_ID);

      const res = await fetch('/api/resumes', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const newResume = await res.json();
      setResumes(prev => [newResume, ...prev]);
      setActiveResume(newResume);
      setSuccess('Resume uploaded successfully!');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleStar = async () => {
    if (!activeResume) return;

    try {
      setError(null);
      const action = activeResume.is_starred ? 'unstar' : 'star';
      
      const res = await fetch(`/api/resumes/${activeResume.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId: USER_ID })
      });

      if (!res.ok) throw new Error('Failed to update star status');

      const updatedResume = await res.json();
      
      // Update local state
      setResumes(prev => prev.map(r => 
        r.id === updatedResume.id 
          ? updatedResume 
          : { ...r, is_starred: false } // Unstar all others
      ));
      setActiveResume(updatedResume);
      
      setSuccess(action === 'star' ? 'Resume starred!' : 'Resume unstarred');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Failed to update star status');
    }
  };

  const handleDelete = async () => {
    if (!activeResume) return;
    
    if (!confirm(`Are you sure you want to delete "${activeResume.filename}"? This cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(activeResume.id);
      setError(null);

      const res = await fetch(`/api/resumes/${activeResume.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete resume');

      // Remove from list and select next resume
      const updatedResumes = resumes.filter(r => r.id !== activeResume.id);
      setResumes(updatedResumes);
      setActiveResume(updatedResumes[0] || null);
      
      setSuccess('Resume deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete resume');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = () => {
    if (!activeResume) return;
    window.open(`/api/resumes/${activeResume.id}/download`, '_blank');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredResumes = resumes.filter(r => 
    r.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-100 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="mt-4 text-slate-600">Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white">
      {/* Notifications */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
          <button onClick={() => setError(null)} className="ml-2 hover:text-red-900">
            <X size={16} />
          </button>
        </div>
      )}
      
      {success && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle size={18} />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {/* TOP TOOLBAR */}
      <div className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          {/* Resume Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
            >
              <FileText size={18} className="text-blue-600" />
              <span className="text-sm font-bold text-slate-700 max-w-[200px] truncate">
                {activeResume?.filename || 'No resume selected'}
              </span>
              {activeResume?.is_starred && (
                <Star size={14} className="text-amber-500 fill-amber-500" />
              )}
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3">
                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <p className="px-2 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {filteredResumes.length} Resume{filteredResumes.length !== 1 ? 's' : ''}
                </p>
                
                <div className="max-h-60 overflow-y-auto mt-1">
                  {filteredResumes.length === 0 ? (
                    <p className="px-2 py-3 text-sm text-slate-400 text-center">No resumes found</p>
                  ) : (
                    filteredResumes.map((resume) => (
                      <button
                        key={resume.id}
                        onClick={() => {
                          setActiveResume(resume);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-3 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                          activeResume?.id === resume.id ? 'bg-blue-50 border border-blue-100' : ''
                        }`}
                      >
                        <FileText size={16} className="text-slate-400 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700 truncate">{resume.filename}</span>
                            {resume.is_starred && (
                              <Star size={12} className="text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                            <span>{formatFileSize(resume.file_size)}</span>
                            <span>•</span>
                            <span>{formatDate(resume.created_at)}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload PDF
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Star Button */}
          <button 
            onClick={handleStar}
            disabled={!activeResume}
            className={`p-2.5 rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              activeResume?.is_starred 
                ? 'bg-amber-50 border-amber-200 text-amber-500' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
            }`}
            title={activeResume?.is_starred ? 'Unstar resume' : 'Star as primary resume'}
          >
            <Star size={20} fill={activeResume?.is_starred ? "currentColor" : "none"} />
          </button>
          
          {/* Delete Button */}
          <button 
            onClick={handleDelete}
            disabled={!activeResume || deleting === activeResume?.id}
            className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
            title="Delete resume"
          >
            {deleting === activeResume?.id ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Trash2 size={20} />
            )}
          </button>
          
          <div className="w-[1px] h-6 bg-slate-200 mx-2" />
          
          {/* Download Button */}
          <button 
            onClick={handleDownload}
            disabled={!activeResume}
            className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl transition-all disabled:opacity-50"
            title="Download resume"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* PDF VIEWPORT - Minimal (no toolbar) */}
      <div className="flex-1 overflow-y-auto bg-white">
        {activeResume ? (
          <iframe
            src={`/api/resumes/${activeResume.id}/view#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none"
            title="Resume Viewer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 h-full">
            <FileText size={64} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No resumes uploaded yet</p>
            <p className="text-sm mt-2">Upload your first resume to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
