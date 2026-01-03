"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  IconUser,
  IconSettings,
  IconCreditCard,
  IconBell,
  IconDownload,
  IconAdjustments,
  IconInbox,
  IconCalendar,
  IconLock,
  IconRobot,
} from "@tabler/icons-react";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "Profile Info",
    href: "/settings/profile",
    icon: IconUser,
  },
  // {
  //   title: "Account Settings",
  //   href: "/settings/account",
  //   icon: IconSettings,
  // },
  {
    title: "Billing",
    href: "/settings/billing",
    icon: IconCreditCard,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: IconBell,
  },
  {
    title: "Export Data",
    href: "/settings/export",
    icon: IconDownload,
  },
  {
    title: "Configurations",
    href: "/settings/configurations",
    icon: IconAdjustments,
  },
  {
    title: "Inbox",
    href: "/settings/inbox",
    icon: IconInbox,
  },
  // {
  //   title: "Calendar",
  //   href: "/settings/calendar",
  //   icon: IconCalendar,
  // },
  {
    title: "Security & Privacy",
    href: "/settings/security",
    icon: IconLock,
  },
  // {
  //   title: "Agents and Models",
  //   href: "/settings/agents",
  //   icon: IconRobot,
  // },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-8 p-4 md:p-10 pb-16 max-w-7xl mx-auto w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5 overflow-x-auto">
          <nav
            className={cn(
              "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
            )}
          >
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start whitespace-nowrap",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
