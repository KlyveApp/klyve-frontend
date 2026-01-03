"use client";

import * as React from "react";
import {
  IconFileCv,
  IconPlus,
  IconDotsVertical,
  IconTrash,
  IconEdit,
  IconStar,
  IconChevronDown,
  IconDownload,
  IconPrinter,
  IconMaximize,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ResumesPage() {
  const resumes = [
    {
      id: 1,
      name: "Software_Engineer_2024.pdf",
      isMain: true,
      lastModified: "2 days ago",
    },
    {
      id: 2,
      name: "Frontend_Specialist_V2.pdf",
      isMain: false,
      lastModified: "1 week ago",
    },
    {
      id: 3,
      name: "Fullstack_Developer_Draft.pdf",
      isMain: false,
      lastModified: "3 weeks ago",
    },
  ];

  const [selectedResume, setSelectedResume] = React.useState(resumes[0]);

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height))] bg-background">
      {/* Top Toolbar / Selector Area */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card shadow-sm">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-6 rounded-xl border-border/60 hover:bg-muted/50"
              >
                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                  <IconFileCv size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">
                    {selectedResume.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-none">
                    {selectedResume.isMain ? "Primary Resume" : "Draft Version"}
                  </span>
                </div>
                <IconChevronDown
                  size={16}
                  className="ml-2 text-muted-foreground"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-xl">
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                Select Resume
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {resumes.map((resume) => (
                <DropdownMenuItem
                  key={resume.id}
                  onClick={() => setSelectedResume(resume)}
                  className="flex items-center justify-between p-3 cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm">{resume.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {resume.lastModified}
                    </span>
                  </div>
                  {resume.isMain && (
                    <Badge variant="secondary" className="h-4 text-[9px] px-1">
                      Main
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary focus:text-primary p-3 cursor-pointer">
                <IconPlus size={16} className="mr-2" />
                <span className="text-sm">Upload new version</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg"
              title="Set as Main"
            >
              <IconStar
                size={18}
                className={
                  selectedResume.isMain
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg"
              title="Rename"
            >
              <IconEdit size={18} className="text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg text-destructive hover:bg-destructive/10"
              title="Delete"
            >
              <IconTrash size={18} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex rounded-lg border-border/60"
          >
            <IconDownload size={16} className="mr-2" />
            Download
          </Button>
          {/*<Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
            <IconPrinter size={18} className="text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
            <IconMaximize size={18} className="text-muted-foreground" />
          </Button>*/}
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-sm min-h-[1100px] p-12 md:p-16 relative">
          {/* Mock PDF Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col items-center text-center space-y-2 border-b pb-8">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 uppercase">
                Johnathan Doe
              </h1>
              <p className="text-slate-500 font-medium">
                Software Engineer • San Francisco, CA
              </p>
              <div className="flex gap-4 text-sm text-blue-600 font-medium">
                <span>j.doe@example.com</span>
                <span>linkedin.com/in/jdoe</span>
                <span>github.com/jdoe</span>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-l-4 border-slate-900 pl-3">
                Experience
              </h2>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Senior Software Engineer @ TechCorp</span>
                    <span>2021 — Present</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    Leading the development of a distributed cloud platform
                    serving 2M+ active users...
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-700 pt-2 space-y-1 pl-2">
                    <li>
                      Optimized API response times by 40% using Redis caching
                      strategies.
                    </li>
                    <li>
                      Managed a cross-functional team of 12 developers using
                      Agile methodologies.
                    </li>
                    <li>
                      Implemented automated CI/CD pipelines reducing deployment
                      time by 60%.
                    </li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Fullstack Developer @ StartUp Inc</span>
                    <span>2018 — 2021</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    Joined as an early employee to build the core product from
                    scratch...
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-700 pt-2 space-y-1 pl-2">
                    <li>
                      Architected the frontend using React and Next.js for SSR
                      performance.
                    </li>
                    <li>
                      Developed real-time messaging features using WebSockets
                      and Node.js.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-l-4 border-slate-900 pl-3">
                Education
              </h2>
              <div className="flex justify-between font-bold text-slate-900">
                <span>B.S. in Computer Science @ Stanford University</span>
                <span>2014 — 2018</span>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest border-l-4 border-slate-900 pl-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "GraphQL",
                  "Python",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
