import { Resend } from "resend";
import type { ContactFormValues } from "./validation";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactEmailHtml(data: ContactFormValues) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["E-Mail", data.email],
    ["Telefon", data.phone || "—"],
    ["Kategorie", data.category],
    ["Sprache", data.locale],
  ];

  return `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1b1512;">
      <h1 style="font-size: 20px; color: #815b10; margin-bottom: 16px;">Neue Kontaktanfrage — Sveta Loza</h1>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: bold; vertical-align: top; white-space: nowrap;">${escapeHtml(
              label
            )}</td>
            <td style="padding: 6px 0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="font-weight: bold; margin-bottom: 4px;">Nachricht</p>
      <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
    </div>
  `;
}
