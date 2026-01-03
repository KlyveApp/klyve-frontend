import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  IconCreditCard,
  IconCheck,
  IconCircleCheck,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan and billing information.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the{" "}
              <span className="font-semibold text-foreground">Pro Plan</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <IconCircleCheck className="h-4 w-4 text-emerald-500" />
                <span>Unlimited documents and chat history</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCircleCheck className="h-4 w-4 text-emerald-500" />
                <span>Priority access to new agents</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCircleCheck className="h-4 w-4 text-emerald-500" />
                <span>Advanced data export features</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <p className="text-xs text-muted-foreground">
              Your next renewal is on November 12, 2024.
            </p>
            <Button variant="outline" size="sm">
              Manage Subscription
            </Button>
          </CardFooter>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              The primary card used for your subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-12 items-center justify-center rounded-md bg-muted">
                  <IconCreditCard className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Visa ending in 4242
                  </p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm">Add Payment Method</Button>
          </CardFooter>
        </Card>

        {/* Billing Address / Email */}
        <div className="grid gap-4">
          {/*<h4 className="text-sm font-medium">Billing Email</h4>*/}
          <p className="text-sm text-muted-foreground">
            All invoices are sent to the email associated with the account.
          </p>
          {/*<Button variant="link" className="h-auto p-0 justify-start text-xs">
            Change billing email
          </Button>*/}
        </div>
      </div>
    </div>
  );
}
