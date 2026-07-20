'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['Tea', 'Coffee', 'Pure Caffeine']

export default function LaunchLoader() {
  const [visible, setVisible] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (reducedMotion) {
      const finish = window.setTimeout(() => setVisible(false), 250)
      return () => {
        window.clearTimeout(finish)
        document.body.style.overflow = previousOverflow
      }
    }

    const coffee = window.setTimeout(() => setWordIndex(1), 720)
    const pureCaffeine = window.setTimeout(() => setWordIndex(2), 1440)
    const finish = window.setTimeout(() => setVisible(false), 2360)

    return () => {
      window.clearTimeout(coffee)
      window.clearTimeout(pureCaffeine)
      window.clearTimeout(finish)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="launch-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-115%',
            borderBottomLeftRadius: '50%',
            borderBottomRightRadius: '50%',
          }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex min-h-dvh flex-col overflow-hidden bg-espresso text-[#f3eee5]"
          role="status"
          aria-live="polite"
          aria-label={`Loading Pure Caffeine: ${words[wordIndex]}`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(189,138,75,.18), transparent 32%), linear-gradient(135deg, #211610, #0f0a08 62%, #2d1f18)',
            }}
          />
          <motion.div
            initial={{ scale: 0.82, x: '-15%', y: '12%' }}
            animate={{ scale: 1.08, x: '8%', y: '-6%' }}
            transition={{ duration: 2.8, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-none absolute -bottom-[35vw] left-1/2 h-[70vw] w-[70vw] max-h-[850px] max-w-[850px] -translate-x-1/2 rounded-full bg-[#d7aa6c]/8 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-6 sm:px-10">
            <span className="eyebrow text-[#d7aa6c]">Pure Caffeine</span>
            <span className="font-serif text-sm italic text-white/45">
              A considered beginning
            </span>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-6">
            <div
              className="absolute h-[min(68vw,520px)] w-[min(68vw,520px)] rounded-full border border-[#d7aa6c]/20"
              aria-hidden="true"
            />
            <div
              className="absolute h-[min(48vw,360px)] w-[min(48vw,360px)] rounded-full border border-white/8"
              aria-hidden="true"
            />

            <AnimatePresence mode="sync" initial={false}>
              <motion.p
                key={words[wordIndex]}
                initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -42, filter: 'blur(5px)' }}
                transition={{
                  duration: 0.36,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 0.24 },
                }}
                className={`absolute font-serif leading-[0.88] tracking-[-0.06em] ${
                  wordIndex === 2
                    ? 'whitespace-nowrap text-[clamp(3.2rem,10.5vw,9.5rem)]'
                    : 'text-[clamp(4.5rem,14vw,12rem)]'
                }`}
              >
                {words[wordIndex]}
                <span className="text-[#d7aa6c]">.</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative px-6 pb-8 sm:px-10 sm:pb-10">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow text-white/35">
                Tea · Coffee · Pure Caffeine
              </span>
              <span className="font-serif text-sm tabular-nums text-[#d7aa6c]">
                0{wordIndex + 1} / 03
              </span>
            </div>
            <div className="h-px overflow-hidden bg-white/12">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.3, ease: [0.65, 0, 0.35, 1] }}
                className="h-full origin-left bg-[#d7aa6c]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
