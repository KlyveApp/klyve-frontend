import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBell, IconMail, IconDeviceMobile } from "@tabler/icons-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive alerts and updates about your workspace.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconBell className="h-4 w-4" />
              General Notifications
            </CardTitle>
            <CardDescription>
              Manage your global notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Security alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts about suspicious account activity.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Workspace updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new updates or tasks appear.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconMail className="h-4 w-4" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Choose which emails you&apos;d like to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Weekly digest</Label>
                <p className="text-sm text-muted-foreground">
                  A summary of your workspace activity from the past week.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Marketing emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive news about features and product updates.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/*<Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconDeviceMobile className="h-4 w-4" />
              Push Notifications
            </CardTitle>
            <CardDescription>
              Configure notifications for your desktop and mobile devices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Browser notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show real-time alerts in your web browser.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>*/}

        <div className="flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
