"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Star, 
  Trash2, 
  ChevronDown, 
  Search,
  ExternalLink,
  Download
} from 'lucide-react';

export default function ResumePage() {
  // Mock state for multiple resumes
  const [resumes] = useState([
    { id: '1', name: 'Frontend_Developer_2026.pdf', date: 'Jan 15, 2026' },
    { id: '2', name: 'Product_Designer_v2.pdf', date: 'Dec 20, 2025' },
    { id: '3', name: 'Sarah_Chen_CV.pdf', date: 'Jan 02, 2026' },
  ]);

  const [activeResume, setActiveResume] = useState(resumes[0]);
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-100">
      
      {/* TOP TOOLBAR */}
      <div className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          {/* Resume Selector Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">
              <FileText size={18} className="text-blue-600" />
              <span className="text-sm font-bold text-slate-700 max-w-[200px] truncate">
                {activeResume.name}
              </span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
            
            {/* Dropdown Menu (Hidden by default) */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
              <p className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Resumes</p>
              {resumes.map((resume) => (
                <button
                  key={resume.id}
                  onClick={() => setActiveResume(resume)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors flex flex-col"
                >
                  <span className="font-bold text-slate-700">{resume.name}</span>
                  <span className="text-[10px] text-slate-400">{resume.date}</span>
                </button>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Upload size={18} />
            Upload PDF
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsStarred(!isStarred)}
            className={`p-2.5 rounded-xl border transition-all ${
              isStarred 
                ? 'bg-amber-50 border-amber-200 text-amber-500' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
            }`}
          >
            <Star size={20} fill={isStarred ? "currentColor" : "none"} />
          </button>
          
          <button className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all">
            <Trash2 size={20} />
          </button>
          
          <div className="w-[1px] h-6 bg-slate-200 mx-2" />
          
          <button className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* PDF VIEWPORT */}
      <div className="flex-1 overflow-hidden p-6 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
          {/* For a real PDF, change src to "/resume.pdf" or activeResume.url */}
          <iframe
            src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#toolbar=0"
            className="w-full h-full border-none"
            title="Resume Viewer"
          />
          
          {/* Custom Overlay for a more "integrated" feel */}
          <div className="absolute top-4 right-8 pointer-events-none">
             <div className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
               Live Preview
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}