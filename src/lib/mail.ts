import nodemailer from "nodemailer";

export function hasSmtpEnv() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  const host = process.env.SMTP_HOST ?? "";
  // Gmail's SMTP is picky about manual host/port/secure combinations — nodemailer's
  // built-in "gmail" service preset pins the right host/port/TLS mode internally.
  if (host.includes("gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        // Gmail app passwords display as "abcd efgh ijkl mnop" — strip spaces
        // in case they were pasted in verbatim.
        pass: process.env.SMTP_PASS?.replace(/\s+/g, ""),
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS?.replace(/\s+/g, ""),
    },
  });
}

interface ContactMail {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

// Best-effort notification — the submission is already saved to the DB before
// this is called, so a failed send should never surface as a failure to the
// person submitting the form. Errors are logged server-side, not swallowed.
export async function sendContactNotification(data: ContactMail): Promise<boolean> {
  if (!hasSmtpEnv()) {
    console.error("[mailer] skipped — SMTP_HOST/SMTP_USER/SMTP_PASS not fully set");
    return false;
  }

  const recipients = process.env.NOTIFY_EMAILS || process.env.ENQUIRY_TO_EMAIL || process.env.SMTP_USER;

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Ineffable Design Solutions" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: data.email,
      subject: `New Message from ${data.name} — Ineffable`,
      html: buildHtml(data),
    });
    console.log("[mailer/smtp] sent → id:", info.messageId, "| to:", recipients);
    return true;
  } catch (error) {
    console.error("[mailer] failed to send notification:", error instanceof Error ? error.message : error);
    return false;
  }
}

function buildHtml(data: ContactMail) {
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
