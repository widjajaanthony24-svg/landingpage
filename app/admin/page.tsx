import { prisma } from "@/lib/db";
import { FileText, Video, BookOpen, Users, Download } from "lucide-react";

async function getStats() {
  const [posts, videos, resources, subscribers, downloads] = await Promise.all([
    prisma.blogPost.count(),
    prisma.video.count(),
    prisma.resource.count(),
    prisma.subscriber.count(),
    prisma.download.count(),
  ]);
  const recentSubscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const recentPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { title: true, published: true, createdAt: true, slug: true },
  });
  return { posts, videos, resources, subscribers, downloads, recentSubscribers, recentPosts };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Posts", value: stats.posts, icon: FileText, href: "/admin/posts" },
    { label: "Videos", value: stats.videos, icon: Video, href: "/admin/videos" },
    { label: "Resources", value: stats.resources, icon: BookOpen, href: "/admin/resources" },
    { label: "Subscribers", value: stats.subscribers, icon: Users, href: "/admin/subscribers" },
    { label: "Downloads", value: stats.downloads, icon: Download, href: "/admin/analytics" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{label}</p>
              <Icon size={13} className="text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{value}</p>
          </a>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent posts */}
        <div className="border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Recent Posts</h2>
            <a href="/admin/posts" className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </a>
          </div>
          <div className="space-y-2">
            {stats.recentPosts.length === 0 && (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            )}
            {stats.recentPosts.map((post) => (
              <div key={post.slug} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm truncate max-w-[200px]">{post.title}</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${post.published ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                  {post.published ? "live" : "draft"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent subscribers */}
        <div className="border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Recent Subscribers</h2>
            <a href="/admin/subscribers" className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </a>
          </div>
          <div className="space-y-2">
            {stats.recentSubscribers.length === 0 && (
              <p className="text-sm text-muted-foreground">No subscribers yet.</p>
            )}
            {stats.recentSubscribers.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm truncate max-w-[200px]">{sub.email}</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {new Date(sub.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
