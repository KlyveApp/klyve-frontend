import { Separator } from "@/components/ui/separator";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security & Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Our commitment to your data and privacy.
        </p>
      </div>
      <Separator />
      <div className="space-y-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        <p>
          At Klyve, we prioritize the security of your information. We use your
          data exclusively to provide and improve our services, ensuring a
          personalized and efficient workspace experience.
        </p>
        <p>
          We do not sell your personal data to third parties. All information is
          encrypted in transit, utilizing industry-standard security protocols
          to safeguard your documents and communications.
        </p>
        <p>
          You can{" "}
          <a href="#" className="text-primary hover:underline font-medium">
            go here to read more
          </a>{" "}
          about our comprehensive privacy policy and data protection measures.
        </p>
      </div>
    </div>
  );
}
