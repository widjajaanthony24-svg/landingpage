import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";
  if (!session || session.user?.email !== adminEmail) return false;
  return true;
}

export async function GET() {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      content: body.content || null,
      coverImage: body.coverImage || null,
      tags: body.tags || [],
      published: body.published || false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
