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
  IconAdjustments,
  IconPalette,
  IconWorld,
  IconClock,
} from "@tabler/icons-react";

export default function ConfigurationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurations</h3>
        <p className="text-sm text-muted-foreground">
          Customize your workspace behavior and global preferences.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconPalette className="h-4 w-4" />
              Appearance
            </CardTitle>
            <CardDescription>
              Adjust how Klyve looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Theme</Label>
                <p className="text-xs text-muted-foreground">
                  Select your preferred color scheme.
                </p>
              </div>
              <Select defaultValue="system">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Density</Label>
                <p className="text-xs text-muted-foreground">
                  Choose between compact or spacious layouts.
                </p>
              </div>
              <Select defaultValue="default">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Density" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconWorld className="h-4 w-4" />
              Localization
            </CardTitle>
            <CardDescription>
              Set your preferred language and regional formats.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Language</Label>
                <p className="text-xs text-muted-foreground">
                  The primary language for the interface.
                </p>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Timezone</Label>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <IconClock className="h-3 w-3" /> Current: UTC-5 (EST)
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change Timezone
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Configurations</Button>
        </div>
      </div>
    </div>
  );
}
