'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Card from './Card'

const cards = [
  {
    image: '/images/premium-coffee.png',
    alt: 'Freshly roasted coffee beans in a wooden scoop.',
    title: 'Rare Coffee',
    description: 'Single-origin lots and precise blends, roasted to reveal their singular character.',
  },
  {
    image: '/images/specialty-tea.png',
    alt: 'Loose leaf tea and a refined ceramic tea service.',
    title: 'Premium Tea',
    description: 'Origin-led teas, chosen at the peak of every harvest.',
  },
]

export default function Discover() {
  return (
    <section id="discover" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 flex items-end justify-between border-b border-border pb-7 md:mb-20">
          <span className="eyebrow text-accent">The Collection</span>
          <span className="font-serif text-lg italic text-muted-foreground">Two Harvests. One Legacy.</span>
        </div>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.55fr)] lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[0.98] tracking-[-0.025em] text-balance text-foreground">
              Sourced by
              <br /><span className="italic text-accent">provenance,</span>
              <br />not trend.
            </p>
            <p className="mt-8 max-w-sm text-[17px] leading-8 text-muted-foreground">
              We follow flavour back to its source—partnering with careful growers,
              selecting expressive harvests, and letting each origin speak clearly.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="font-serif text-4xl text-accent">More</span>
              <span className="eyebrow max-w-28 leading-5 text-muted-foreground">Origins under consideration</span>
            </div>
            
            <a
              href="#expect"
              className="group mt-10 inline-flex min-h-11 items-center gap-3 border-b border-accent/50 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-accent-dark"
            >
              Our standards
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Right */}
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0">
            {cards.map((card, i) => (
              <div key={card.title} className="snap-start">
                <Card index={i} {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
