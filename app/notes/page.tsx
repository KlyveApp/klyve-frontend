"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PenLine, Save, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function NotesComposePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: ""
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a title for your note");
      return;
    }

    try {
      setSaving(true);
      
      // For demo, using a default user ID - in production this would come from auth
      const userId = "cc0bdfbe-4ba4-48a5-8846-7749a8ab6212";
      
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          title: formData.title,
          content: formData.content,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        })
      });
      
      if (res.ok) {
        const newNote = await res.json();
        setSaveSuccess(true);
        setTimeout(() => {
          router.push(`/notes/${newNote.id}`);
        }, 1000);
      } else {
        alert('Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/notes"
            onClick={(e) => {
              if (formData.title || formData.content) {
                if (!confirm('You have unsaved changes. Are you sure you want to leave?')) {
                  e.preventDefault();
                }
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md font-medium text-sm transition-all"
          >
            <ArrowLeft size={16} /> Cancel
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-md">
              <PenLine size={18} className="text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              New Note
            </h1>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving || saveSuccess}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Saving...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle size={16} /> Saved!
            </>
          ) : (
            <>
              <Save size={16} /> Save Note
            </>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 text-emerald-600 p-4 bg-emerald-500/10 rounded-lg">
          <CheckCircle size={16} />
          <span className="text-sm font-medium">Note created successfully! Redirecting...</span>
        </div>
      )}

      <div className="bg-card rounded-lg border border-border shadow-sm flex-1 flex flex-col p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Subject
          </label>
          <input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Note title..."
            className="w-full px-0 py-2 bg-transparent border-b border-border focus:border-foreground outline-none text-xl font-semibold transition-all placeholder:text-muted-foreground/50"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Tags
          </label>
          <input
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="Work, urgent, ideas... (comma separated)"
            className="w-full px-3 py-2 bg-muted/30 border border-border rounded-md focus:ring-1 focus:ring-ring outline-none text-sm transition-all placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder="Start typing your note here..."
            className="w-full flex-1 p-4 bg-muted/10 border border-border rounded-md focus:ring-1 focus:ring-ring outline-none resize-none text-sm leading-relaxed text-foreground transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
