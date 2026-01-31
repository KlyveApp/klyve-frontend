"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Trash2, Edit3, Calendar, ArrowLeft, Loader2, CheckCircle, X } from "lucide-react";
import Link from "next/link";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    tags: ""
  });

  useEffect(() => {
    if (params.id) {
      loadNote();
    }
  }, [params.id]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/notes/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setNote(data);
        setEditForm({
          title: data.title,
          content: data.content,
          tags: data.tags.join(", ")
        });
      } else if (res.status === 404) {
        router.push('/notes');
      }
    } catch (error) {
      console.error('Error loading note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!note) return;
    
    try {
      const updates = {
        title: editForm.title,
        content: editForm.content,
        tags: editForm.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      
      const res = await fetch(`/api/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (res.ok) {
        const updatedNote = await res.json();
        setNote(updatedNote);
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/notes/${note.id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        router.push('/notes');
        router.refresh();
      } else {
        alert('Failed to delete note');
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 h-full flex flex-col">
      {/* HEADER: Action Buttons & Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/notes"
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md font-medium text-sm transition-all"
          >
            <ArrowLeft size={16} /> Back
          </Link>
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
              >
                <CheckCircle size={16} /> Save
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({
                    title: note.title,
                    content: note.content,
                    tags: note.tags.join(", ")
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md font-medium text-sm transition-all"
              >
                <X size={16} /> Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
              >
                <Edit3 size={16} /> Edit Note
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-md font-medium text-sm transition-all border border-transparent hover:border-destructive/20 disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                Delete
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-muted/50 px-3 py-1.5 rounded-full border border-border">
          <Calendar size={12} />
          <span>Last Modified: {formatDate(note.updated_at)}</span>
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 text-emerald-600 p-4 bg-emerald-500/10 rounded-lg">
          <CheckCircle size={16} />
          <span className="text-sm font-medium">Note saved successfully!</span>
        </div>
      )}

      {/* MAIN CARD CONTENT */}
      <div className="bg-card rounded-lg border border-border shadow-sm flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        {isEditing ? (
          /* EDIT MODE */
          <>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Subject
                </label>
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-0 py-2 bg-transparent border-b border-border focus:border-foreground outline-none text-xl font-semibold transition-all mt-1"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Tags (comma separated)
                </label>
                <input
                  value={editForm.tags}
                  onChange={(e) => setEditForm({...editForm, tags: e.target.value})}
                  placeholder="Interview, Technical, Project..."
                  className="w-full px-3 py-2 bg-muted/30 border border-border rounded-md focus:ring-1 focus:ring-ring outline-none text-sm transition-all mt-1"
                />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Content
              </label>
              <textarea
                value={editForm.content}
                onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                className="w-full flex-1 p-4 bg-muted/10 border border-border rounded-md focus:ring-1 focus:ring-ring outline-none resize-none text-sm leading-relaxed text-foreground transition-all min-h-[300px]"
              />
            </div>
          </>
        ) : (
          /* VIEW MODE */
          <>
            <div className="space-y-4 border-b border-border pb-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Subject
                </label>
                <h1 className="text-2xl font-bold text-foreground mt-1 tracking-tight">
                  {note.title}
                </h1>
              </div>

              {note.tags.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Content
              </label>
              <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
                {note.content}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
