type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
}

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function smtpConfig(prefix: 'ADMIN' | 'CUSTOMER'): SmtpConfig {
  const port = Number(required(`${prefix}_SMTP_PORT`))
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`${prefix}_SMTP_PORT must be a valid port number`)
  }

  return {
    host: required(`${prefix}_SMTP_HOST`),
    port,
    secure: process.env[`${prefix}_SMTP_SECURE`] === 'true',
    user: required(`${prefix}_SMTP_USER`),
    pass: required(`${prefix}_SMTP_PASS`),
  }
}

export function getEmailConfig() {
  return {
    adminSmtp: smtpConfig('ADMIN'),
    customerSmtp: smtpConfig('CUSTOMER'),
    adminNotificationEmail: required('ADMIN_NOTIFICATION_EMAIL'),
    allowedOrigin: process.env.ALLOWED_ORIGIN ?? '',
  }
}
