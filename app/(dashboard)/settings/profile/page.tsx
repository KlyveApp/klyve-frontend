import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Info</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal information and educational background.
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

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" placeholder="First Name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" placeholder="Last Name" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="university">University</Label>
          <Input id="university" placeholder="University" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 grid gap-2">
            <Label htmlFor="major">Major</Label>
            <Input id="major" placeholder="Major" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="graduating_year">Grad Year</Label>
            <Input id="graduating_year" type="number" placeholder="2024" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="about_me">About Me</Label>
          <textarea
            id="about_me"
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell us a bit about yourself"
          />
        </div>

        <Button>Update profile</Button>
      </div>
    </div>
  );
}
