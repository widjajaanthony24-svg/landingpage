import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = await prisma.resource.findUnique({ where: { slug } });
  if (!resource) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(resource);
}
