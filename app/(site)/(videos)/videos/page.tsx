import type { Metadata } from "next";
import { Play } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Videos", description: "YouTube videos on building AIDAL, AI systems, and founder journey." };
export const revalidate = 60;

function getYtId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export default async function VideosPage() {
  const videos = await prisma.video.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });

  return (
    <div className="pt-24">
      <div className="container-wide py-16">
        <div className="mb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Videos</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-4">YouTube</h1>
          <p className="text-muted-foreground">
            Building in public, on camera.{" "}
            <a href="https://youtube.com/@buildwanthony" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
              Subscribe →
            </a>
          </p>
        </div>

        {videos.length === 0 ? (
          <p className="text-sm text-muted-foreground">No videos yet. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video) => {
              const ytId = getYtId(video.youtubeUrl);
              return (
                <a key={video.id} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="relative aspect-video bg-muted rounded-md overflow-hidden border border-border mb-3">
                    {ytId && (
                      <img src={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={28} className="text-white fill-white" />
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{video.category}</p>
                  <h3 className="text-sm font-medium group-hover:text-blue transition-colors line-clamp-2">{video.title}</h3>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
