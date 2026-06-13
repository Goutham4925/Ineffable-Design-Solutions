const nodemailer = require("nodemailer");

/**
 * Dual transport:
 *   RESEND_API_KEY present  → Resend HTTP API  (works on Vercel/Lambda)
 *   RESEND_API_KEY absent   → Gmail SMTP        (works locally)
 *
 * Vercel env vars needed: RESEND_API_KEY, NOTIFY_EMAILS
 * Local .env needed:      SMTP_USER, SMTP_PASS, NOTIFY_EMAILS
 */
async function sendContactNotification(data) {
  if (process.env.RESEND_API_KEY) {
    return _sendViaResend(data);
  }
  return _sendViaSMTP(data);
}

/* ─────────────── RESEND (production / Vercel) ─────────────── */
async function _sendViaResend(data) {
  const recipients = (process.env.NOTIFY_EMAILS || "enquiry@ineffabledesignsolutions.com")
    .split(",").map((e) => e.trim()).filter(Boolean);

  const from = process.env.RESEND_FROM ||
    "Ineffable Design Solutions <enquiry@ineffabledesignsolutions.com>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: data.email,
      subject: `New Message from ${data.name} — Ineffable`,
      html: _buildHtml(data),
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(result)}`);
  console.log("[mailer/resend] sent → id:", result.id, "| to:", recipients.join(", "));
}

/* ─────────────── SMTP (local dev) ─────────────── */
async function _sendViaSMTP(data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS.replace(/\s+/g, ""),
    },
  });

  const recipients = process.env.NOTIFY_EMAILS || process.env.SMTP_USER;

  const info = await transporter.sendMail({
    from: `"Ineffable Design Solutions" <${process.env.SMTP_USER}>`,
    to: recipients,
    subject: `New Message from ${data.name} — Ineffable`,
    html: _buildHtml(data),
  });
  console.log("[mailer/smtp] sent → id:", info.messageId, "| to:", recipients);
}

/* ─────────────── shared HTML template ─────────────── */
function _buildHtml(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0b0b;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <tr><td style="padding-bottom:24px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="border-bottom:1px solid #242424;padding-bottom:20px;">
              <span style="display:inline-block;width:28px;height:1px;background:#2db8a2;vertical-align:middle;margin-right:10px;"></span>
              <span style="font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#2db8a2;vertical-align:middle;">Ineffable Design Solutions</span>
            </td>
          </tr></table>
        </td></tr>

        <tr><td style="padding-bottom:32px;">
          <h1 style="margin:0;font-family:Georgia,serif;font-size:36px;font-weight:400;color:#ede8e1;line-height:1;letter-spacing:-0.02em;">New Enquiry</h1>
          <p style="margin:10px 0 0;font-size:12px;color:#666;letter-spacing:0.05em;">Submitted via the contact form</p>
        </td></tr>

        <tr><td style="background:#111;border:1px solid #242424;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Name</p>
              <p style="margin:0;font-size:17px;color:#ede8e1;font-family:Georgia,serif;">${data.name}</p>
            </td></tr>
            <tr><td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Email</p>
              <p style="margin:0;"><a href="mailto:${data.email}" style="font-size:15px;color:#2db8a2;text-decoration:none;">${data.email}</a></p>
            </td></tr>
            ${data.phone ? `
            <tr><td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Phone</p>
              <p style="margin:0;font-size:15px;color:#ede8e1;">${data.phone}</p>
            </td></tr>` : ""}
            ${data.subject ? `
            <tr><td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Subject</p>
              <p style="margin:0;font-size:15px;color:#ede8e1;">${data.subject}</p>
            </td></tr>` : ""}
            <tr><td style="padding:20px 28px;">
              <p style="margin:0 0 10px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Message</p>
              <p style="margin:0;font-size:14px;color:#aaa;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding-top:24px;">
          <a href="mailto:${data.email}"
             style="display:inline-block;padding:14px 28px;background:#2db8a2;color:#0b0b0b;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            Reply to ${data.name}
          </a>
        </td></tr>

        <tr><td style="padding-top:40px;border-top:1px solid #1c1c1c;margin-top:40px;">
          <p style="margin:20px 0 0;font-size:11px;color:#444;letter-spacing:0.08em;">
            © Ineffable Design Solutions &nbsp;·&nbsp; enquiry@ineffabledesignsolutions.com
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

module.exports = { sendContactNotification };
