import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail } from "@/app/(dashboard)/inbox/data";
import { Linkedin, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MailListProps {
  items: Mail[];
  selectedMail: Mail | null;
  setSelectedMail: (mail: Mail) => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400";
    case "Closed":
      return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400";
    default:
      return "";
  }
};

export function MailList({
  items,
  selectedMail,
  setSelectedMail,
}: MailListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1 p-3 pt-0">
        {" "}
        {/* Reduced gap and padding */}
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start rounded-md border p-2 text-left transition-all hover:bg-accent", // Reduced padding to p-2
              selectedMail?.id === item.id && "bg-muted",
            )}
            onClick={() => setSelectedMail(item)}
          >
            {/* Header: Name, Status, and LinkedIn */}
            <div className="flex w-full items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm leading-none">
                  {item.name}
                </span>
                {item.status && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[9px] px-1 py-0 h-4 uppercase font-bold",
                      getStatusStyles(item.status),
                    )}
                  >
                    {item.status}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                {item.linkedin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.linkedin, "_blank");
                    }}
                  >
                    <Linkedin className="h-3 w-3" />
                  </Button>
                )}
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {item.dateLabel}
                </span>
              </div>
            </div>

            {/* Info Row: Job Title, Uni, Location combined */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground leading-tight">
              {item.jobTitle && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3 opacity-60" />
                  <span>{item.jobTitle}</span>
                </div>
              )}
              {item.university && (
                <div className="flex items-center gap-1 border-l pl-2 border-muted-foreground/20">
                  <GraduationCap className="h-3 w-3 opacity-60" />
                  <span>{item.university}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-1 border-l pl-2 border-muted-foreground/20">
                  <MapPin className="h-3 w-3 opacity-60" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
