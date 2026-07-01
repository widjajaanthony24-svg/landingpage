import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Resources", description: "Free toolkits, templates, and cheatsheets for founders and AI builders." };
export const revalidate = 60;

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" }, include: { downloads: true } });
  const categories = [...new Set(resources.map((r) => r.category).filter(Boolean))];

  return (
    <div className="pt-24">
      <div className="container-wide py-16">
        <div className="max-w-xl mb-12">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Resources</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-4">Free tools for founders & AI builders</h1>
          <p className="text-muted-foreground leading-relaxed">Templates, toolkits, and cheatsheets — all free.</p>
        </div>

        {resources.length === 0 ? (
          <p className="text-sm text-muted-foreground">No resources yet. Check back soon.</p>
        ) : (
          <div className="space-y-12">
            {(categories.length > 0 ? categories : [null]).map((category) => {
              const filtered = category ? resources.filter((r) => r.category === category) : resources;
              return (
                <div key={category || "all"}>
                  {category && (
                    <div className="mb-4">
                      <h2 className="text-sm font-medium">{category}</h2>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((resource) => (
                      <Link key={resource.id} href={`/resources/${resource.slug}`} className="border border-border rounded-lg p-5 hover:border-muted-foreground/30 transition-colors group">
                        <h3 className="text-sm font-medium mb-2 group-hover:text-blue transition-colors">{resource.title}</h3>
                        {resource.description && <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download size={11} /> {resource.downloads.length}
                          </span>
                          <span className="text-xs font-medium flex items-center gap-1 group-hover:text-blue transition-colors">
                            Get free <ArrowRight size={11} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
