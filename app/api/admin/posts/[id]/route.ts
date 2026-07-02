import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";
  return session?.user?.email === adminEmail;
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      content: body.content || null,
      coverImage: body.coverImage || null,
      tags: body.tags || [],
      published: body.published,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
