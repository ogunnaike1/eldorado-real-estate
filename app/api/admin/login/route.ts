import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../components/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // For simplicity, we use a hardcoded admin check
    // In production, use bcrypt to compare password hashes
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@eldorado.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "eldorado2024";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

    return NextResponse.json({ token, name: "Admin" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}