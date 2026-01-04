import {
  Archive,
  Reply,
  ReplyAll,
  Sparkles, // Added for the AI icon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Mail } from "@/app/data";

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      {/* --- Top Navbar --- */}
      <div className="flex items-center p-2 border-b h-[52px]">
        <div className="flex items-center gap-2 ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Reply className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <ReplyAll className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply all</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Archive className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {mail ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Email Header */}
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.name}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {mail.email}
                </div>
              </div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {mail.dateLabel}
            </div>
          </div>
          <Separator />

          {/* Body */}
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm leading-relaxed overflow-y-auto">
            {mail.text}
          </div>
          <Separator />

          {/* --- Reply Area with AI Generate --- */}
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4 min-h-[100px] border-muted bg-muted/20"
                  placeholder={`Reply to ${mail.name}...`}
                />
                <div className="flex items-center justify-between">
                  {/* AI Generate Button with Gradient */}
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Generating AI response...");
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate with AI
                  </Button>

                  <Button onClick={(e) => e.preventDefault()} size="sm">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
