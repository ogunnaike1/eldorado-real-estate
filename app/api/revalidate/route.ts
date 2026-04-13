import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface SanityWebhookPayload {
  _type?: string;
  slug?: string;
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: SanityWebhookPayload = {};
  try {
    body = await req.json();
  } catch {
    // Allow webhooks without payload; still revalidate listing.
  }

  if (body._type && body._type !== "blogPost") {
    return NextResponse.json({ revalidated: false, skipped: true });
  }

  revalidatePath("/blog");

  if (body.slug) {
    revalidatePath(`/blog/${body.slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    slug: body.slug ?? null,
    now: Date.now(),
  });
}
