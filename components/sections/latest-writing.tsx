import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { LatestWritingList } from "./latest-writing-list";

export async function LatestWriting() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const items = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    coverImage: post.coverImage,
    date: (post.publishedAt ?? post.createdAt).toISOString(),
  }));

  return (
    <section className="py-16 border-t border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Latest writing
          </p>
          <Link
            href="/writing"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            All posts <ArrowRight size={12} />
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8">
            No posts yet. Check back soon.
          </p>
        ) : (
          <LatestWritingList posts={items} />
        )}
      </div>
    </section>
  );
}
