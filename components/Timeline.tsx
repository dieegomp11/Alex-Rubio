'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { TEAMS } from '@/lib/teams'
import { useTeamStore } from '@/lib/store'

export default function Timeline() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const teamRefs    = useRef<(HTMLDivElement | null)[]>([])
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const currentIdx  = useRef(-1)
  const rafId       = useRef<number>(0)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // ── Goal counter ────────────────────────────────────────────────
    const runCounter = (idx: number) => {
      const el = counterRefs.current[idx]
      if (!el) return
      gsap.killTweensOf(el)
      const obj = { val: 0 }
      gsap.to(obj, {
        val: TEAMS[idx].goals,
        duration: 1.4,
        ease: 'power3.out',
        snap: { val: 1 },
        onUpdate() { el.textContent = String(Math.round(obj.val)) },
        onComplete() {
          gsap.timeline()
            .to(el, { x: -3, duration: 0.05 })
            .to(el, { x:  3, duration: 0.05 })
            .to(el, { x: -2, duration: 0.05 })
            .to(el, { x:  2, duration: 0.05 })
            .to(el, { x:  0, duration: 0.05 })
        },
      })
    }

    // ── Transition ──────────────────────────────────────────────────
    const goTo = (newIdx: number) => {
      if (newIdx === currentIdx.current) return
      const oldIdx = currentIdx.current
      currentIdx.current = newIdx

      // Kill ALL running tweens first — prevents fast-scroll crash
      teamRefs.current.forEach(el => el && gsap.killTweensOf(el))

      // Instantly hide old (no animation on old — avoids queuing issues)
      if (oldIdx >= 0 && teamRefs.current[oldIdx]) {
        gsap.set(teamRefs.current[oldIdx], { opacity: 0, y: 0 })
      }

      // Fade new in
      const newEl = teamRefs.current[newIdx]
      if (newEl) {
        gsap.fromTo(newEl,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
        )
      }

      setActiveIdx(newIdx)
      useTeamStore.getState().setActiveTeam(TEAMS[newIdx])
      runCounter(newIdx)
    }

    // ── Scroll handler with rAF throttle ────────────────────────────
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const rect        = wrapper.getBoundingClientRect()
        const scrolledIn  = -rect.top          // px scrolled into wrapper
        const scrollRange = wrapper.offsetHeight - window.innerHeight

        if (scrolledIn < -2 || scrollRange <= 0) {
          // Above section — reset
          if (currentIdx.current >= 0) {
            teamRefs.current.forEach(el => el && gsap.killTweensOf(el))
            teamRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 0 }))
            currentIdx.current = -1
            setActiveIdx(0)
            useTeamStore.getState().setActiveTeam(TEAMS[3])
          }
          return
        }

        const progress = Math.min(Math.max(scrolledIn, 0) / scrollRange, 0.9999)
        const idx      = Math.floor(progress * TEAMS.length)
        goTo(idx)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // check position on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
      teamRefs.current.forEach(el => el && gsap.killTweensOf(el))
      counterRefs.current.forEach(el => el && gsap.killTweensOf(el))
    }
  }, [])

  return (
    <div ref={wrapperRef} id="trayectoria" style={{ height: `${TEAMS.length * 100}vh` }}>
      <div className="sticky top-0 min-h-[100dvh] bg-ink overflow-hidden flex flex-col">

        {/* ── Header ── */}
        <div className="flex-shrink-0 px-6 md:px-14 lg:px-20 pt-20 pb-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
              Trayectoria
            </span>
          </div>

          {/* Team indicators */}
          <div className="flex items-center mb-8 overflow-x-auto scrollbar-none pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            {TEAMS.map((t, i) => {
              const on = i === activeIdx
              return (
                <div key={t.id} className="flex items-center flex-shrink-0">
                  <div style={{ opacity: on ? 1 : 0.28, transition: 'opacity 0.3s' }}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <div
                        className="rounded-full transition-all duration-300 flex-shrink-0"
                        style={{
                          width: 6, height: 6,
                          backgroundColor: on ? t.timelineColor : '#3a3a3a',
                          transform: on ? 'scale(1.6)' : 'scale(1)',
                        }}
                      />
                      <span
                        className="font-display text-[0.7rem] md:text-xs tracking-[0.18em] uppercase whitespace-nowrap"
                        style={{ color: on ? t.timelineColor : '#444', transition: 'color 0.3s' }}
                      >
                        {t.shortName}
                      </span>
                    </div>
                    <p className="font-mono text-[0.44rem] tracking-[0.12em] text-zinc-700 pl-5 whitespace-nowrap">
                      {t.period}
                    </p>
                  </div>
                  {i < TEAMS.length - 1 && (
                    <div
                      className="mx-3 md:mx-5 h-px flex-shrink-0 transition-colors duration-500"
                      style={{
                        width: 32,
                        backgroundColor: i < activeIdx ? TEAMS[activeIdx].timelineColor : '#222',
                        opacity: 0.55,
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Content layers ── */}
        <div className="flex-1 relative overflow-hidden">
          {TEAMS.map((team, i) => (
            <div
              key={team.id}
              ref={el => { teamRefs.current[i] = el }}
              className="absolute inset-0 px-6 md:px-14 lg:px-20 pb-4 md:pb-10 flex flex-col justify-center"
              style={{ opacity: 0 }}
            >
              {/* Watermark */}
              <div
                className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-4"
                aria-hidden
              >
                <span
                  className="font-display uppercase leading-none"
                  style={{
                    fontSize: 'clamp(7rem, 20vw, 20rem)',
                    color: 'white', opacity: 0.028,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {team.shortName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 relative z-10">

                {/* Left — text */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="font-display text-[0.7rem] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm"
                      style={{
                        backgroundColor: team.timelineColor + '1a',
                        color: team.timelineColor,
                        border: `1px solid ${team.timelineColor}35`,
                      }}
                    >
                      {team.name}
                    </div>
                    <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-zinc-600">
                      {team.period}
                    </span>
                  </div>

                  <blockquote
                    className="font-display uppercase leading-tight mb-4 md:mb-5"
                    style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2.8rem)', color: team.quoteColor }}
                  >
                    {team.quote}
                  </blockquote>

                  <p className="font-body text-zinc-400 text-sm leading-relaxed max-w-[46ch] mb-8">
                    {team.description}
                  </p>

                  <div className="flex gap-6 md:gap-10 mb-6">
                    <div className="border-t border-zinc-800 pt-4">
                      <p className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-zinc-600 mb-1">Goles</p>
                      <div
                        className="font-display leading-none tabular"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4.8rem)', color: team.timelineColor }}
                      >
                        <span ref={el => { counterRefs.current[i] = el }}>{team.goals}</span>
                      </div>
                    </div>
                    <div className="border-t border-zinc-800 pt-4">
                      <p className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-zinc-600 mb-1">por 90'</p>
                      <div
                        className="font-display leading-none tabular text-zinc-500"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4.8rem)' }}
                      >
                        {team.goalsPer90}
                      </div>
                    </div>
                    {team.assists > 0 && (
                      <div className="border-t border-zinc-800 pt-4">
                        <p className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-zinc-600 mb-1">Asistencias</p>
                        <div
                          className="font-display leading-none text-zinc-700 tabular"
                          style={{ fontSize: 'clamp(2rem, 5vw, 4.8rem)' }}
                        >
                          {team.assists}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Badge watermark */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none select-none" aria-hidden>
                    <Image
                      src={`/${team.id}BN.png`}
                      alt=""
                      fill
                      className="object-contain object-bottom"
                      style={{ opacity: 0.18 }}
                      sizes="192px"
                    />
                  </div>
                </div>

                {/* Right — images */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 h-40 md:h-auto md:max-h-[65vh] md:overflow-hidden">
                  <div className="relative overflow-hidden rounded-sm h-full md:h-auto md:aspect-[3/4]">
                    <Image src={team.images[0]} alt={`${team.name} — 1`} fill
                      className="object-cover" sizes="(max-width: 768px) 45vw, 25vw"
                      style={{ objectPosition: team.id === 'murcia' ? '35% 50%' : team.id === 'antequera' ? '65% 50%' : '50% 50%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  </div>
                  <div className="relative overflow-hidden rounded-sm h-full md:h-auto md:aspect-[3/4] md:mt-6">
                    <Image src={team.images[1]} alt={`${team.name} — 2`} fill
                      className="object-cover" sizes="(max-width: 768px) 45vw, 25vw"
                      style={{ objectPosition: team.id === 'murcia' ? '35% 50%' : team.id === 'villarreal' ? '65% 50%' : '50% 50%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex-shrink-0 h-[2px] bg-zinc-900">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${((activeIdx + 1) / TEAMS.length) * 100}%`,
              backgroundColor: 'var(--accent)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
