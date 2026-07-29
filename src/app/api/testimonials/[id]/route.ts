import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/* ================= UPDATE (ADMIN) ================= */
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const { quote, author, role, company, avatar, featured } = await req.json();

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        quote,
        author,
        role,
        company,
        avatar,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(testimonial);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ================= DELETE (ADMIN) ================= */
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
