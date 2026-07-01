"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteVideoButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    router.refresh();
  };
  return (
    <button onClick={handleDelete} className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors">
      <Trash2 size={12} /> Delete
    </button>
  );
}
