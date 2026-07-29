import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ===============================
   GET /api/services/:slug
=============================== */
export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;

    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service, {
      headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ===============================
   PUT /api/services/:id (ADMIN)
   NOTE: same dynamic segment as the slug GET above — the original Express
   app used the identical path pattern (/api/services/:slug for GET,
   /api/services/:id for PUT/DELETE), so this reuses the [slug] param as the id.
=============================== */
export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: id } = await context.params;
    const body = await req.json();

    const service = await prisma.service.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ===============================
   DELETE /api/services/:id (ADMIN)
=============================== */
export async function DELETE(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: id } = await context.params;

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
