import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ===========================
   PUT /api/blogs/:id
=========================== */
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { services = [], ...data } = await req.json();

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        services: {
          deleteMany: {},
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

    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ===========================
   DELETE /api/blogs/:id
=========================== */
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
