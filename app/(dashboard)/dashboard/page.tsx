import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconBell,
  IconCalendarEvent,
  IconMail,
  IconHistory,
  IconChevronRight,
} from "@tabler/icons-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s a summary of your workspace activities.
        </p>
      </div>

      {/* Top Statistics Stats */}
      <SectionCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Left Column: Chart & Activity */}
        <div className="space-y-6 lg:col-span-4">
          <ChartAreaInteractive />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold">
                  Recent Actions
                </CardTitle>
                <CardDescription>
                  Recent actions across your projects.
                </CardDescription>
              </div>
              <IconHistory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-4">
                {[
                  {
                    user: "You",
                    action: "uploaded",
                    target: "Project_Proposal.pdf",
                    time: "2 hours ago",
                  },
                  {
                    user: "Sarah",
                    action: "commented on",
                    target: "Budget_Excel",
                    time: "4 hours ago",
                  },
                  {
                    user: "You",
                    action: "shared",
                    target: "Design_System",
                    with: "Marketing Team",
                    time: "Yesterday",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-sm">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">
                        {item.user} {item.action}{" "}
                        <span className="text-primary cursor-pointer hover:underline">
                          {item.target}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 w-full text-xs" size="sm">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Notifications, Inbox, Calendar */}
        <div className="space-y-6 lg:col-span-3">
          {/* Recent Inbox */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Recent Inbox
              </CardTitle>
              <IconMail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {[
                  {
                    name: "Alice Smith",
                    msg: "Regarding the latest proposal revisions...",
                    time: "10m ago",
                    initial: "AS",
                  },
                  {
                    name: "Support Team",
                    msg: "Your ticket #4432 has been updated.",
                    time: "1h ago",
                    initial: "ST",
                  },
                ].map((chat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{chat.initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{chat.name}</p>
                        <span className="text-[10px] text-muted-foreground">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {chat.msg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="link"
                className="mt-2 p-0 h-auto text-xs"
                asChild
              >
                <a href="/inbox">
                  Go to Inbox <IconChevronRight className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Upcoming Events
              </CardTitle>
              <IconCalendarEvent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Weekly Sync",
                    time: "Tomorrow, 10:00 AM",
                    type: "Meeting",
                  },
                  {
                    title: "Project Deadline",
                    time: "Friday, 5:00 PM",
                    type: "Deadline",
                  },
                ].map((event, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 border-l-2 border-primary pl-3 py-1"
                  >
                    <p className="text-sm font-medium leading-none">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {event.time}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1 py-0 h-4"
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="link"
                className="mt-2 p-0 h-auto text-xs"
                asChild
              >
                <a href="/calendar">
                  Open Calendar <IconChevronRight className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Notifications
              </CardTitle>
              <IconBell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2">
                <div className="rounded-md bg-muted/50 p-3 text-xs flex gap-3">
                  <div className="h-2 w-2 mt-1 rounded-full bg-blue-500" />
                  <p>System update scheduled for 2:00 AM UTC.</p>
                </div>
                <div className="rounded-md bg-muted/50 p-3 text-xs flex gap-3">
                  <div className="h-2 w-2 mt-1 rounded-full bg-orange-500" />
                  <p>Storage is reaching 85% capacity. Consider upgrading.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
