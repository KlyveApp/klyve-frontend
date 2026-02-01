"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2, CheckCircle } from "lucide-react";

const USER_ID = "cc0bdfbe-4ba4-48a5-8846-7749a8ab6212";

export default function ComposePage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    recipient_email: "",
    recipient_name: "",
    subject: "",
    content: "",
    status: "draft",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.recipient_email || !formData.subject || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSending(true);

      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          user_id: USER_ID,
        }),
      });

      if (res.ok) {
        const email = await res.json();
        setSuccess(true);
        setTimeout(() => {
          router.push(`/outbox/${email.id}`);
        }, 1000);
      } else {
        alert("Failed to create email");
      }
    } catch (error) {
      console.error("Error creating email:", error);
      alert("Failed to create email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full bg-muted/20 overflow-y-auto">
      <div className="max-w-5xl mx-auto py-8 px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/outbox"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Outbox
          </Link>
          <h1 className="text-xl font-semibold text-foreground">Compose Email</h1>
        </div>

        {success && (
          <div className="mb-4 flex items-center gap-2 text-emerald-600 p-3 bg-emerald-50 rounded-md">
            <CheckCircle size={16} />
            <span className="text-sm">Email created successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          {/* Email Header Fields */}
          <div className="p-6 space-y-4 border-b border-border">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground w-12">To:</span>
              <input
                type="email"
                required
                value={formData.recipient_email}
                onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                placeholder="recipient@example.com"
                className="flex-1 outline-none text-sm font-medium text-foreground bg-transparent placeholder:text-muted-foreground border-b border-transparent focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground w-12">Name:</span>
              <input
                type="text"
                value={formData.recipient_name}
                onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                placeholder="Recipient Name (optional)"
                className="flex-1 outline-none text-sm font-medium text-foreground bg-transparent placeholder:text-muted-foreground border-b border-transparent focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground w-12">Sub:</span>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Email subject..."
                className="flex-1 outline-none text-sm font-medium text-foreground bg-transparent placeholder:text-muted-foreground border-b border-transparent focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Email Content */}
          <div className="p-6">
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full min-h-[300px] bg-transparent outline-none resize-none text-sm leading-relaxed text-foreground placeholder:text-muted-foreground"
              placeholder="Write your email here..."
            />
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-muted/10 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="text-sm bg-background border border-input rounded-md px-3 py-2"
              >
                <option value="draft">Save as Draft</option>
                <option value="sent">Mark as Sent</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={sending || success}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50"
            >
              {sending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Create Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
