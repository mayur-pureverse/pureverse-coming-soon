'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ArrowRight, X } from 'lucide-react'
import Input from './Input'
import Button from './Button'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!showSuccess) return
    const timeout = window.setTimeout(() => setShowSuccess(false), 5000)
    return () => window.clearTimeout(timeout)
  }, [showSuccess])

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
      setShowSuccess(true)
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
    <>
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

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-[1100] w-[calc(100%-2rem)] max-w-sm overflow-hidden border border-[#d7aa6c]/45 bg-[#f3eee5] text-espresso shadow-[0_24px_70px_rgba(12,8,6,.32)] sm:right-6 sm:top-6"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-4 p-5 pr-14">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-[#d7aa6c]">
                    <Check className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow text-accent">Registration confirmed</p>
                    <p className="mt-2 font-serif text-xl">You&apos;re on the list.</p>
                    <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                      Check your inbox for a confirmation from Pure Caffeine.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  aria-label="Dismiss confirmation"
                  className="absolute right-2 top-2 flex h-11 w-11 cursor-pointer items-center justify-center text-espresso/45 transition-colors hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-1 origin-left bg-[#d7aa6c]"
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
