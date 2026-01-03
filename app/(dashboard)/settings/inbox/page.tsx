import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconInbox,
  IconFilter,
  IconArchive,
  IconMailForward,
} from "@tabler/icons-react";

export default function InboxSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Inbox Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your messages are handled, filtered, and organized.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconFilter className="h-4 w-4" />
              Automated Filtering
            </CardTitle>
            <CardDescription>
              Set rules for how incoming messages are categorized.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Priority Inbox</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically move important messages to the top.
                </p>
              </div>
              <Select defaultValue="enabled">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">Enabled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Spam Sensitivity</Label>
                <p className="text-xs text-muted-foreground">
                  Adjust how aggressive the spam filter should be.
                </p>
              </div>
              <Select defaultValue="medium">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconArchive className="h-4 w-4" />
              Auto-Archive
            </CardTitle>
            <CardDescription>
              Clean up your inbox by automatically archiving old threads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Archive after</Label>
                <p className="text-xs text-muted-foreground">
                  Messages older than this will be moved to archive.
                </p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconMailForward className="h-4 w-4" />
              Forwarding
            </CardTitle>
            <CardDescription>
              Forward a copy of your messages to another email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="forward-email">Forwarding Address</Label>
                <div className="flex gap-2">
                  <input
                    id="forward-email"
                    type="email"
                    placeholder="email@example.com"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button size="sm">Add</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Inbox Rules</Button>
        </div>
      </div>
    </div>
  );
}
