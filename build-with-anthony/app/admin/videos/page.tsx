import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { DeleteVideoButton } from "@/components/admin/delete-video-button";

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export default async function VideosAdminPage() {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">{videos.length} total</p>
        </div>
        <Link
          href="/admin/videos/new"
          className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90"
        >
          <Plus size={14} /> Add Video
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length === 0 && (
          <div className="col-span-3 p-12 text-center border border-border rounded-lg">
            <p className="text-muted-foreground text-sm">No videos yet.</p>
            <Link href="/admin/videos/new" className="text-sm text-blue mt-2 inline-block hover:underline">
              Add your first video →
            </Link>
          </div>
        )}
        {videos.map((video) => {
          const ytId = getYouTubeId(video.youtubeUrl);
          return (
            <div key={video.id} className="border border-border rounded-lg overflow-hidden">
              {ytId && (
                <div className="aspect-video bg-muted">
                  <img
                    src={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{video.category}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-mono px-1.5 py-0.5 rounded ${video.published ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                    {video.published ? "live" : "draft"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Link href={`/admin/videos/${video.id}/edit`} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Edit size={12} /> Edit
                  </Link>
                  <DeleteVideoButton id={video.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
