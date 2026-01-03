import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconSearch,
  IconDotsVertical,
  IconArrowUpRight,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const tasks = [
  {
    id: "TASK-8732",
    title:
      "You can't compress the program without quantifying the open-source SSD...",
    label: "Documentation",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "TASK-1209",
    title:
      "The bandwidth for the neural network needs to be rerouted via a laser...",
    label: "Feature",
    status: "todo",
    priority: "high",
  },
  {
    id: "TASK-4321",
    title:
      "We need to bypass the back-end capacitor to access the redundant logic...",
    label: "Bug",
    status: "done",
    priority: "low",
  },
  {
    id: "TASK-5678",
    title:
      "The auxiliary sensor is failing to pick up the digital transmitter frequency.",
    label: "Feature",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "TASK-9012",
    title:
      "Try to override the CSS protocol, maybe it will index the open-source port!",
    label: "Bug",
    status: "todo",
    priority: "medium",
  },
];

const statusIcons = {
  todo: <IconCircleDashed className="h-4 w-4 text-muted-foreground" />,
  "in-progress": <IconClock className="h-4 w-4 text-blue-500" />,
  done: <IconCircleCheck className="h-4 w-4 text-emerald-500" />,
};

const priorityIcons = {
  low: <IconArrowUpRight className="h-4 w-4 rotate-180 text-blue-500" />,
  medium: <IconArrowUpRight className="h-4 w-4 rotate-90 text-amber-500" />,
  high: <IconArrowUpRight className="h-4 w-4 text-red-500" />,
};

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a list of your tasks and messages for this month.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter tasks..."
            className="pl-9 h-9 bg-muted/30 border-none ring-1 ring-border"
          />
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          View all
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[100px]">Task</TableHead>
              <TableHead className="min-w-[300px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="group">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {task.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 px-1.5 font-semibold"
                    >
                      {task.label}
                    </Badge>
                    <span className="max-w-[500px] truncate font-medium text-sm">
                      {task.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {statusIcons[task.status as keyof typeof statusIcons]}
                    <span className="text-xs capitalize">
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {priorityIcons[task.priority as keyof typeof priorityIcons]}
                    <span className="text-xs capitalize">{task.priority}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  >
                    <IconDotsVertical size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">5</span> of{" "}
          <span className="font-medium">20</span> tasks
        </p>
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium">Rows per page</p>
            <div className="h-8 w-[70px] border rounded-md flex items-center justify-between px-2 text-xs bg-card">
              10 <IconChevronDown className="h-3 w-3 opacity-50" />
            </div>
          </div>
          <div className="flex w-[100px] items-center justify-center text-xs font-medium">
            Page 1 of 4
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <IconChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              <IconChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconChevronDown(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
