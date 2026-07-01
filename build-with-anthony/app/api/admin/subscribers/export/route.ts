import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";
  if (!session || session.user?.email !== adminEmail) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = [
    ["Email", "Name", "Source", "Resource Downloaded", "Joined"].join(","),
    ...subscribers.map((s) =>
      [s.email, s.name || "", s.source || "", s.resourceDownloaded || "", s.createdAt.toISOString()].join(",")
    ),
  ].join("\n");

  return new NextResponse(rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
