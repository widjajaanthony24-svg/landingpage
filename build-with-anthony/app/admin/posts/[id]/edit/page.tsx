"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { RichEditor } from "@/components/editor/rich-editor";
import slugify from "slugify";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    published: false,
  });

  useEffect(() => {
    fetch(`/api/admin/posts/${id}`)
      .then((r) => r.json())
      .then((post) => {
        setForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          coverImage: post.coverImage || "",
          tags: (post.tags || []).join(", "),
          published: post.published || false,
        });
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          published: publish !== undefined ? publish : form.published,
          publishedAt: publish ? new Date().toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error();
      if (publish !== undefined) setForm((f) => ({ ...f, published: publish }));
    } catch {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    router.push("/admin/posts");
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin/posts")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> Posts
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Trash2 size={15} />
          </button>
          {form.published ? (
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 border border-border text-sm px-3 py-1.5 rounded-md hover:bg-muted transition-colors"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded-md hover:opacity-90"
            >
              Publish
            </button>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 border border-border text-sm px-3 py-1.5 rounded-md hover:bg-muted"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Post title..."
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full text-3xl font-semibold bg-transparent border-none outline-none placeholder:text-muted-foreground/40"
        />
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>/writing/</span>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="flex-1 bg-muted border border-border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <input
          type="text"
          placeholder="Cover image URL"
          value={form.coverImage}
          onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
          className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />
        <textarea
          placeholder="Short excerpt..."
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
        />
        <input
          type="text"
          placeholder="Tags: AI, Founder, AIDAL"
          value={form.tags}
          onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />
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
