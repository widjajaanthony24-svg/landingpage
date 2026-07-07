import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { PopularResourcesGrid } from "./popular-resources-grid";

export async function PopularResources() {
  const resources = await prisma.resource.findMany({
    where: { featured: true },
    orderBy: { downloads: { _count: "desc" } },
    take: 3,
    include: { _count: { select: { downloads: true } } },
  });

  // Hide the whole section on the public site if nothing's featured yet
  if (resources.length === 0) return null;

  const items = resources.map((resource) => ({
    slug: resource.slug,
    title: resource.title,
    description: resource.description ?? "",
    category: resource.category,
    downloads: resource._count.downloads,
  }));

  return (
    <section className="py-16 border-t border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Popular resources
          </p>
          <Link
            href="/resources"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            All resources <ArrowRight size={12} />
          </Link>
        </div>

        <PopularResourcesGrid resources={items} />
      </div>
    </section>
  );
}
