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
  IconLock,
  IconShieldCheck,
  IconFingerprint,
  IconKey,
  IconDeviceLaptop,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security & Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security, two-factor authentication, and privacy preferences.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconShieldCheck className="h-4 w-4" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account by requiring more than just a password to log in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Authenticator App</p>
                <p className="text-xs text-muted-foreground">
                  Use an app like Google Authenticator or 1Password to generate codes.
                </p>
              </div>
              <Button size="sm">Enable</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">SMS Recovery</p>
                <p className="text-xs text-muted-foreground">
                  Receive a backup code via text message if you lose access to your app.
                </p>
              </div>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconKey className="h-4 w-4" />
              Security Keys
            </CardTitle>
            <CardDescription>
              Use hardware security keys like YubiKeys to sign in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">Add Security Key</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconDeviceLaptop className="h-4 w-4" />
              Active Sessions
            </CardTitle>
            <CardDescription>
              View and manage all the devices currently logged into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded">
                  <IconDeviceLaptop size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">MacBook Pro — San Francisco, CA</p>
                  <p className="text-xs text-muted-foreground">Chrome • Last active 2 minutes ago</p>
                </div>
              </div>
              <Badge variant="outline" className="text-emerald-500 bg-emerald-500/5">Current</Badge>
            </div>
            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded">
                  <IconFingerprint size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">iPhone 15 — Austin, TX</p>
                  <p className="text-xs text-muted-foreground">Safari • Last active 3 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Privacy Policy</Button>
          <Button>Save Security Settings</Button>
        </div>
      </div>
    </div>
  );
}
