"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Send,
  MessageSquare,
  Search,
  TrendingUp,
  Plus,
  Mail,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-muted/20 overflow-y-auto h-full p-6">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* WELCOME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Welcome back, Alex.
            </h1>
            <p className="text-muted-foreground font-medium mt-1">
              Here is what&apos;s happening across your pipeline today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/sourcing"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
            >
              <Search size={16} /> Find Candidates
            </Link>
          </div>
        </div>

        {/* TOP STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users size={20} className="text-primary" />}
            label="Network Size"
            value="842"
            growth="+12% this week"
          />
          <StatCard
            icon={<Send size={20} className="text-primary" />}
            label="Active Outbox"
            value="24"
            growth="3 pending replies"
          />
          <StatCard
            icon={<MessageSquare size={20} className="text-primary" />}
            label="Stored Notes"
            value="156"
            growth="12 created today"
          />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OUTBOX AT A GLANCE (2/3 Width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Mail size={16} className="text-muted-foreground" />
                  Outbox at a Glance
                </h3>
                <Link
                  href="/outbox"
                  className="text-xs font-medium text-primary hover:underline uppercase tracking-wide"
                >
                  View All
                </Link>
              </div>

              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-3 font-medium">Recipient</th>
                      <th className="px-6 py-3 font-medium">Subject</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        recipient: "Sarah Jenkins",
                        subject: "Re: Engineering Role",
                        status: "Replied",
                        time: "10m ago",
                      },
                      {
                        recipient: "Marcus Wright",
                        subject: "Design Systems Chat",
                        status: "Sent",
                        time: "2h ago",
                      },
                      {
                        recipient: "Elena Rodriguez",
                        subject: "Follow up: Tesla",
                        status: "Read",
                        time: "5h ago",
                      },
                      {
                        recipient: "James Wilson",
                        subject: "Introduction call",
                        status: "Sent",
                        time: "1d ago",
                      },
                      {
                        recipient: "Lila Voss",
                        subject: "Data Science position",
                        status: "Replied",
                        time: "2d ago",
                      },
                    ].map((item, i) => (
                      <tr
                        key={i}
                        className="group hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-medium text-secondary-foreground text-xs border border-border">
                              {item.recipient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {item.recipient}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {item.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === "Replied"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : item.status === "Read"
                                  ? "bg-blue-500/10 text-blue-600"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-muted-foreground">
                            {item.time}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RECENT NOTES (1/3 Width) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg border border-border shadow-sm p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare size={16} className="text-muted-foreground" />
                  Recent Notes
                </h3>
                <Link
                  href="/notes"
                  className="p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-all"
                >
                  <Plus size={16} />
                </Link>
              </div>

              <div className="space-y-4 flex-1">
                {/* Pinned / Latest Note */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border group cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Latest Insight
                    </p>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                    Quarterly Strategy Note
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    Focus on expanding the engineering network within the
                    Fintech sector. Targeting Series B startups...
                  </p>
                </div>

                {/* List of other notes */}
                <div className="space-y-1">
                  {[
                    { title: "Call with Figma Team", date: "Yesterday" },
                    { title: "Sourcing Checklist Q3", date: "2 days ago" },
                    { title: "Candidate Feedback: Sarah", date: "3 days ago" },
                    { title: "Network Growth Ideas", date: "1 week ago" },
                  ].map((note, i) => (
                    <Link
                      key={i}
                      href="/notes"
                      className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                          {note.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {note.date}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 mt-auto">
                  <Link
                    href="/notes"
                    className="flex items-center justify-center w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border rounded-md hover:border-foreground/20"
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
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-secondary rounded-md text-foreground">
          {icon}
        </div>
        <div className="flex items-center text-emerald-600 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
          <TrendingUp size={12} className="mr-1" />
          <span>+12%</span>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{growth}</p>
      </div>
    </div>
  );
}
