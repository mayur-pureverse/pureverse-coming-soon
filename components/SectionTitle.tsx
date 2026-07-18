'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SectionTitleProps = {
  label?: string
  title: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionTitle({
  label,
  title,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(align === 'center' && 'text-center', className)}
    >
      {label && (
        <span className="mb-5 block text-[13px] font-medium uppercase tracking-[0.28em] text-accent">
          {label}
        </span>
      )}
      <h2 className="font-serif text-[clamp(2.7rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-balance text-inherit">
        {title}
      </h2>
    </motion.div>
  )
}
