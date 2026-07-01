"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    router.refresh();
  };
  return (
    <button onClick={handleDelete} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-red-500 transition-colors">
      <Trash2 size={14} />
    </button>
  );
}
