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
import { Badge } from "@/components/ui/badge";
import {
  IconRobot,
  IconCpu,
  IconAdjustmentsHorizontal,
  IconSparkles,
} from "@tabler/icons-react";

export default function AgentsAndModelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Agents and Models</h3>
        <p className="text-sm text-muted-foreground">
          Configure the AI models and autonomous agents that power your workspace experience.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconCpu className="h-4 w-4 text-primary" />
              Default AI Model
            </CardTitle>
            <CardDescription>
              Select the primary language model used for chat and document analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Primary Provider</Label>
                <p className="text-xs text-muted-foreground">
                  Choose between different AI providers and model versions.
                </p>
              </div>
              <Select defaultValue="gemini-pro">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-pro">Google Gemini 1.5 Pro</SelectItem>
                  <SelectItem value="gemini-flash">Google Gemini 1.5 Flash</SelectItem>
                  <SelectItem value="gpt-4o">OpenAI GPT-4o</SelectItem>
                  <SelectItem value="claude-3-sonnet">Claude 3.5 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconRobot className="h-4 w-4 text-primary" />
              Autonomous Agents
            </CardTitle>
            <CardDescription>
              Enable or disable specialized agents that can perform tasks on your behalf.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Scheduling Agent</Label>
                  <Badge variant="secondary" className="text-[10px] h-4">Beta</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Can automatically coordinate and book meetings via email.
                </p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-0.5">
                <Label>Research Assistant</Label>
                <p className="text-xs text-muted-foreground">
                  Synthesizes information from your documents into executive summaries.
                </p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inbox Triage Agent</Label>
                <p className="text-xs text-muted-foreground">
                  Labels and prioritizes your incoming mail based on urgency.
                </p>
              </div>
              <Button variant="outline" size="sm">Disabled</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconAdjustmentsHorizontal className="h-4 w-4 text-primary" />
              Advanced Model Settings
            </CardTitle>
            <CardDescription>
              Fine-tune the behavior and creativity of the models.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Temperature (Creativity)</Label>
                <p className="text-xs text-muted-foreground">
                  Higher values result in more diverse and creative output.
                </p>
              </div>
              <Select defaultValue="balanced">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="precise">Precise (0.2)</SelectItem>
                  <SelectItem value="balanced">Balanced (0.7)</SelectItem>
                  <SelectItem value="creative">Creative (1.0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Max Tokens</Label>
                <p className="text-xs text-muted-foreground">
                  The maximum length of the generated responses.
                </p>
              </div>
              <Select defaultValue="2k">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1k">1,024</SelectItem>
                  <SelectItem value="2k">2,048</SelectItem>
                  <SelectItem value="4k">4,096</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="gap-2">
            <IconSparkles size={16} className="text-amber-500" />
            Check Usage Limits
          </Button>
          <Button>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
