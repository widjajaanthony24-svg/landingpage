import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and lessons from building startups, AI products, and the trust layer for AI.",
};

export const revalidate = 60;

export default async function WritingPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        <div className="mb-12">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Writing</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-4">The journal</h1>
          <p className="text-muted-foreground leading-relaxed">
            Essays from building AIDAL, navigating AI regulation, and learning to be a founder in public.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet. Check back soon.</p>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/writing/${post.slug}`} className="flex flex-col py-6 gap-3 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    {post.coverImage && (
                      <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h2 className="text-base font-medium group-hover:text-blue transition-colors mb-1.5">{post.title}</h2>
                      {post.excerpt && <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
