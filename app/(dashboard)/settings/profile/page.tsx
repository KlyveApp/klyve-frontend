import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatars/shadcn.jpg" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Button variant="outline">Change Avatar</Button>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="shadcn" defaultValue="shadcn" />
          <p className="text-[0.8rem] text-muted-foreground">
            This is your public display name. It can be your real name or a pseudonym.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" defaultValue="m@example.com" />
          <p className="text-[0.8rem] text-muted-foreground">
            Your email address is used for account notifications and security.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="I'm a software engineer based in New York."
          />
        </div>
        <Button>Update profile</Button>
      </div>
    </div>
  );
}
