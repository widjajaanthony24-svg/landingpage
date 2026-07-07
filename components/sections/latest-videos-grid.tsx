"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoItem {
  id: string;
  youtubeUrl: string;
  title: string;
  category: string | null;
  thumbnail: string | null;
}

export function LatestVideosGrid({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, i) => (
        <motion.a
          key={video.id}
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden border border-border mb-3">
            {video.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play size={24} className="text-white fill-white" />
            </div>
          </div>
          {video.category && (
            <p className="text-xs font-mono text-muted-foreground mb-1">
              {video.category}
            </p>
          )}
          <h3 className="text-sm font-medium group-hover:text-blue transition-colors line-clamp-2">
            {video.title}
          </h3>
        </motion.a>
      ))}
    </div>
  );
}
