import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const OWNER_EMAIL = "ogunnaikeusman17@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, project } = body;

    // Validate
    if (!fullName || !email || !phone || !project) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Eldorado Website <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `New Appointment Request — ${fullName}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #2D3748;">
            
            <div style="background: #2D3748; padding: 24px 32px;">
              <h1 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0; letter-spacing: 0.05em;">
                ELDORADO REAL ESTATE
              </h1>
            </div>

            <div style="padding: 32px; border: 1px solid #E2E8F0; border-top: none;">
              
              <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 4px; color: #2D3748;">
                New Appointment Request
              </h2>
              <p style="font-size: 13px; color: #A0AEC0; margin: 0 0 24px;">
                Submitted from the Eldorado website
              </p>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F5F7FA; color: #A0AEC0; width: 140px; vertical-align: top;">
                    Full Name
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F5F7FA; color: #2D3748; font-weight: 500;">
                    ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F5F7FA; color: #A0AEC0; vertical-align: top;">
                    Email
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F5F7FA;">
                    <a href="mailto:${email}" style="color: #2D3748; text-decoration: none; font-weight: 500;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F5F7FA; color: #A0AEC0; vertical-align: top;">
                    Phone
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #F5F7FA;">
                    <a href="tel:${phone}" style="color: #2D3748; text-decoration: none; font-weight: 500;">
                      ${phone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #A0AEC0; vertical-align: top;">
                    Project Interest
                  </td>
                  <td style="padding: 12px 0; color: #2D3748; font-weight: 500;">
                    ${project}
                  </td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background: #F5F7FA; font-size: 13px; color: #718096; line-height: 1.6;">
                <strong style="color: #2D3748;">Next step:</strong> Reply to this email or call 
                <a href="tel:${phone}" style="color: #2D3748;">${phone}</a> 
                to confirm the appointment with ${fullName.split(" ")[0]}.
              </div>
            </div>

            <div style="padding: 16px 32px; background: #F5F7FA; text-align: center;">
              <p style="font-size: 11px; color: #A0AEC0; margin: 0; letter-spacing: 0.05em;">
                ELDORADO REAL ESTATE &bull; PREMIUM PROPERTIES
              </p>
            </div>

          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}