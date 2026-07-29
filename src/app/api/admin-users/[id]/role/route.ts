import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSuperAdmin } from "@/lib/auth";

/* ================= CHANGE ROLE (SUPER ADMIN ONLY) ================= */
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const forbidden = requireSuperAdmin(auth);
    if (forbidden) return forbidden;

    const { id } = await context.params;
    const { role } = await req.json();

    if (!["ADMIN", "SUPER_ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // ❌ prevent changing your own role
    if (id === auth.id) {
      return NextResponse.json(
        { error: "You cannot change your own role" },
        { status: 400 }
      );
    }

    await prisma.admin.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
