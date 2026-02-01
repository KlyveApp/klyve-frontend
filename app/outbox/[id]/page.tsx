"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, Save, CheckCircle, Trash2 } from "lucide-react";

interface Email {
  id: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  content: string;
  status: string;
  created_at: string;
}

export default function EmailDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    recipient_email: "",
    recipient_name: "",
    subject: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    if (id) {
      loadEmail();
    }
  }, [id]);

  const loadEmail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/emails/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEmail(data);
        setFormData({
          recipient_email: data.recipient_email,
          recipient_name: data.recipient_name || "",
          subject: data.subject,
          content: data.content,
          status: data.status,
        });
      }
    } catch (error) {
      console.error("Error loading email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!email) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/emails/${email.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      } else {
        alert("Failed to save email");
      }
    } catch (error) {
      console.error("Error saving email:", error);
      alert("Failed to save email");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!email) return;
    
    if (!confirm("Are you sure you want to delete this email?")) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/emails/${email.id}`, { method: "DELETE" });
      if (res.ok) {
        // Refresh the page to update the list
        window.location.href = "/outbox";
      } else {
        alert("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      alert("Failed to delete email");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Email not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-8 space-y-6">
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="text-xl font-semibold text-foreground tracking-tight bg-transparent border-b border-transparent hover:border-input focus:border-primary focus:outline-none w-full"
            placeholder="Email Subject"
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">To:</span>
            <input
              type="email"
              value={formData.recipient_email}
              onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
              className="bg-muted px-2 py-0.5 rounded text-xs font-medium text-foreground border-none focus:ring-1 focus:ring-primary outline-none"
            />
            <span className="text-xs">•</span>
            <span className="text-xs">{new Date(email.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle size={14} />
              Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all disabled:opacity-50"
            title="Save changes"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all disabled:opacity-50"
            title="Delete email"
          >
            {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          </button>
        </div>
      </div>

      {/* EMAIL CONTENT */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground border border-border">
            {(formData.recipient_name || formData.recipient_email).charAt(0).toUpperCase()}
          </div>
          <div>
            <input
              type="text"
              value={formData.recipient_name}
              onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
              className="text-sm font-medium text-foreground bg-transparent border-b border-transparent hover:border-input focus:border-primary focus:outline-none"
              placeholder="Recipient Name"
            />
            <p className="text-xs text-muted-foreground">{formData.recipient_email}</p>
          </div>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="ml-auto text-xs bg-background border border-input rounded px-2 py-1"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
          </select>
        </div>

        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full bg-transparent outline-none resize-none min-h-[300px] text-sm leading-relaxed text-foreground placeholder:text-muted-foreground border border-input rounded-md p-4 focus:ring-1 focus:ring-ring"
          placeholder="Email content..."
        />
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={14} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
