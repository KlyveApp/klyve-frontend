import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconUserPlus } from "@tabler/icons-react";

export default function NetworkPage() {
  const contacts = [
    { name: "Alice Johnson", role: "Product Designer", initial: "AJ" },
    { name: "Bob Smith", role: "Software Engineer", initial: "BS" },
    { name: "Charlie Davis", role: "Marketing Lead", initial: "CD" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Network</h1>
          <p className="text-muted-foreground">Manage your connections and find new collaborators.</p>
        </div>
        <Button>
          <IconUserPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <Card key={contact.name}>
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{contact.initial}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-lg">{contact.name}</CardTitle>
                <CardDescription>{contact.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Profile</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
