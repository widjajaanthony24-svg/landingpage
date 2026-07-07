"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PostItem {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  date: string;
}

export function LatestWritingList({ posts }: { posts: PostItem[] }) {
  return (
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
            className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-4 group"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {post.coverImage && (
                <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-sm font-medium group-hover:text-blue transition-colors truncate">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
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
  );
}
