'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { label: 'Goles',                              value: '0.38', percentile: 59.6 },
  { label: 'Goles esperados (xG)',               value: '0.49', percentile: 78.7 },
  { label: 'Tiros',                              value: '4.16', percentile: 96.6 },
  { label: 'Tiros a puerta',                     value: '1.23', percentile: 76.4 },
  { label: 'Oportunidades creadas',              value: '1.04', percentile: 65.2 },
  { label: 'Posesión ganada (tercio ofensivo)',  value: '0.57', percentile: 51.7 },
]

const BN_IMAGES = [
  '/Stats/AlexRubioBN.jpg',
  '/Stats/AlexRubioBN2.jpg',
  '/Stats/AlexRubioBN3.jpg',
  '/Stats/AlexRubioBN4.jpg',
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const barsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      if (!barsRef.current) return
      const bars = barsRef.current.querySelectorAll<HTMLElement>('.bar-player')

      gsap.from(bars, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: barsRef.current, start: 'top 78%' },
      })

      gsap.from('.stats-monument', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative bg-[#f4f0e8] text-zinc-900 py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-zinc-400" />
          <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
            Estadísticas LaLiga2 25/26 · por 90' · Fuente FotMob
          </span>
        </div>

        {/* Asymmetric layout: images left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-24">

          {/* Images — B&W film grain */}
          <div className="grid grid-cols-2 gap-3 items-start">
            <div className="film-grain relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src={BN_IMAGES[0]}
                alt="Álex Rubio — concentración"
                fill className="object-cover object-top grayscale"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            <div className="mt-10 space-y-3">
              <div className="film-grain relative aspect-square rounded-sm overflow-hidden">
                <Image
                  src={BN_IMAGES[1]}
                  alt="Álex Rubio — calentamiento"
                  fill className="object-cover object-top grayscale"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <div className="film-grain relative aspect-square rounded-sm overflow-hidden">
                <Image
                  src={BN_IMAGES[2]}
                  alt="Álex Rubio — botas"
                  fill className="object-cover grayscale"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            {/* Monument numbers — 3 best percentiles */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-16">
              {[
                { num: '4.16', label: 'Tiros / 90\'',       sub: 'Percentil 97' },
                { num: '0.49', label: 'xG / 90\'',           sub: 'Percentil 79' },
                { num: '1.23', label: 'Tiros a puerta / 90\'', sub: 'Percentil 76' },
              ].map(({ num, label, sub }) => (
                <div key={label} className="stats-monument">
                  <div
                    className="font-display leading-none text-zinc-900 tabular"
                    style={{ fontSize: 'clamp(1.6rem, 4.5vw, 4.5rem)' }}
                  >
                    {num}
                  </div>
                  <p className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-zinc-500 mt-1.5">
                    {label}
                  </p>
                  <p className="font-mono text-[0.48rem] tracking-[0.15em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Percentile bars */}
            <div ref={barsRef} className="space-y-6 mb-16">
              {STATS.map((stat) => {
                const top = (100 - stat.percentile).toFixed(1)
                return (
                  <div key={stat.label}>
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-zinc-500">
                        {stat.label}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-lg text-zinc-900 tabular">{stat.value}</span>
                        <span className="font-mono text-[0.48rem] tracking-[0.15em] uppercase text-zinc-400">/ 90'</span>
                      </div>
                    </div>

                    {/* Percentile bar */}
                    <div className="h-[3px] bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className="bar-player h-full rounded-full"
                        style={{ width: `${stat.percentile}%`, backgroundColor: 'var(--accent)' }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-mono text-[0.48rem] tracking-[0.15em] uppercase text-zinc-400">
                        Percentil
                      </span>
                      <span className="font-mono text-[0.52rem] tracking-[0.15em] uppercase" style={{ color: 'var(--accent)' }}>
                        Top {top}% · {stat.percentile}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
