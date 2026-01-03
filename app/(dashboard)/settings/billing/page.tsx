import { Separator } from "@/components/ui/separator";

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

      <div className="space-y-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        <p>
          We are currently running a beta version of Klyve. During this period,
          billing is disabled and all features are available for free.
        </p>
        <p>
          If you run into any limitations while using this app or have any
          questions, please contact us at{" "}
          <a
            href="mailto:abdullah@klyve.app"
            className="text-primary hover:underline font-medium"
          >
            abdullah@klyve.app
          </a>
          .
        </p>
      </div>
    </div>
  );
}
