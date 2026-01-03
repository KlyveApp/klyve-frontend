import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBell } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Workspace</h1>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <IconBell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center p-0 text-[10px]">
                  2
                </Badge>
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold">System Update</span>
                  <span className="text-[10px] text-muted-foreground">
                    2h ago
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  A new system update is available. Please restart to apply.
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold">New Message</span>
                  <span className="text-[10px] text-muted-foreground">
                    5h ago
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You received a new message from Alice Smith.
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-xs text-primary cursor-pointer font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
