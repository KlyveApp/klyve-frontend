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
  IconCalendar,
  IconClock,
  IconMailForward,
  IconCopy,
} from "@tabler/icons-react";

export default function CalendarSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Calendar & Availability</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your meeting availability is shared and formatted in communications.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconMailForward className="h-4 w-4" />
              Email Availability Format
            </CardTitle>
            <CardDescription>
              Choose how your available time slots are presented when inserted into emails.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default Format</Label>
                  <p className="text-xs text-muted-foreground">
                    The structure used for the "Copy Times" feature.
                  </p>
                </div>
                <Select defaultValue="list">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">Bullet Points (List)</SelectItem>
                    <SelectItem value="paragraph">Natural Language</SelectItem>
                    <SelectItem value="grid">Compact Grid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Preview Example</Label>
                <div className="rounded-md bg-muted p-4 border border-border">
                  <p className="text-xs font-mono text-muted-foreground mb-2 italic">// Bullet Points format</p>
                  <ul className="text-sm space-y-1">
                    <li>• Monday, Oct 30: 9:00 AM – 11:30 AM EST</li>
                    <li>• Tuesday, Oct 31: 2:00 PM – 4:00 PM EST</li>
                    <li>• Wednesday, Nov 1: 10:00 AM – 12:00 PM EST</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconClock className="h-4 w-4" />
              Default Meeting Preferences
            </CardTitle>
            <CardDescription>
              Set your standard constraints for suggested meetings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Meeting Duration</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer">Buffer Time</Label>
                <Select defaultValue="10">
                  <SelectTrigger id="buffer">
                    <SelectValue placeholder="Buffer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="10">10 Minutes</SelectItem>
                    <SelectItem value="15">15 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label>Minimum Notice</Label>
                <p className="text-xs text-muted-foreground">
                  Prevent last-minute bookings.
                </p>
              </div>
              <Select defaultValue="4h">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Notice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconCalendar className="h-4 w-4" />
              Calendar Sync
            </CardTitle>
            <CardDescription>
              Manage connected calendars used for checking availability.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded text-blue-500">
                  <IconCalendar size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Google Calendar</p>
                  <p className="text-xs text-muted-foreground">m@example.com</p>
                </div>
              </div>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Connected</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full">Connect Another Calendar</Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button>Save Availability Rules</Button>
        </div>
      </div>
    </div>
  );
}
