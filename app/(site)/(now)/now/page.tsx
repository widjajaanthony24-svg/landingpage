import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Anthony is focused on right now.",
};

const sections = [
  {
    title: "Currently Building",
    items: [
      "AIDAL — infrastructure for trustworthy AI",
      "This website as a content platform",
      "Enterprise outreach for AIDAL's first customers",
    ],
  },
  {
    title: "Currently Reading",
    items: [
      "The Mom Test — Rob Fitzpatrick",
      "EU AI Act official text",
      "Thinking in Systems — Donella Meadows",
    ],
  },
  {
    title: "Currently Learning",
    items: [
      "AI governance frameworks (NIST AI RMF, ISO 42001)",
      "Enterprise sales motion for AI compliance",
      "Next.js 15 App Router patterns",
    ],
  },
  {
    title: "Current Focus",
    items: [
      "Ship AIDAL v1 before end of year",
      "Grow newsletter to 500 subscribers",
      "Get 3 pilot customers for AIDAL",
    ],
  },
];

export default function NowPage() {
  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Now</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">What I&apos;m focused on</h1>
        <p className="text-sm text-muted-foreground mb-12 font-mono">
          Updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground mt-1.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-12 pt-6 border-t border-border">
          Inspired by{" "}
          <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            nownownow.com
          </a>
        </p>
      </div>
    </div>
  );
}
