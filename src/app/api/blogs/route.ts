import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ===========================
   GET /api/blogs
=========================== */
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      include: {
        services: {
          include: { service: true },
        },
      },
    });

    return NextResponse.json(projects, {
      headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=120" },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ===========================
   POST /api/blogs
=========================== */
export async function POST(req: NextRequest) {
  try {
    const { services = [], ...data } = await req.json();

    const project = await prisma.project.create({
      data: {
        ...data,
        services: {
          create: services.map((serviceId: string) => ({
            serviceId,
          })),
        },
      },
      include: {
        services: {
          include: { service: true },
        },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
