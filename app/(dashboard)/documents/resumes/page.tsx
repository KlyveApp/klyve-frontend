import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconFileCv, IconPlus, IconDownload, IconDotsVertical } from "@tabler/icons-react";

export default function ResumesPage() {
  const resumes = [
    { id: 1, name: "John_Doe_Software_Engineer.pdf", date: "2 days ago", size: "1.2 MB" },
    { id: 2, name: "John_Doe_Frontend_Developer.pdf", date: "1 week ago", size: "1.1 MB" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
          <p className="text-muted-foreground">Manage and organize your professional resumes.</p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Upload Resume
        </Button>
      </div>

      <div className="grid gap-4">
        {resumes.map((resume) => (
          <Card key={resume.id} className="flex items-center p-4">
            <div className="flex items-center flex-1 gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <IconFileCv size={24} />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">{resume.name}</CardTitle>
                <CardDescription>{resume.date} • {resume.size}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><IconDownload size={18} /></Button>
              <Button variant="ghost" size="icon"><IconDotsVertical size={18} /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
