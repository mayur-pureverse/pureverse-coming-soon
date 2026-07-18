'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
        className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between border-b border-white/10 px-5 py-6 sm:px-8 lg:px-12"
      >
        <a href="#top" aria-label="Pure Caffeine home" className="flex min-h-11 items-center">
          <Image
            src="/images/pure-caffeine-logo-transparent.png"
            alt="Pure Caffeine"
            width={1012}
            height={216}
            priority
            className="h-auto w-[190px] sm:w-[240px]"
          />
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          <a href="#discover" className="eyebrow text-white/60 transition-colors hover:text-white">The Collection</a>
          <a href="#expect" className="eyebrow text-white/60 transition-colors hover:text-white">Our Approach</a>
        </nav>
        <a href="#notify" className="eyebrow flex min-h-11 items-center border-b border-gold/70 text-[#e5c18f] transition-colors hover:text-white">
          Join the list
        </a>
      </motion.header>

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
            className="mt-7 font-serif text-[clamp(3.4rem,7vw,7.3rem)] leading-[0.89] tracking-[-0.035em] text-balance text-white"
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
          className="relative mx-auto w-full max-w-[560px] lg:justify-self-end"
        >
          <div className="absolute -inset-3 translate-x-5 translate-y-5 border border-gold/25" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden bg-[#221710] shadow-[0_40px_100px_rgba(0,0,0,.48)]">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90"
              alt="Artisan coffee being poured into a ceramic cup."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
              <div>
                <p className="eyebrow text-[#d8aa6a]">Pure Caffeine</p>
                <p className="mt-2 font-serif text-2xl text-white">Let's Vibe Together</p>
              </div>
              <ArrowDownRight className="h-7 w-7 text-white/70" strokeWidth={1.2} aria-hidden="true" />
            </div>
          </div>
          <div className="absolute -left-5 top-8 hidden bg-[#f3eee5] px-4 py-3 text-espresso shadow-lift sm:block">
            <p className="eyebrow">We are Launching</p>
            <p className="mt-1 font-serif text-lg italic">Something Special</p>
          </div>
        </motion.div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-[1320px] items-center justify-center gap-5 overflow-hidden px-5 text-center sm:gap-10">
          {['Single origin', 'Whole leaf', 'Small batch', 'Directly sourced'].map((item) => (
            <span key={item} className="eyebrow whitespace-nowrap text-white/40">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
