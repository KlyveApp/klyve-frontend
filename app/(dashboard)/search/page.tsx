import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  IconSearch,
  IconHistory,
  IconStar,
  IconFilter,
  IconDotsVertical,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function PeopleSearchPage() {
  const people = [
    {
      id: 1,
      name: "Olivia Martin",
      role: "Product Designer",
      location: "New York, NY",
      status: "Active",
      avatar: "/avatars/01.png",
      initials: "OM",
    },
    {
      id: 2,
      name: "Jackson Lee",
      role: "Software Engineer",
      location: "San Francisco, CA",
      status: "On Leave",
      avatar: "/avatars/02.png",
      initials: "JL",
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      role: "Marketing Manager",
      location: "Austin, TX",
      status: "Active",
      avatar: "/avatars/03.png",
      initials: "IN",
    },
    {
      id: 4,
      name: "William Kim",
      role: "Content Strategist",
      location: "London, UK",
      status: "Active",
      avatar: "/avatars/04.png",
      initials: "WK",
    },
  ];

  const recentSearches = [
    "Frontend Engineers in NY",
    "UX Designers",
    "Project Managers",
  ];

  const favoriteSearches = [
    "Top Performers Q3",
    "Design Team",
    "Hiring Pipeline",
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      {/* Search Header Section */}
      <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto mb-4">
        <h1 className="text-3xl font-bold tracking-tight">People Search</h1>
        <div className="relative w-full">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, or location..."
            className="h-14 pl-12 pr-24 text-lg rounded-2xl bg-muted/50 border-none ring-1 ring-border focus-visible:ring-ring focus-visible:bg-background transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Button size="sm" variant="secondary" className="rounded-xl h-9">
              <IconFilter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Main Results Table (Left/Center) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px]">Person</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person) => (
                  <TableRow key={person.id} className="cursor-pointer group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback>{person.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {person.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {person.role}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {person.location}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          person.status === "Active" ? "default" : "secondary"
                        }
                        className="font-normal"
                      >
                        {person.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IconDotsVertical size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Sidebar Cards (Right) */}
        <div className="flex flex-col gap-6">
          {/* Recent Results Rectangle */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-2">
                <IconHistory className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Recent
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 px-3">
              <div className="space-y-1">
                {recentSearches.map((search, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal py-2 h-auto"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Results Rectangle */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-2">
                <IconStar className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Favorites
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 px-3">
              <div className="space-y-1">
                {favoriteSearches.map((search, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal py-2 h-auto"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
