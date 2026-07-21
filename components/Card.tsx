'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type CardProps = {
  image: string
  alt: string
  title: string
  description: string
  index?: number
}

export default function Card({ image, alt, title, description, index = 0 }: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group flex min-w-0 flex-col border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary-bg sm:aspect-[4/5]">
        <Image
          src={image || '/placeholder.svg'}
          alt={alt}
          fill
          sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1024px) 50vw, 36vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
      </div>
      <div className="px-6 pb-7 pt-7">
        <h3 className="font-serif text-[28px] text-foreground">{title}</h3>
        <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.article>
  )
}
