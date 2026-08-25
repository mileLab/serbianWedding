import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { renderContactEmailHtml, resend } from "@/lib/email";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Sveta Loza Werkstatt <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION_FAILED", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot tripped: silently accept so the bot thinks it worked.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  if (!resend || !CONTACT_TO_EMAIL) {
    console.error(
      "[contact] RESEND_API_KEY oder CONTACT_TO_EMAIL fehlt. Anfrage konnte nicht versendet werden:",
      parsed.data
    );
    return NextResponse.json({ error: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: parsed.data.email,
      subject: `Neue Anfrage: ${parsed.data.category} — ${parsed.data.name}`,
      html: renderContactEmailHtml(parsed.data),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "SEND_FAILED" }, { status: 500 });
  }
}
