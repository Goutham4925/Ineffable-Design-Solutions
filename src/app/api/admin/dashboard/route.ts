import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const [services, projects, team, testimonials, messages] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.teamMember.count(),
      prisma.testimonial.count(),
      prisma.contactSubmission.count({
        where: { read: false },
      }),
    ]);

    return NextResponse.json({
      services,
      projects,
      team,
      testimonials,
      unreadMessages: messages,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return NextResponse.json({ error: "Failed to load dashboard stats" }, { status: 500 });
  }
}
