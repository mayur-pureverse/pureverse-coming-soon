import Image from 'next/image'
import { Mail } from 'lucide-react'

// Brand marks are not part of this lucide build, so use simple inline SVGs.
function Instagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  )
}

function Pinterest({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 20c-.4-1.3-.2-2.9.2-4.3l1.4-6" />
      <path d="M8.2 9.2C8 8.6 8 7.9 8.2 7.2 8.8 5 11 3.8 13.4 4.2c2.5.4 4.2 2.4 4 4.9-.2 2.8-1.9 4.9-4.2 4.8-1.2 0-2.1-1-1.8-2.2.3-1.4 1-2.2.8-3.3-.2-1.6-2.4-1.4-2.8.8Z" />
    </svg>
  )
}

const socials = [
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'Pinterest', href: '#', Icon: Pinterest },
  { label: 'Email', href: 'mailto:hello@purecaffeine.co', Icon: Mail },
]

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-[#241710] text-[#f0ebe0]"
    >
      <div className="mx-auto max-w-[1320px] px-5 pb-9 pt-12 sm:px-8 md:pt-16 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="eyebrow text-gold">Stay close</p>
            <p className="mt-5 max-w-xl font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[0.98]">
              Your next ritual is <span className="italic text-[#d7aa6c]">taking shape.</span>
            </p>
          </div>
          <div className="flex flex-col justify-end md:items-end">
            <a href="#notify" className="inline-flex min-h-12 items-center border-b border-gold/60 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e2bd89] transition-colors hover:text-white">
              Request early access
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-8 pt-9 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="#top" aria-label="Pure Caffeine home" className="inline-flex min-h-11 items-center">
              <Image
                src="/images/pure-caffeine-logo-transparent.png"
                alt="Pure Caffeine"
                width={1012}
                height={216}
                className="h-auto w-[220px] sm:w-[270px]"
              />
            </a>
            <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/35">© 2026 · Crafted with intention</p>
          </div>
          <ul className="flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/55 transition-colors duration-200 hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
