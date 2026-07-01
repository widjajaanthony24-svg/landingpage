"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import slugify from "slugify";

const categories = ["Founder OS", "AI Builder OS", "Enterprise Sales OS", "AI Trust Toolkit", "Prompt Library", "Reading Library"];

export default function NewResourcePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    notionLink: "",
    category: "Founder OS",
    featured: false,
  });

  const handleSave = async () => {
    if (!form.title || !form.slug) return alert("Title and slug required.");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      router.push("/admin/resources");
    } catch {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push("/admin/resources")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Resources
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {saving && <Loader2 size={13} className="animate-spin" />}
          Save Resource
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value, { lower: true, strict: true }) }))}
            placeholder="Resource title"
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Slug</label>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>/resources/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="flex-1 bg-muted border border-border rounded px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder="What's in this resource?"
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Notion Link</label>
          <input
            type="text"
            value={form.notionLink}
            onChange={(e) => setForm((f) => ({ ...f, notionLink: e.target.value }))}
            placeholder="https://notion.so/..."
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">Cover Image URL</label>
          <input
            type="text"
            value={form.coverImage}
            onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
            placeholder="https://..."
            className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
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
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            className="rounded"
          />
          <span className="text-sm">Feature on homepage</span>
        </label>
      </div>
    </div>
  );
}
