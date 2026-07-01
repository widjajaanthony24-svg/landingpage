import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsletterCTA } from "@/components/sections/newsletter-cta";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || "",
    openGraph: { title: post.title, description: post.excerpt || "", images: post.coverImage ? [post.coverImage] : [] },
  };
}

function renderMarkdown(md: string) {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^---$/gm, "<hr />")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />");
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug, published: true } });
  if (!post) notFound();

  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        <Link href="/writing" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={14} /> Writing
        </Link>

        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-4">{post.title}</h1>

        {post.publishedAt && (
          <p className="text-sm text-muted-foreground font-mono mb-8">
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full aspect-video object-cover rounded-lg mb-8 border border-border" />
        )}

        {post.content && (
          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(post.content)}</p>` }}
          />
        )}
      </div>
      <NewsletterCTA />
    </div>
  );
}
