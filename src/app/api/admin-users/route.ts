import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSuperAdmin } from "@/lib/auth";

/* ================= ALL ROUTES REQUIRE LOGIN ================= */

/* ================= GET ALL ADMINS (SUPER ADMIN ONLY) ================= */
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const forbidden = requireSuperAdmin(auth);
    if (forbidden) return forbidden;

    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        approved: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(admins);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
