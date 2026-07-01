import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";

  if (!session || session.user?.email !== adminEmail) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
