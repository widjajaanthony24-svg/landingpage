"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, ArrowLeft, Loader2 } from "lucide-react";
import { RichEditor } from "@/components/editor/rich-editor";
import slugify from "slugify";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    published: false,
  });

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: slugify(title, { lower: true, strict: true }),
    }));
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          published: publish,
          publishedAt: publish ? new Date().toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      router.push(`/admin/posts/${data.id}/edit`);
    } catch {
      alert("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin/posts")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Posts
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="inline-flex items-center gap-2 border border-border text-sm px-3 py-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || !form.title}
            className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Post title..."
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full text-3xl font-semibold bg-transparent border-none outline-none placeholder:text-muted-foreground/40 resize-none"
        />

        {/* Slug */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>/writing/</span>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="flex-1 bg-muted border border-border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Cover image */}
        <input
          type="text"
          placeholder="Cover image URL (optional)"
          value={form.coverImage}
          onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
          className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />

        {/* Excerpt */}
        <textarea
          placeholder="Short excerpt / description..."
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated): AI, Founder, AIDAL"
          value={form.tags}
          onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />

        {/* Rich editor */}
        <div className="border border-border rounded-lg overflow-hidden">
          <RichEditor
            content={form.content}
            onChange={(content) => setForm((f) => ({ ...f, content }))}
          />
        </div>
      </div>
    </div>
  );
}
