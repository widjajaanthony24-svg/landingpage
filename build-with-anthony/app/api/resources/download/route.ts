import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, name, resourceSlug, source } = await req.json();
    if (!email || !resourceSlug) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const resource = await prisma.resource.findUnique({ where: { slug: resourceSlug } });
    if (!resource) return NextResponse.json({ error: "Resource not found" }, { status: 404 });

    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email, name: name || null, source: source || "resource", resourceDownloaded: resource.title },
    });

    await prisma.download.create({ data: { subscriberId: subscriber.id, resourceId: resource.id } });

    return NextResponse.json({ success: true, notionLink: resource.notionLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
