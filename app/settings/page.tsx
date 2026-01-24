"use client";

import React, { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Bell,
  Settings as SettingsIcon,
  Globe,
  ExternalLink,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

type Section = "billing" | "security" | "notifications" | "general";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("general");

  // Sidebar Items Definition
  const menuItems = [
    { id: "general", label: "General Configuration", icon: SettingsIcon },
    { id: "billing", label: "Billing & Plan", icon: CreditCard },
    { id: "security", label: "Security & Privacy", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-[280px] border-r border-border flex flex-col shrink-0 bg-muted/10">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Settings
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            Personal Account
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-background border border-border text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 overflow-y-auto bg-background p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* GENERAL / CONFIGURATION */}
          {activeSection === "general" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  General Configuration
                </h2>
                <p className="text-muted-foreground text-sm">
                  Manage your basic account preferences.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-secondary rounded-md text-foreground">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Timezone
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Current: (GMT-06:00) Central Time
                      </p>
                    </div>
                  </div>
                  <select className="bg-background border border-input rounded-md text-sm px-3 py-1.5 outline-none focus:ring-1 focus:ring-ring">
                    <option>Central Time (US & Canada)</option>
                    <option>Eastern Time (US & Canada)</option>
                    <option>Pacific Time (US & Canada)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* BILLING */}
          {activeSection === "billing" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Billing & Plan
                </h2>
                <p className="text-muted-foreground text-sm">
                  Manage your subscription and invoices.
                </p>
              </div>

              <div className="bg-primary rounded-lg p-8 text-primary-foreground relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">
                    Beta Access
                  </h3>
                  <p className="text-primary-foreground/80 text-sm max-w-xs leading-relaxed">
                    We are currently in beta. All premium features are free for
                    our early adopters. No payment is required at this time.
                  </p>
                </div>
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <CreditCard size={100} />
                </div>
              </div>
            </div>
          )}

          {/* SECURITY & PRIVACY */}
          {activeSection === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Security & Privacy
                </h2>
                <p className="text-muted-foreground text-sm">
                  Your data security is our top priority.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4 shadow-sm">
                  <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-600">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">
                      We prioritize your security
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      All data is encrypted in transit and at rest. We utilize
                      industry-standard protocols to ensure your information
                      remains confidential.
                    </p>
                    <button className="mt-3 flex items-center gap-2 text-primary font-medium text-xs hover:underline">
                      Read our Terms of Service <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Notifications
                </h2>
                <p className="text-muted-foreground text-sm">
                  Choose how you want to be contacted.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden divide-y divide-border shadow-sm">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Mail className="text-muted-foreground" size={18} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Important Activity
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Email me about new connections and messages.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary"
                  />
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Sparkles className="text-muted-foreground" size={18} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Marketing & News
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Receive updates about new features and tips.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
