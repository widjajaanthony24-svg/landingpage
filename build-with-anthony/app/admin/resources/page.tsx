import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { DeleteResourceButton } from "@/components/admin/delete-resource-button";

export default async function ResourcesAdminPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
          <p className="text-sm text-muted-foreground mt-1">{resources.length} total</p>
        </div>
        <Link
          href="/admin/resources/new"
          className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90"
        >
          <Plus size={14} /> New Resource
        </Link>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        {resources.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground text-sm">No resources yet.</p>
            <Link href="/admin/resources/new" className="text-sm text-blue mt-2 inline-block hover:underline">
              Create your first resource →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Featured</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">{r.title}</td>
                  <td className="p-3 text-muted-foreground">{r.category}</td>
                  <td className="p-3">
                    {r.featured && <span className="text-xs bg-blue/10 text-blue px-2 py-0.5 rounded font-mono">featured</span>}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/resources/${r.id}/edit`} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                        <Edit size={14} />
                      </Link>
                      <DeleteResourceButton id={r.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
