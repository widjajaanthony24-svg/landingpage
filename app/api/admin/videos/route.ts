import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  return session?.user?.email === (process.env.ADMIN_EMAIL || "buildwanthony@gmail.com");
}

export async function GET() {
  const videos = await prisma.video.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const video = await prisma.video.create({
    data: {
      title: body.title,
      youtubeUrl: body.youtubeUrl,
      thumbnail: body.thumbnail || null,
      description: body.description || null,
      category: body.category || null,
      published: body.published || false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    },
  });
  return NextResponse.json(video, { status: 201 });
}
