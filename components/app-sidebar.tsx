"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileCv,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconCalendarBolt,
  IconLayoutDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconInputSearch,
  IconReport,
  IconNote,
  IconUserBolt,
  IconSearch,
  IconMailSpark,
  IconSettings,
  IconUsers,
  IconHomeSpark,
  IconSparkles,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHomeSpark,
    },
    // {
    //   title: "Chat",
    //   url: "/chat",
    //   icon: IconSparkles,
    // },
    {
      title: "Inbox",
      url: "/inbox",
      icon: IconMailSpark,
    },
    {
      title: "People Search",
      url: "/search",
      icon: IconSearch,
    },
    {
      title: "My Network",
      url: "/network",
      icon: IconUsers,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: IconCalendarBolt,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings/profile",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Resumes",
      url: "/documents/resumes",
      icon: IconFileCv,
    },
    {
      name: "Profile Pictures",
      url: "/documents/profile-pictures",
      icon: IconUserBolt,
    },
    {
      name: "Notes",
      url: "/documents/notes",
      icon: IconNote,
    },
    {
      name: "Documents",
      url: "/documents/all",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">klyve</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
