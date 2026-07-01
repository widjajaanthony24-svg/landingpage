import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";
  return session?.user?.email === adminEmail;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const post = await prisma.blogPost.update({
    where: { id: params.id },
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

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  await prisma.blogPost.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
