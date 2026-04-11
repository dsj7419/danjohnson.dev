import type { ContactFormData } from '@/lib/schemas/contact'

type ContactEmail = {
  subject: string
  html: string
  text: string
}

export function buildContactEmail(data: ContactFormData): ContactEmail {
  const subject = `New inquiry from ${data.name} via danjohnson.dev`

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || 'Not provided'}`,
    `How they found you: ${data.referralSource || 'Not provided'}`,
    '',
    'Project Description:',
    data.message,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, -apple-system, sans-serif; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="border-top: 3px solid #6366f1; padding-top: 24px;">
    <h2 style="margin: 0 0 24px; font-size: 18px; font-weight: 600;">New inquiry from ${escapeHtml(data.name)}</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 12px; font-size: 13px; color: #666; width: 140px; vertical-align: top;">Name</td>
        <td style="padding: 8px 12px; font-size: 14px;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; font-size: 13px; color: #666; vertical-align: top;">Email</td>
        <td style="padding: 8px 12px; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #6366f1;">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; font-size: 13px; color: #666; vertical-align: top;">Company</td>
        <td style="padding: 8px 12px; font-size: 14px;">${escapeHtml(data.company || 'Not provided')}</td>
      </tr>
      <tr>
        <td style="padding: 8px 12px; font-size: 13px; color: #666; vertical-align: top;">Found via</td>
        <td style="padding: 8px 12px; font-size: 14px;">${escapeHtml(data.referralSource || 'Not provided')}</td>
      </tr>
    </table>
    <div style="border-top: 1px solid #e5e5e5; padding-top: 16px;">
      <p style="font-size: 13px; color: #666; margin: 0 0 8px;">Project Description</p>
      <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${escapeHtml(data.message)}</p>
    </div>
    <p style="margin-top: 32px; font-size: 12px; color: #999;">Sent via danjohnson.dev contact form</p>
  </div>
</body>
</html>`

  return { subject, html, text }
}

export function buildConfirmationEmail(data: ContactFormData): ContactEmail {
  const subject = 'Thanks for reaching out — Dan Johnson'

  const text = [
    `Hi ${data.name},`,
    '',
    'Thank you for getting in touch. I received your message and will review your project details soon.',
    '',
    "Here's a copy of what you sent:",
    '',
    '---',
    data.message,
    '---',
    '',
    'If you need to add anything, just reply to this email.',
    '',
    'Dan Johnson',
    'danjohnson.dev',
  ].join('\n')

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, -apple-system, sans-serif; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="border-top: 3px solid #6366f1; padding-top: 24px;">
    <p style="font-size: 15px; line-height: 1.7; margin: 0 0 20px;">Hi ${escapeHtml(data.name)},</p>
    <p style="font-size: 15px; line-height: 1.7; margin: 0 0 20px;">Thank you for getting in touch. I received your message and will review your project details soon.</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin: 0 0 12px;">Your message</p>
      <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0; color: #333;">${escapeHtml(data.message)}</p>
    </div>
    <p style="font-size: 15px; line-height: 1.7; margin: 0 0 20px;">If you need to add anything, just reply to this email.</p>
    <div style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 32px;">
      <p style="font-size: 14px; font-weight: 600; margin: 0;">Dan Johnson</p>
      <p style="font-size: 13px; color: #666; margin: 4px 0 0;"><a href="https://danjohnson.dev" style="color: #6366f1; text-decoration: none;">danjohnson.dev</a></p>
    </div>
  </div>
</body>
</html>`

  return { subject, html, text }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
