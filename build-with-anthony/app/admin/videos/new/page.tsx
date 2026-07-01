"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

const categories = ["Founder Journey", "Building AIDAL", "AI Systems", "Trust & Compliance", "Cold Email Diary"];

export default function NewVideoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    youtubeUrl: "",
    description: "",
    category: "Founder Journey",
    published: true,
  });

  const getYtId = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const ytId = getYtId(form.youtubeUrl);

  const handleSave = async () => {
    if (!form.title || !form.youtubeUrl) return alert("Title and YouTube URL required.");
    setSaving(true);
    try {
      const thumbnail = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : "";
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, thumbnail, publishedAt: form.published ? new Date().toISOString() : null }),
      });
      if (!res.ok) throw new Error();
      router.push("/admin/videos");
    } catch {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push("/admin/videos")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Videos
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : null}
          Save Video
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Video title"
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">YouTube URL</label>
          <input
            type="text"
            value={form.youtubeUrl}
            onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>

        {/* Thumbnail preview */}
        {ytId && (
          <div className="aspect-video rounded-lg overflow-hidden border border-border">
            <img src={`https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`} alt="Thumbnail" className="w-full h-full object-cover" />
          </div>
        )}

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Short description..."
            rows={3}
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            className="rounded"
          />
          <span className="text-sm">Publish immediately</span>
        </label>
      </div>
    </div>
  );
}
