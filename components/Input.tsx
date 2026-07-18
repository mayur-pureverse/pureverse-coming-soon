import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-[54px] w-full rounded-none border border-border bg-card px-5 text-[16px] text-foreground',
        'placeholder:text-muted-foreground/70',
        'transition-colors duration-250 outline-none',
        'focus:border-gold focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20',
        className,
      )}
      {...props}
    />
  )
})

export default Input
