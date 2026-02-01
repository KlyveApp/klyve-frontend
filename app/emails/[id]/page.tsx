"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, CheckCircle } from "lucide-react";

interface Email {
  id: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  content: string;
  status: string;
}

export default function EmailDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    recipient_email: "",
    recipient_name: "",
    subject: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    if (params.id) {
      loadEmail();
    }
  }, [params.id]);

  const loadEmail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/emails/${params.id}`);
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
      } else {
        router.push("/emails");
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

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!email) return null;

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
        <h1 className="text-2xl font-bold">Edit Email</h1>
      </div>

      {saveSuccess && (
        <div className="mb-4 flex items-center gap-2 text-emerald-600 p-3 bg-emerald-50 rounded-md">
          <CheckCircle size={16} />
          <span className="text-sm">Saved successfully!</span>
        </div>
      )}

      <div className="space-y-4 bg-card border border-border rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Email</label>
          <input
            type="email"
            value={formData.recipient_email}
            onChange={(e) =>
              setFormData({ ...formData, recipient_email: e.target.value })
            }
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={10}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
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
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
