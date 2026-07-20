import { NextRequest, NextResponse } from 'next/server'
import { sendWaitlistEmails } from '@/lib/email'

export const runtime = 'nodejs'
export const maxDuration = 30

const requests = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW = 15 * 60 * 1000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (requests.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW,
  )

  if (recent.length >= RATE_LIMIT) {
    requests.set(ip, recent)
    return true
  }

  recent.push(now)
  requests.set(ip, recent)
  return false
}

function originIsAllowed(request: NextRequest): boolean {
  const origin = request.headers.get('origin') ?? ''
  const host = request.headers.get('host') ?? ''
  const allowedOrigin = process.env.ALLOWED_ORIGIN?.replace(/\/$/, '') ?? ''

  if (!origin) return true

  try {
    const originHost = new URL(origin).host
    const configuredHost = allowedOrigin
      ? new URL(allowedOrigin).host
      : ''

    return originHost === host || originHost === configuredHost
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!originIsAllowed(request)) {
      return NextResponse.json({ error: 'Unauthorized request.' }, { status: 403 })
    }

    const ip = clientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      )
    }

    const body = (await request.json()) as {
      email?: unknown
      website?: unknown
    }

    if (typeof body.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }

    await sendWaitlistEmails(email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(
      'Waitlist submission failed:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return NextResponse.json(
      { error: 'We could not register you right now. Please try again.' },
      { status: 500 },
    )
  }
}
