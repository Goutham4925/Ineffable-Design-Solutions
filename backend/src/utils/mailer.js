const RESEND_API = "https://api.resend.com/emails";

/**
 * Send contact form notification via Resend HTTP API.
 * Uses HTTPS — works on Vercel/Lambda (SMTP is blocked there).
 *
 * SETUP:
 *  1. Sign up at resend.com → get API key
 *  2. Add RESEND_API_KEY to Vercel environment variables
 *  3. NOTIFY_EMAILS = comma-separated recipient list
 *
 * FROM address:
 *  - Before domain verified: use "onboarding@resend.dev" (delivers to your Resend account email only)
 *  - After domain verified: use "enquiry@ineffabledesignsolutions.com"
 *
 * @param {{ name, email, phone, subject, message }} data
 */
async function sendContactNotification(data) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY env var not set in Vercel project settings");

  const recipients = (process.env.NOTIFY_EMAILS || "enquiry@ineffabledesignsolutions.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  // Switch from address after domain is verified in Resend dashboard:
  // Verified:   "Ineffable Design Solutions <enquiry@ineffabledesignsolutions.com>"
  // Testing:    "onboarding@resend.dev"
  const fromAddress = process.env.RESEND_FROM || "Ineffable Design Solutions <enquiry@ineffabledesignsolutions.com>";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0b0b;font-family:'DM Sans',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-bottom:1px solid #242424;padding-bottom:20px;">
                    <span style="display:inline-block;width:28px;height:1px;background:#2db8a2;vertical-align:middle;margin-right:10px;"></span>
                    <span style="font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#2db8a2;vertical-align:middle;">Ineffable Design Solutions</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:32px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:36px;font-weight:400;color:#ede8e1;line-height:1;letter-spacing:-0.02em;">New Enquiry</h1>
              <p style="margin:10px 0 0;font-size:12px;color:#666;letter-spacing:0.05em;">A message was submitted via the contact form</p>
            </td>
          </tr>

          <tr>
            <td style="background:#111;border:1px solid #242424;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Name</p>
                    <p style="margin:0;font-size:17px;color:#ede8e1;font-family:Georgia,serif;font-weight:400;">${data.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Email</p>
                    <p style="margin:0;"><a href="mailto:${data.email}" style="font-size:15px;color:#2db8a2;text-decoration:none;">${data.email}</a></p>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Phone</p>
                    <p style="margin:0;font-size:15px;color:#ede8e1;">${data.phone}</p>
                  </td>
                </tr>` : ""}
                ${data.subject ? `
                <tr>
                  <td style="padding:20px 28px;border-bottom:1px solid #1c1c1c;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Subject</p>
                    <p style="margin:0;font-size:15px;color:#ede8e1;">${data.subject}</p>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:20px 28px;">
                    <p style="margin:0 0 10px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;font-weight:500;">Message</p>
                    <p style="margin:0;font-size:14px;color:#aaa;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:24px;">
              <a href="mailto:${data.email}"
                 style="display:inline-block;padding:14px 28px;background:#2db8a2;color:#0b0b0b;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                Reply to ${data.name}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-top:40px;border-top:1px solid #1c1c1c;margin-top:40px;">
              <p style="margin:20px 0 0;font-size:11px;color:#444;letter-spacing:0.08em;">
                © Ineffable Design Solutions &nbsp;·&nbsp; enquiry@ineffabledesignsolutions.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: recipients,
      reply_to: data.email,
      subject: `New Message from ${data.name} — Ineffable`,
      html,
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(result)}`);
  console.log("[mailer] sent OK → id:", result.id, "| to:", recipients.join(", "));
}

module.exports = { sendContactNotification };
