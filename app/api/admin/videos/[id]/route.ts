import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  return session?.user?.email === (process.env.ADMIN_EMAIL || "buildwanthony@gmail.com");
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const video = await prisma.video.update({
    where: { id },
    data: {
      title: body.title,
      youtubeUrl: body.youtubeUrl,
      thumbnail: body.thumbnail || null,
      description: body.description || null,
      category: body.category || null,
      published: body.published,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    },
  });
  return NextResponse.json(video);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  await prisma.video.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
