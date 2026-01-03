import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground">Manage your messages and notifications.</p>
      </div>
      <div className="relative w-full max-w-sm">
        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search messages..."
          className="pl-8"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>You have 0 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center border-t">
          <p className="text-sm text-muted-foreground">No messages found.</p>
        </CardContent>
      </Card>
    </div>
  );
}
