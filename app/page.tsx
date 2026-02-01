"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Send,
  MessageSquare,
  Search,
  TrendingUp,
  Plus,
  Mail,
  Loader2,
} from "lucide-react";

interface DashboardStats {
  networkSize: number;
  networkGrowth: number;
  activeOutbox: number;
  pendingReplies: number;
  storedNotes: number;
  notesToday: number;
}

interface OutboxThread {
  id: string;
  recipient_name: string;
  subject: string;
  status: string;
  updated_at: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const USER_ID = "1"; // Demo user ID

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatNoteDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentThreads, setRecentThreads] = useState<OutboxThread[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/stats?userId=${USER_ID}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentThreads(data.recentThreads);
        setRecentNotes(data.recentNotes);
        setUserName(data.userName);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "conversation_active":
      case "replied":
        return { label: "Replied", color: "bg-stone-100 text-stone-700" };
      case "read":
        return { label: "Read", color: "bg-stone-100 text-stone-600" };
      case "sent":
        return { label: "Sent", color: "bg-stone-100 text-stone-600" };
      case "draft":
        return { label: "Draft", color: "bg-stone-100 text-stone-500" };
      default:
        return { label: status, color: "bg-stone-100 text-stone-600" };
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-stone-50 overflow-y-auto h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-stone-400" size={28} />
          <p className="text-stone-500 font-normal">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-stone-50 overflow-y-auto h-full p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* WELCOME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-stone-800 tracking-tight">
              Welcome back, {userName.split(" ")[0]}.
            </h1>
            <p className="text-stone-500 font-normal mt-1.5 text-base">
              Here&apos;s what&apos;s happening across your network today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/sourcing"
              className="flex items-center gap-2 bg-stone-800 text-stone-50 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              <Search size={18} /> Start Sourcing
            </Link>
          </div>
        </div>

        {/* TOP STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users size={22} className="text-stone-700" />}
            label="Network Size"
            value={stats?.networkSize?.toString() || "0"}
            growth={`+${stats?.networkGrowth || 0} this week`}
          />
          <StatCard
            icon={<Send size={22} className="text-stone-700" />}
            label="Active Outbox"
            value={stats?.activeOutbox?.toString() || "0"}
            growth={`${stats?.pendingReplies || 0} pending replies`}
          />
          <StatCard
            icon={<MessageSquare size={22} className="text-stone-700" />}
            label="Stored Notes"
            value={stats?.storedNotes?.toString() || "0"}
            growth={`${stats?.notesToday || 0} created today`}
          />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OUTBOX AT A GLANCE (2/3 Width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden h-full flex flex-col shadow-sm">
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-semibold text-stone-800 text-lg flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <Mail size={18} className="text-stone-600" />
                  </div>
                  Outbox at a Glance
                </h3>
                <Link
                  href="/outbox"
                  className="text-sm font-medium text-stone-600 hover:text-stone-800 hover:underline transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-100 text-xs text-stone-500 uppercase tracking-wider">
                      <th className="px-6 py-3 font-medium">Recipient</th>
                      <th className="px-6 py-3 font-medium">Subject</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {recentThreads.length > 0 ? (
                      recentThreads.map((thread) => {
                        const statusDisplay = getStatusDisplay(thread.status);
                        return (
                          <tr
                            key={thread.id}
                            className="group hover:bg-stone-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center font-medium text-stone-600 text-sm">
                                  {thread.recipient_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span className="text-sm font-medium text-stone-800">
                                  {thread.recipient_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-stone-600">
                                {thread.subject}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusDisplay.color}`}
                              >
                                {statusDisplay.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-xs text-stone-400">
                                {formatRelativeTime(thread.updated_at)}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-stone-100 rounded-full">
                              <Mail size={22} className="text-stone-400" />
                            </div>
                            <p className="text-stone-500 font-normal">No recent emails</p>
                            <Link
                              href="/outbox"
                              className="text-sm text-stone-600 font-medium hover:underline"
                            >
                              Go to Outbox
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RECENT NOTES (1/3 Width) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 h-full flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-stone-800 text-lg flex items-center gap-3">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <MessageSquare size={18} className="text-stone-600" />
                  </div>
                  Recent Notes
                </h3>
                <Link
                  href="/notes"
                  className="p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 rounded-lg transition-colors"
                >
                  <Plus size={18} />
                </Link>
              </div>

              <div className="space-y-3 flex-1">
                {recentNotes.length > 0 ? (
                  <>
                    {/* List of notes */}
                    <div className="space-y-1">
                      {recentNotes.map((note) => (
                        <Link
                          key={note.id}
                          href={`/notes`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-stone-500 transition-colors flex-shrink-0" />
                            <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors truncate">
                              {note.title}
                            </span>
                          </div>
                          <span className="text-xs text-stone-400 flex-shrink-0 ml-3">
                            {formatNoteDate(note.updated_at)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-8">
                    <div className="p-3 bg-stone-100 rounded-full">
                      <MessageSquare size={22} className="text-stone-400" />
                    </div>
                    <p className="text-stone-500 font-normal">No notes yet</p>
                    <Link
                      href="/notes"
                      className="text-sm text-stone-600 font-medium hover:underline"
                    >
                      Create your first note
                    </Link>
                  </div>
                )}

                <div className="pt-3 mt-auto">
                  <Link
                    href="/notes"
                    className="flex items-center justify-center w-full py-2.5 text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors border border-dashed border-stone-200 rounded-lg hover:border-stone-300"
                  >
                    View All Notes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Stats
function StatCard({
  icon,
  label,
  value,
  growth,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  growth: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3 hover:border-stone-300 transition-colors shadow-sm">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-lg bg-stone-100">
          {icon}
        </div>
        <div className="flex items-center text-stone-600 text-xs font-medium bg-stone-100 px-2 py-1 rounded-full">
          <TrendingUp size={12} className="mr-1" />
          <span>+{Math.floor(Math.random() * 15) + 3}%</span>
        </div>
      </div>
      <div className="pt-1">
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl font-semibold text-stone-800 mt-1">{value}</p>
        <p className="text-xs text-stone-400 mt-0.5">{growth}</p>
      </div>
    </div>
  );
}
