"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2, CheckCircle } from "lucide-react";

const USER_ID = "cc0bdfbe-4ba4-48a5-8846-7749a8ab6212";

export default function NewEmailPage() {
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
          router.push(`/emails/${email.id}`);
        }, 1500);
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/emails"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
        <h1 className="text-2xl font-bold">New Email</h1>
      </div>

      {success && (
        <div className="mb-4 flex items-center gap-2 text-emerald-600 p-3 bg-emerald-50 rounded-md">
          <CheckCircle size={16} />
          <span className="text-sm">Email created successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Email *</label>
          <input
            type="email"
            required
            value={formData.recipient_email}
            onChange={(e) =>
              setFormData({ ...formData, recipient_email: e.target.value })
            }
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Recipient Name</label>
          <input
            type="text"
            value={formData.recipient_name}
            onChange={(e) =>
              setFormData({ ...formData, recipient_name: e.target.value })
            }
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Email subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content *</label>
          <textarea
            required
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={10}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Write your email here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={sending || success}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {sending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send size={18} />
              Create Email
            </>
          )}
        </button>
      </form>
    </div>
  );
}
