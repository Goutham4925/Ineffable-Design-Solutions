import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    if (!admin.approved)
      return NextResponse.json({ error: "Awaiting approval" }, { status: 403 });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = signToken({ id: admin.id, role: admin.role });

    // ✅ SEND ADMIN DATA TOO
    return NextResponse.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        approved: admin.approved,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
