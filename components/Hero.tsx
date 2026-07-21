'use client'

import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import type { MouseEvent } from 'react'
import { ArrowDownRight } from 'lucide-react'
import EmailSignup from './EmailSignup'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.15 + i * 0.12 },
  }),
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 22 })

  function handleImageMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    rotateYValue.set((x - 0.5) * 5)
    rotateXValue.set((0.5 - y) * 5)
  }

  function resetImagePosition() {
    rotateXValue.set(0)
    rotateYValue.set(0)
  }

  return (
    <section
      id="top"
      className="hero-glow relative min-h-dvh overflow-hidden text-[#f7f0e6]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url(/images/logo.svg)', backgroundPosition: '85% 45%', backgroundRepeat: 'no-repeat', backgroundSize: '900px auto' }} aria-hidden="true" />

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between border-b border-white/10 px-5 py-3 sm:px-8 sm:py-5 lg:px-12 lg:py-6"
      >
        <a href="#top" aria-label="Pure Caffeine home" className="flex min-h-11 items-center">
          <Image
            src="/images/pure-caffeine-logo-transparent.png"
            alt="Pure Caffeine"
            width={1012}
            height={216}
            priority
            className="h-auto w-[145px] min-[380px]:w-[170px] sm:w-[220px] lg:w-[240px]"
          />
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          <a href="#discover" className="eyebrow text-white/60 transition-colors hover:text-white">The Collection</a>
          <a href="#expect" className="eyebrow text-white/60 transition-colors hover:text-white">Our Approach</a>
        </nav>
        <a href="#notify" className="eyebrow flex min-h-11 items-center border-b border-gold/70 text-[#e5c18f] transition-colors hover:text-white">
          <span className="sm:hidden">Join</span>
          <span className="hidden sm:inline">Join the list</span>
        </a>
      </motion.header>

      <nav
        aria-label="Mobile navigation"
        className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-center gap-8 border-b border-white/10 px-4 lg:hidden"
      >
        <a href="#discover" className="eyebrow flex min-h-11 items-center text-white/55 transition-colors hover:text-white">
          Collection
        </a>
        <a href="#expect" className="eyebrow flex min-h-11 items-center text-white/55 transition-colors hover:text-white">
          Our approach
        </a>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-14 px-5 py-14 sm:px-8 md:py-20 lg:min-h-[calc(100dvh-94px)] lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:py-16">
        <div className="max-w-2xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="eyebrow block text-[#d8aa6a]"
          >
            Coffee · Tea · Ritual
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 font-serif text-[clamp(2.9rem,14vw,7.3rem)] leading-[0.89] tracking-[-0.035em] text-balance text-white"
          >
            Purity Meets,
            <br /><span className="italic text-[#d8aa6a]">Caffeine.</span>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="gold-rule mt-9 h-px w-32"
            aria-hidden="true"
          />

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-lg text-[17px] leading-8 text-white/62 md:text-[19px]"
          >
            Rare origins. Patient craft. A modern house of coffee and tea,
            created for those who find luxury in the pause.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10"
          >
            <EmailSignup />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-[520px] lg:justify-self-end"
        >
          <div className="absolute -inset-2 translate-x-2 translate-y-3 border border-gold/25 sm:-inset-3 sm:translate-x-5 sm:translate-y-5" aria-hidden="true" />
          <motion.div
            onMouseMove={handleImageMove}
            onMouseLeave={resetImagePosition}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.012 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative aspect-[2/3] overflow-hidden rounded-[5px] bg-[#221710] shadow-[0_40px_100px_rgba(0,0,0,.48)] will-change-transform"
          >
            <Image
              src="/images/hero.png"
              alt="A ceramic coffee cup in a warm, refined interior beneath a framed Coming Soon artwork."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
              <div>
                <p className="eyebrow text-[#d8aa6a]">Pure Caffeine</p>
                <p className="mt-2 pr-3 font-serif text-xl text-white sm:text-2xl">Let&apos;s Vibe Together</p>
              </div>
              <ArrowDownRight className="h-7 w-7 text-white/70" strokeWidth={1.2} aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 text-center sm:gap-x-10">
          {['Origin', 'Purity', 'Craft', 'Source'].map((item) => (
            <span key={item} className="eyebrow whitespace-nowrap text-white/40">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
