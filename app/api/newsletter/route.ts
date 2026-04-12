import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const OWNER_EMAIL = "ogunnaikeusman17@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Send notification to owner about new subscriber
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Eldorado Website <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `New Newsletter Subscriber — ${email}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #2D3748;">
            <div style="background: #2D3748; padding: 20px 24px;">
              <h1 style="color: #fff; font-size: 16px; font-weight: 600; margin: 0; letter-spacing: 0.05em;">ELDORADO REAL ESTATE</h1>
            </div>
            <div style="padding: 24px; border: 1px solid #E2E8F0; border-top: none;">
              <h2 style="font-size: 18px; margin: 0 0 4px; color: #2D3748;">New Newsletter Subscriber</h2>
              <p style="font-size: 13px; color: #A0AEC0; margin: 0 0 16px;">Someone just subscribed to your newsletter</p>
              <div style="background: #F5F7FA; padding: 14px 18px; font-size: 15px; font-weight: 500; color: #2D3748;">
                ${email}
              </div>
              <p style="font-size: 12px; color: #A0AEC0; margin: 16px 0 0;">Add this email to your mailing list for property updates and newsletters.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}