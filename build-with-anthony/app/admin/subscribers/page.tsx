import { prisma } from "@/lib/db";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    include: { downloads: { include: { resource: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Subscribers</h1>
          <p className="text-sm text-muted-foreground mt-1">{subscribers.length} total</p>
        </div>
        <a
          href="/api/admin/subscribers/export"
          className="inline-flex items-center gap-2 border border-border text-sm font-medium px-4 py-2 rounded-md hover:bg-muted transition-colors"
        >
          Export CSV
        </a>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground text-sm">No subscribers yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Source</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Resource</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-mono text-xs">{sub.email}</td>
                  <td className="p-3 text-muted-foreground text-xs">{sub.source || "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {sub.downloads[0]?.resource?.title || sub.resourceDownloaded || "—"}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {new Date(sub.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
