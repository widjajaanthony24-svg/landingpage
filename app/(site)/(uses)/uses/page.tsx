import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The hardware, software, and tools Anthony uses to build.",
};

const sections = [
  {
    title: "Hardware",
    items: [
      { name: "Laptop", description: "My daily machine for coding, writing, and building." },
      { name: "Redmi Note 15", description: "Testing, communication, and content creation." },
    ],
  },
  {
    title: "Software",
    items: [
      { name: "VS Code", description: "My editor. I don't know every feature yet, but I learn by building." },
      { name: "GitHub", description: "Version control and my public portfolio." },
      { name: "Railway", description: "Where I deploy most of my projects because it's simple and affordable." },
      { name: "Notion", description: "My second brain. Every idea, reflection, and startup thought goes here." },
      { name: "Pinterest", description: "My source of UI and design inspiration." },
      { name: "PowerShell", description: "The terminal I spend too much time in." },
    ],
  },
  {
    title: "AI Stack",
    items: [
      { name: "Claude", description: "My primary coding partner. Most of my projects exist because Claude helps me move faster." },
      { name: "ChatGPT", description: "Writing, scripts, and refining ideas." },
      { name: "Perplexity", description: "Research and fact-checking." },
      { name: "Grok", description: "Brainstorming and seeing different perspectives." },
      { name: "Kimi & Manus", description: "Experimenting with alternative workflows and reasoning styles." },
    ],
  },
  {
    title: "Workflow",
    items: [
      { name: "Capture ideas immediately", description: "Most ideas come while I'm at the gym, walking, or doing something unrelated. I put everything into Notion." },
      { name: "Build almost every day", description: "I don't have a strict schedule. I think, reflect, and build continuously." },
      { name: "Learn by shipping", description: "I don't wait until I fully understand something. I build first and figure things out along the way." },
    ],
  },
  {
    title: "Books",
    items: [
      { name: "How to Win Friends and Influence People", description: "Taught me that people and relationships matter as much as products." },
      { name: "The Lean Startup", description: "Made me think in experiments instead of assumptions." },
      { name: "The Mom Test", description: "Changed how I talk to users and validate ideas." },
    ],
  },
  {
    title: "Current Focus",
    items: [
      { name: "Building", description: "AIDAL — infrastructure for trustworthy AI." },
      { name: "Learning", description: "Distribution, enterprise sales, and storytelling." },
      { name: "Experimenting", description: "How far one founder can go with AI." },
      { name: "Challenge", description: "Building credibility and meeting the right people." },
      { name: "Belief", description: "Great products don't matter if nobody knows you exist." },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
          Uses
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">
          What I use
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-12">
          Hardware, software, AI tools, and workflow systems I actually use to
          build AIDAL and document the journey.
        </p>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                {section.title}
              </h2>
              <div className="divide-y divide-border">
                {section.items.map((item) => (
                  <div key={item.name} className="py-4 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8">
                    <span className="text-sm font-medium shrink-0 sm:w-48">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
              {section.title === "Workflow" && (
                <div className="border-l-2 border-blue pl-6 py-1 mt-8">
                  <p className="text-base text-muted-foreground italic leading-relaxed">
                    I use Next.js because Claude suggested it. I still
                    don&apos;t understand everything, but every project
                    teaches me something new.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
