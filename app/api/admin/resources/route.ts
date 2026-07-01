import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  return session?.user?.email === (process.env.ADMIN_EMAIL || "buildwanthony@gmail.com");
}

export async function GET() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(resources);
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const resource = await prisma.resource.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description || null,
      coverImage: body.coverImage || null,
      notionLink: body.notionLink || null,
      category: body.category || null,
      featured: body.featured || false,
    },
  });
  return NextResponse.json(resource, { status: 201 });
}
