import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconDownload,
  IconFileZip,
  IconDatabaseExport,
} from "@tabler/icons-react";

export default function ExportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Export Data</h3>
        <p className="text-sm text-muted-foreground">
          Manage your data and export it to various formats for backup or
          migration.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconDatabaseExport className="h-4 w-4" />
              Full Workspace Export
            </CardTitle>
            <CardDescription>
              Generate a complete archive of your documents, notes, and chat
              history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your last export was 14 days ago. Archives are kept for 30 days.
            </p>
            <Button size="sm">Start New Export</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconFileZip className="h-4 w-4" />
              Document Backup
            </CardTitle>
            <CardDescription>
              Export only your files and resumes in a ZIP format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Export Documents
            </Button>
          </CardContent>
        </Card>

        {/*<Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconDownload className="h-4 w-4" />
              Personal Metadata
            </CardTitle>
            <CardDescription>
              Export your profile information and activity logs in JSON format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Download JSON
            </Button>
          </CardContent>
        </Card>*/}
      </div>
    </div>
  );
}
