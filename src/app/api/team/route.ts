import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/* ================= PUBLIC ================= */
export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(team, {
      headers: { "Cache-Control": "public, max-age=120, stale-while-revalidate=600" },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ================= ADMIN ================= */
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const { name, role, bio, avatar } = await req.json();

    const member = await prisma.teamMember.create({
      data: { name, role, bio, avatar },
    });

    return NextResponse.json(member);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
