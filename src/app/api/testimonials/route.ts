import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/* ================= GET ALL (PUBLIC) ================= */
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { featured: "desc" },
        { order: "asc" },
      ],
    });

    return NextResponse.json(testimonials, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ================= CREATE (ADMIN) ================= */
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const { quote, author, role, company, avatar, featured } = await req.json();

    if (!quote || !author || !role || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
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
