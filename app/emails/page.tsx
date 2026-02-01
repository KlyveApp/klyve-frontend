"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Mail, Loader2 } from "lucide-react";

interface Email {
  id: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  content: string;
  status: string;
  created_at: string;
}

const USER_ID = "cc0bdfbe-4ba4-48a5-8846-7749a8ab6212";

export default function EmailsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/emails?userId=${USER_ID}`);
      if (res.ok) {
        const data = await res.json();
        setEmails(data);
      }
    } catch (error) {
      console.error("Error loading emails:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this email?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/emails/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEmails(emails.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Emails</h1>
        <Link
          href="/emails/new"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={18} />
          New Email
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin" />
        </div>
      ) : emails.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No emails yet. Click "New Email" to create one.
        </p>
      ) : (
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <Link href={`/emails/${email.id}`} className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={16} className="text-muted-foreground" />
                    <span className="font-semibold truncate">{email.subject}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        email.status === "sent"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {email.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    To: {email.recipient_name || email.recipient_email}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {email.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(email.created_at)}
                  </p>
                </Link>
                <button
                  onClick={() => handleDelete(email.id)}
                  disabled={deleting === email.id}
                  className="ml-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50"
                >
                  {deleting === email.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
