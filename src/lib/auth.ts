import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export interface AuthPayload {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN";
  iat: number;
  exp: number;
}

export function signToken(payload: { id: string; role: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

/** Mirrors backend/src/middleware/requireAuth.js — verifies the Bearer token, returns decoded payload or null. */
export function getAuth(req: NextRequest): AuthPayload | null {
  const header = req.headers.get("authorization");
  if (!header) return null;
  const token = header.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest): AuthPayload | NextResponse {
  const auth = getAuth(req);
  if (!auth) return NextResponse.json({ error: "No token" }, { status: 401 });
  return auth;
}

/** Mirrors backend/src/middleware/requireSuperAdmin.js — call after requireAuth. */
export function requireSuperAdmin(auth: AuthPayload): NextResponse | null {
  if (auth.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
