import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export default async function PostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">{posts.length} total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> New Post
        </Link>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground text-sm">No posts yet.</p>
            <Link href="/admin/posts/new" className="text-sm text-blue mt-2 inline-block hover:underline">
              Create your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">{post.title}</td>
                  <td className="p-3">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${post.published ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground font-mono text-xs">
                    {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Edit size={14} />
                      </Link>
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
