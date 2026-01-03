import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Change your password and manage your account status.
        </p>
      </div>
      <Separator />

      <div className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Current Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new_password">New Password</Label>
            <Input id="new_password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm_password">Confirm New Password</Label>
            <Input id="confirm_password" type="password" />
          </div>
          <Button className="w-fit">Update Password</Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Sign Out</h4>
          <p className="text-sm text-muted-foreground">
            Sign out of all other active sessions across your devices.
          </p>
          <Button variant="outline">Sign out of all sessions</Button>
        </div>

        <Separator />

        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Once you delete your account, there is no going back. Please be certain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
