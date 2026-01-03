import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconFile, IconDownload, IconDotsVertical, IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

export default function AllDocumentsPage() {
  const documents = [
    { id: 1, name: "Project_Proposal.docx", type: "Word", date: "Oct 26, 2023", size: "2.4 MB" },
    { id: 2, name: "Q4_Budget_Plan.xlsx", type: "Excel", date: "Oct 25, 2023", size: "1.1 MB" },
    { id: 3, name: "Company_Logo_v2.png", type: "Image", date: "Oct 24, 2023", size: "4.5 MB" },
    { id: 4, name: "Employee_Handbook.pdf", type: "PDF", date: "Oct 20, 2023", size: "3.2 MB" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">All Documents</h1>
          <p className="text-muted-foreground">Access and manage all your files in one place.</p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <IconFile className="h-4 w-4 text-muted-foreground" />
                    {doc.name}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
                <TableCell className="hidden md:table-cell">{doc.date}</TableCell>
                <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <IconDownload size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconDotsVertical size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
