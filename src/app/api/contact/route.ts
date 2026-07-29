import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { sendContactNotification } from "@/lib/mail";

/* ================= CREATE CONTACT (PUBLIC) ================= */
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        service: subject,
        message,
      },
    });

    // Vercel serverless functions freeze right after the response is sent —
    // a fire-and-forget promise here would get killed before it completes.
    // Must await, even though a failed send shouldn't fail the request.
    await sendContactNotification({ name, email, phone, subject, message }).catch((err) =>
      console.error("[mailer] failed to send notification:", err.message)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

/* ================= GET ALL (ADMIN) ================= */
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const messages = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
