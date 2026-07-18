'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'ghost'
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'inline-flex h-[54px] cursor-pointer items-center justify-center gap-3 rounded-none px-7 text-[12px] font-semibold uppercase tracking-[0.16em]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variant === 'primary' &&
          'bg-[#d1a05f] text-espresso shadow-soft transition-colors duration-250 hover:bg-[#e2b877]',
        variant === 'ghost' &&
          'border border-border bg-transparent text-foreground transition-colors duration-250 hover:bg-secondary-bg',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
