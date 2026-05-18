'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroVideoLoop from './HeroVideoLoop'
import SocialLinks from './SocialLinks'

// Striker's POV — penalty box, D arc, corner arcs, halfway line
function PitchLines({ faint = false }: { faint?: boolean }) {
  const o = faint ? 0.55 : 1
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {/* Penalty box — the striker's landmark */}
      <rect
        x="820" y="148" width="620" height="604"
        stroke="white" strokeWidth="1.5" opacity={0.15 * o}
      />
      {/* 6-yard box */}
      <rect
        x="1105" y="288" width="335" height="324"
        stroke="white" strokeWidth="1.5" opacity={0.13 * o}
      />
      {/* Penalty arc — the D */}
      <path
        d="M 790 262 A 170 170 0 0 1 790 638"
        stroke="white" strokeWidth="1.5" opacity={0.13 * o}
      />
      {/* Penalty spot */}
      <circle cx="920" cy="450" r="6" fill="white" opacity={0.2 * o} />
      {/* Penalty spot glow */}
      <circle cx="920" cy="450" r="28" fill="white" opacity={0.025 * o} />
      {/* Halfway line (left edge visible) */}
      <line
        x1="80" y1="0" x2="80" y2="900"
        stroke="white" strokeWidth="1.5" opacity={0.08 * o}
      />
      {/* Center circle partial */}
      <circle
        cx="80" cy="450" r="210"
        stroke="white" strokeWidth="1.5" opacity={0.08 * o}
      />
      {/* Center spot */}
      <circle cx="80" cy="450" r="5" fill="white" opacity={0.1 * o} />
      {/* Touchlines */}
      <line x1="820" y1="148" x2="1440" y2="148" stroke="white" strokeWidth="1.5" opacity={0.1 * o} />
      <line x1="820" y1="752" x2="1440" y2="752" stroke="white" strokeWidth="1.5" opacity={0.1 * o} />
      {/* Top-right corner arc */}
      <path d="M 1440 0 A 60 60 0 0 0 1380 60" stroke="white" strokeWidth="1.5" opacity={0.12 * o} />
      {/* Bottom-right corner arc */}
      <path d="M 1440 900 A 60 60 0 0 1 1380 840" stroke="white" strokeWidth="1.5" opacity={0.12 * o} />
    </svg>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const pitchRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const videoSlotRef = useRef<HTMLDivElement>(null)
  const lightLineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Pitch lines fade in — stadium lights coming on
      gsap.from(pitchRef.current, {
        opacity: 0,
        duration: 2.4,
        ease: 'power1.out',
        delay: 0,
      })

      // Video slot fades
      gsap.from(videoSlotRef.current, {
        opacity: 0,
        duration: 1.8,
        ease: 'power1.out',
        delay: 0.05,
      })

      // Name fires from the right — el disparo
      gsap.from(nameRef.current, {
        x: 300,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        delay: 0.3,
      })

      gsap.from(subRef.current, {
        y: 14,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        delay: 1.05,
      })

      gsap.from(Array.from(statsRef.current?.children ?? []), {
        y: 22,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1.1,
      })

      gsap.from(ctaRef.current, {
        x: -24,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 1.5,
      })

      // Flip counter
      const counter = { val: 0 }
      gsap.to(counter, {
        val: 14,
        duration: 2.1,
        delay: 1.15,
        ease: 'power3.out',
        snap: { val: 1 },
        onUpdate() {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.round(counter.val))
        },
      })

      // Scroll collapse — vídeo → línea de luz
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=460',
        scrub: 1.3,
        onUpdate(self) {
          const p = self.progress
          gsap.set(videoSlotRef.current, {
            scaleY: gsap.utils.interpolate(1, 0.002, p),
            opacity: gsap.utils.interpolate(1, 0, Math.min(p * 1.7, 1)),
            transformOrigin: 'top center',
          })
          gsap.set(lightLineRef.current, {
            scaleX: gsap.utils.interpolate(0, 1, p),
            opacity: gsap.utils.interpolate(0, 1, p),
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] bg-ink overflow-hidden"
    >
      {/* ── Full-bleed video background ── */}
      <div ref={videoSlotRef} className="absolute inset-0 overflow-hidden">
        <HeroVideoLoop />
      </div>

      {/* ── Darkening layers ── */}
      <div className="absolute inset-0 bg-ink/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/15 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />

      {/* ── Pitch markings on top of video ── */}
      <div ref={pitchRef} className="absolute inset-0 pointer-events-none">
        <PitchLines />
      </div>

      {/* ── Collapse line of light ── */}
      <div
        ref={lightLineRef}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-20"
        style={{ backgroundColor: 'var(--accent)', transform: 'scaleX(0)', opacity: 0 }}
      />

      {/* ── Content ── */}
      <div className="absolute bottom-0 left-0 z-10 w-full md:w-[62%] px-5 md:px-14 lg:px-20 pb-8 md:pb-16">

        {/* Name */}
        <div ref={nameRef} className="mb-3">
          <h1 className="font-display uppercase leading-none">
            <span className="block text-zinc-400"
              style={{ fontSize: 'clamp(2rem, 8vw, 8.5rem)', letterSpacing: '-0.01em' }}>
              ALEX
            </span>
            <span className="block text-white"
              style={{ fontSize: 'clamp(3rem, 12vw, 13rem)', letterSpacing: '-0.02em', lineHeight: 0.85 }}>
              RUBIO
            </span>
          </h1>
        </div>

        {/* Position tag */}
        <p ref={subRef} className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="font-mono text-[0.62rem] tracking-[0.25em] uppercase"
            style={{ color: 'var(--accent)' }}>
            Delantero
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-zinc-500">
            Albacete BP
          </span>
        </p>

        {/* Próximo partido */}
        <div ref={statsRef} className="mb-8 md:mb-10">
          <p className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-zinc-600 mb-4">
            Próximo partido
          </p>
          <div className="flex items-center gap-5 mb-3">
            {/* Albacete badge — local */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 relative">
                <Image src="/albacetepng.png" alt="Albacete BP" fill className="object-contain" sizes="48px" />
              </div>
              <span className="font-mono text-[0.44rem] tracking-[0.12em] uppercase text-zinc-500">Albacete</span>
            </div>
            {/* Centre */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-white tabular"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1 }}>
                18:30
              </span>
              <span className="font-mono text-[0.44rem] tracking-[0.15em] uppercase text-zinc-600">vs</span>
            </div>
            {/* Real Sociedad B badge — visitante */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 relative">
                <Image src="/realsociedad.png" alt="Real Sociedad B" fill className="object-contain" sizes="48px" />
              </div>
              <span className="font-mono text-[0.44rem] tracking-[0.12em] uppercase text-zinc-500">R. Sociedad B</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase"
              style={{ color: 'var(--accent)' }}>
              Dom 24 May
            </span>
            <span className="w-px h-3 bg-zinc-700 flex-shrink-0" />
            <span className="font-mono text-[0.48rem] tracking-[0.15em] uppercase text-zinc-600">
              Carlos Belmonte · Albacete
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={() => document.getElementById('trayectoria')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-4"
        >
          <div className="cta-streak h-px transition-all duration-300 ease-out"
            style={{ width: 28, backgroundColor: 'var(--accent)' }} />
          <span className="cta-label font-mono text-[0.68rem] tracking-[0.28em] uppercase transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            Ver trayectoria
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="transition-transform duration-200 ease-out group-hover:translate-x-2"
            style={{ color: 'var(--accent)' }}>
            <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Social links — right edge */}
      <div className="absolute right-5 md:right-8 bottom-10 md:bottom-14 z-10 flex flex-col items-center gap-4">
        <div className="w-px h-10 bg-zinc-700/60" />
        <SocialLinks className="flex-col" />
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-800/60 z-10" />
    </section>
  )
}
