import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSuperAdmin } from "@/lib/auth";

/* ================= APPROVE ADMIN (SUPER ADMIN ONLY) ================= */
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const forbidden = requireSuperAdmin(auth);
    if (forbidden) return forbidden;

    const { id } = await context.params;

    // ❌ prevent approving yourself (safety)
    if (id === auth.id) {
      return NextResponse.json(
        { error: "You cannot approve yourself" },
        { status: 400 }
      );
    }

    await prisma.admin.update({
      where: { id },
      data: { approved: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
