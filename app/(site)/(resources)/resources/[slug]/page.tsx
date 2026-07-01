"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Download, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  notionLink: string | null;
}

export default function ResourcePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`/api/resources/${slug}`)
      .then((r) => r.json())
      .then((data) => { setResource(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/resources/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, resourceSlug: slug, source: "resource-page" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setStatus("success");
      if (data.notionLink) setTimeout(() => window.open(data.notionLink, "_blank"), 500);
    } catch {
      setStatus("error");
    }
  };

  if (loading) return <div className="pt-24 container-tight py-16 text-sm text-muted-foreground">Loading...</div>;
  if (!resource) return (
    <div className="pt-24 container-tight py-16">
      <p className="text-muted-foreground">Resource not found.</p>
      <Link href="/resources" className="text-sm hover:text-foreground mt-4 flex items-center gap-1"><ArrowLeft size={14} /> Resources</Link>
    </div>
  );

  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        <Link href="/resources" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"><ArrowLeft size={14} /> Resources</Link>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">{resource.category}</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">{resource.title}</h1>
        {resource.description && <p className="text-muted-foreground leading-relaxed mb-8">{resource.description}</p>}

        {status === "success" ? (
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
              <CheckCircle size={16} />
              <span className="font-medium text-sm">You&apos;re in! Opening resource...</span>
            </div>
            <p className="text-sm text-muted-foreground">You&apos;re also subscribed to Build With Anthony.</p>
            {resource.notionLink && (
              <a href={resource.notionLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue hover:underline mt-2 inline-block">
                Open resource manually →
              </a>
            )}
          </div>
        ) : (
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-1">
              <Download size={16} />
              <h2 className="text-sm font-medium">Get {resource.title} — free</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-5">Enter your email and I&apos;ll give you instant access.</p>
            <form onSubmit={handleDownload} className="space-y-3">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First name (optional)" className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
              <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50">
                {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : <><Download size={14} /> Get instant access</>}
              </button>
            </form>
            {status === "error" && <p className="text-xs text-red-500 mt-2">Something went wrong. Try again.</p>}
            <p className="text-xs text-muted-foreground mt-3 text-center">You&apos;ll also join Build With Anthony — unsubscribe anytime.</p>
          </div>
        )}
      </div>
    </div>
  );
}
