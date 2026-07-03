"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Static placeholder posts — replace with DB/MDX fetch
const posts: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
}[] = [];

export function LatestWriting() {
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

        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8">
            No posts yet. Check back soon.
          </p>
        ) : (
        <div className="divide-y divide-border">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/writing/${post.slug}`}
                className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-3 group"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium group-hover:text-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono text-muted-foreground">
                    {post.readingTime} min
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
