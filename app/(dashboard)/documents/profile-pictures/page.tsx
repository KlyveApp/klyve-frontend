import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconPlus, IconTrash, IconCamera } from "@tabler/icons-react";

export default function ProfilePicturesPage() {
  const pictures = [
    { id: 1, name: "Professional Headshot", date: "Oct 12, 2023", url: "/avatars/01.png" },
    { id: 2, name: "Casual Avatar", date: "Sep 20, 2023", url: "/avatars/02.png" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile Pictures</h1>
          <p className="text-muted-foreground">Manage your avatars and profile images for different platforms.</p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pictures.map((pic) => (
          <Card key={pic.id} className="overflow-hidden group">
            <div className="aspect-square relative bg-muted flex items-center justify-center">
              <Avatar className="h-32 w-32 shadow-xl">
                <AvatarImage src={pic.url} alt={pic.name} />
                <AvatarFallback><IconCamera size={40} className="text-muted-foreground" /></AvatarFallback>
              </Avatar>
            </div>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold truncate">{pic.name}</p>
                <p className="text-xs text-muted-foreground">{pic.date}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                <IconTrash size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
