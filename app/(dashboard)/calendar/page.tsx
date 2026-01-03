import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react";

export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage your upcoming events.</p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">October 2023</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon"><IconChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><IconChevronRight className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden border">
            {days.map((day) => (
              <div key={day} className="bg-background p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className="bg-background min-h-[100px] p-2 border-t">
                <span className="text-sm text-muted-foreground">{i + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
