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
import { IconWorld, IconClock } from "@tabler/icons-react";

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
              <IconWorld className="h-4 w-4" />
              Localization
            </CardTitle>
            <CardDescription>
              Set your preferred regional format.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Timezone</Label>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <IconClock className="h-3 w-3" /> Select your local time zone.
                </p>
              </div>
              <Select defaultValue="est">
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="cst">Central Time (CT)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="akst">Alaska Time (AKT)</SelectItem>
                  <SelectItem value="hst">
                    Hawaii-Aleutian Time (HAT)
                  </SelectItem>
                </SelectContent>
              </Select>
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
