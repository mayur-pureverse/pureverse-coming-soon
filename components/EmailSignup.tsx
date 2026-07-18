'use client'

import { useState, type FormEvent } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import Input from './Input'
import Button from './Button'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim() || isSubmitting) return
    const website = new FormData(e.currentTarget).get('website')

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          website: typeof website === 'string' ? website : '',
        }),
      })
      const result = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(result.error || 'Please try again.')
      }

      setSubmitted(true)
      setEmail('')
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not register you. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="notify" className="w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
        aria-label="Notify me when Pure Caffeine launches"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <label htmlFor="notify-email" className="sr-only">
          Email address
        </label>
        <Input
          id="notify-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          className="border-white/18 bg-white/6 text-white placeholder:text-white/40 sm:flex-1"
        />
        <Button type="submit" disabled={isSubmitting || submitted} className="sm:shrink-0 disabled:cursor-not-allowed disabled:opacity-60">
          {submitted ? (
            <>
              <Check className="h-[18px] w-[18px]" aria-hidden="true" />
              You&apos;re on the list
            </>
          ) : isSubmitting ? (
            'Joining...'
          ) : (
            <>
              Request access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>

      {error && (
        <p className="mt-3 text-[13px] text-red-300" role="alert">
          {error}
        </p>
      )}

      <p
        className="mt-4 flex items-center gap-2 text-[12px] tracking-wide text-white/45"
        role="status"
      >
        <span className="h-px w-5 bg-gold/60" aria-hidden="true" />
        {submitted
          ? 'Thank you — we will be in touch soon.'
          : 'Private previews, launch notes, and first access.'}
      </p>
    </div>
  )
}
