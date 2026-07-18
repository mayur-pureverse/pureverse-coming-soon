'use client'

import { motion } from 'framer-motion'
import { Orbit, Leaf, HandHeart } from 'lucide-react'
import SectionTitle from './SectionTitle'

const features = [
  {
    icon: Orbit,
    title: 'Origin-led',
    description:
      'Every selection begins with place: its soil, altitude, season and the hands behind it.',
  },
  {
    icon: Leaf,
    title: 'Exacting craft',
    description:
      'Small lots. Precise craft. Uncompromised flavour from source to cup.',
  },
  {
    icon: HandHeart,
    title: 'Consciously held',
    description:
      'Long-term relationships and thoughtful packaging put care ahead of convenience.',
  },
]

export default function FeatureCards() {
  return (
    <section
      id="expect"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,var(--espresso)_0%,var(--espresso)_68%,#241710_100%)] pb-12 pt-24 text-[#f3eee5] md:pb-16 md:pt-36"
    >
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/8 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="The Pure Standard"
          title={<>Nothing added.<br /><span className="italic text-[#d7aa6c]">Nothing rushed.</span></>}
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-16 grid border-y border-white/12 md:grid-cols-3 md:divide-x md:divide-white/12">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.12 }}
                className="px-5 py-12 text-left md:px-10 md:py-14"
              >
                <span className="flex h-14 w-14 items-center justify-center border border-gold/35 text-[#d7aa6c]">
                  <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <p className="eyebrow mt-8 text-white/35">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-[27px] text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-xs text-[15px] leading-7 text-white/52">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
