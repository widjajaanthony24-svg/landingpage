import type { Metadata } from "next";
import { NewsletterCTA } from "@/components/sections/newsletter-cta";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Build With Anthony — weekly lessons from building startups, AI products, and trustworthy AI systems.",
};

export default function NewsletterPage() {
  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
          Newsletter
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">
          Build With Anthony
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
          Weekly lessons from building startups, AI products, and trustworthy AI
          systems. No fluff — just the real stuff from someone doing it right
          now.
        </p>

        <NewsletterCTA />
      </div>
    </div>
  );
}
