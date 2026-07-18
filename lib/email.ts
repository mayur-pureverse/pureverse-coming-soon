import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { getEmailConfig } from './env'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function createTransport(config: ReturnType<typeof getEmailConfig>['adminSmtp']) {
  const options: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  }

  return nodemailer.createTransport(options)
}

export async function sendWaitlistEmails(email: string) {
  const config = getEmailConfig()
  const safeEmail = escapeHtml(email)
  const submittedAt = new Date().toISOString()

  const adminTransport = createTransport(config.adminSmtp)
  const customerTransport = createTransport(config.customerSmtp)

  try {
    await Promise.all([
      adminTransport.sendMail({
        from: `"Pure Caffeine Website" <${config.adminSmtp.user}>`,
        to: config.adminNotificationEmail,
        replyTo: email,
        subject: 'New Pure Caffeine early-access request',
        html: `
          <div style="background:#f3eee5;padding:32px;font-family:Arial,sans-serif;color:#19110d">
            <div style="max-width:560px;margin:auto;background:#fff;padding:32px;border:1px solid #d4c8b8">
              <p style="margin:0 0 8px;color:#9b652e;font-size:12px;letter-spacing:2px;text-transform:uppercase">New registration</p>
              <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px">Pure Caffeine early access</h1>
              <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
              <p style="margin:0;color:#685a50"><strong>Submitted:</strong> ${submittedAt}</p>
            </div>
          </div>
        `,
      }),
      customerTransport.sendMail({
        from: `"Pure Caffeine" <${config.customerSmtp.user}>`,
        to: email,
        subject: "You're on the Pure Caffeine early list",
        html: `
          <div style="background:#110c09;padding:40px 24px;font-family:Arial,sans-serif;color:#f3eee5">
            <div style="max-width:560px;margin:auto">
              <p style="margin:0 0 18px;color:#d7aa6c;font-size:12px;letter-spacing:3px;text-transform:uppercase">Pure Caffeine</p>
              <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:38px;font-weight:400">Welcome to the first pour.</h1>
              <p style="margin:0 0 28px;color:#d8cec2;font-size:16px;line-height:1.7">
                Thank you for joining our early list. Private previews, launch notes, and first access will arrive here.
              </p>
              <div style="height:1px;background:#5a4030;margin:28px 0"></div>
              <p style="margin:0;color:#9d8e82;font-size:12px;letter-spacing:1px">RARE COFFEE · PREMIUM TEA · PATIENT CRAFT</p>
            </div>
          </div>
        `,
      }),
    ])
  } finally {
    adminTransport.close()
    customerTransport.close()
  }
}
