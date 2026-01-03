import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSearch, IconBook, IconMessage, IconLifebuoy, IconMail } from "@tabler/icons-react";

export default function HelpPage() {
  const categories = [
    {
      title: "Documentation",
      description: "Detailed guides on how to use every feature of Klyve.",
      icon: IconBook,
    },
    {
      title: "Community Forum",
      description: "Ask questions and share tips with other Klyve users.",
      icon: IconMessage,
    },
    {
      title: "Technical Support",
      description: "Get direct help from our engineering team.",
      icon: IconLifebuoy,
    },
    {
      title: "Contact Us",
      description: "Send us a message for general inquiries.",
      icon: IconMail,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-2 items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">How can we help?</h1>
        <p className="text-muted-foreground text-lg">Search our help center or browse categories below.</p>
        <div className="relative w-full max-w-xl mt-4">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for articles, guides, and more..."
            className="pl-10 h-12 text-base shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.title} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="p-2 w-fit bg-primary/10 rounded-lg text-primary mb-2">
                <category.icon size={24} />
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 h-auto text-primary">Learn more →</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
