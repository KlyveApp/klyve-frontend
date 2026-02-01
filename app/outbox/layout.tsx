"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Search, Trash2, Loader2 } from "lucide-react";

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

export default function OutboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this email?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/emails/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEmails(emails.filter((email) => email.id !== id));
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    } finally {
      setDeleting(null);
    }
  };

  const filteredEmails = emails.filter((email) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      email.recipient_email.toLowerCase().includes(query) ||
      email.recipient_name?.toLowerCase().includes(query) ||
      email.subject.toLowerCase().includes(query) ||
      email.content.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* LEFT COLUMN: LIST VIEW */}
      <div className="w-[750px] xl:w-[850px] border-r border-border flex flex-col shrink-0 bg-background">
        {/* Header Section */}
        <div className="p-4 space-y-3 border-b border-border">
          <Link
            href="/outbox/compose"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
          >
            <Plus size={18} /> Compose New
          </Link>
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
              size={16}
            />
            <input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No emails found
            </div>
          ) : (
            filteredEmails.map((email) => {
              const isActive = pathname.includes(email.id);
              return (
                <Link
                  key={email.id}
                  href={`/outbox/${email.id}`}
                  className={`w-full text-left border-b border-border flex items-start p-4 transition-all group ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-sm font-semibold shrink-0 ${
                          isActive ? "text-foreground" : ""
                        }`}
                      >
                        {email.recipient_name || email.recipient_email}
                      </span>

                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          email.status === "sent"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {email.status}
                      </span>

                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide shrink-0 ml-auto">
                        {formatDate(email.created_at)}
                      </span>
                    </div>

                    <p
                      className={`text-sm font-medium truncate ${
                        isActive
                          ? "text-foreground/90"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1 leading-relaxed">
                      {email.content.substring(0, 100)}
                      {email.content.length > 100 ? "..." : ""}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, email.id)}
                    disabled={deleting === email.id}
                    className="ml-3 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all disabled:opacity-50"
                  >
                    {deleting === email.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: DYNAMIC CONTENT */}
      <div className="flex-1 bg-muted/20 overflow-y-auto">{children}</div>
    </div>
  );
}
