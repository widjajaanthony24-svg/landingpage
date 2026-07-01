import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  return session?.user?.email === (process.env.ADMIN_EMAIL || "buildwanthony@gmail.com");
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  await prisma.resource.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin())) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const resource = await prisma.resource.update({
    where: { id: params.id },
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
  return NextResponse.json(resource);
}
