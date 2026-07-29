import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ===============================
   GET /api/services (PUBLIC)
=============================== */
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services, {
      headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ===============================
   POST /api/services (ADMIN)
=============================== */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const service = await prisma.service.create({
      data: body,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
