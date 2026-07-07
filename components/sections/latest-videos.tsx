import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { LatestVideosGrid } from "./latest-videos-grid";

function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export async function LatestVideos() {
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  // Hide the whole section on the public site if nothing's published yet
  if (videos.length === 0) return null;

  const items = videos.map((video) => {
    const ytId = extractYoutubeId(video.youtubeUrl);
    return {
      id: video.id,
      youtubeUrl: video.youtubeUrl,
      title: video.title,
      category: video.category,
      thumbnail: video.thumbnail || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null),
    };
  });

  return (
    <section className="py-16 border-t border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Latest videos
          </p>
          <Link
            href="/videos"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            All videos <ArrowRight size={12} />
          </Link>
        </div>

        <LatestVideosGrid videos={items} />
      </div>
    </section>
  );
}
