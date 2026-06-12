'use client'

import { useEffect, useRef, useState } from 'react'

const B = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const VIDEOS = [
  `${B}/AlexRubioLeganes_cut.mp4?v=7`,
  `${B}/AlexRubioVillarreal_cut1.mp4?v=7`,
  `${B}/AlexRubioVillarreal_cut2.mp4?v=7`,
  `${B}/AlexRubioVillarreal_cut3.mp4?v=7`,
  `${B}/AlexRubioAntequera_cut1.mp4?v=7`,
  `${B}/AlexRubioAntequera_cut2.mp4?v=7`,
]

const POSTER = `${B}/hero_poster.jpg?v=7`

const CROSSFADE_TRIGGER = 0.8  // seconds before end
const CROSSFADE_MS      = 1400

export default function HeroVideoLoop() {
  const [visibleIdx, setVisibleIdx]  = useState(0)
  const visibleIdxRef = useRef(0)       // always up-to-date, safe inside callbacks
  const videoRefs     = useRef<(HTMLVideoElement | null)[]>([])
  const transitioning = useRef(false)
  const warmedUp      = useRef<Set<number>>(new Set([0]))

  // Solo el vídeo siguiente al que se reproduce empieza a descargarse,
  // así el primero no compite por el ancho de banda con los otros cinco.
  const warmUpNext = (currentIdx: number) => {
    const nextIdx = (currentIdx + 1) % VIDEOS.length
    if (warmedUp.current.has(nextIdx)) return
    warmedUp.current.add(nextIdx)
    const v = videoRefs.current[nextIdx]
    if (v) { v.preload = 'auto'; v.load() }
  }

  useEffect(() => {
    videoRefs.current[0]?.play().catch(() => {})
  }, [])

  const goNext = (currentIdx: number) => {
    if (transitioning.current) return
    transitioning.current = true

    const nextIdx = (currentIdx + 1) % VIDEOS.length
    videoRefs.current[nextIdx]?.play().catch(() => {})

    setTimeout(() => {
      visibleIdxRef.current = nextIdx
      setVisibleIdx(nextIdx)

      setTimeout(() => {
        const old = videoRefs.current[currentIdx]
        if (old) { old.pause(); old.currentTime = 0 }
        transitioning.current = false
      }, CROSSFADE_MS + 100)
    }, 40)
  }

  const handleTimeUpdate = (idx: number) => {
    if (idx !== visibleIdxRef.current || transitioning.current) return
    const v = videoRefs.current[idx]
    if (!v || !v.duration) return
    if (v.duration - v.currentTime <= CROSSFADE_TRIGGER) goNext(idx)
  }

  return (
    <div className="absolute inset-0">
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={el => { videoRefs.current[i] = el }}
          src={src}
          muted
          playsInline
          autoPlay={i === 0}
          poster={i === 0 ? POSTER : undefined}
          preload={i === 0 ? 'auto' : 'none'}
          onPlaying={() => warmUpNext(i)}
          onTimeUpdate={() => handleTimeUpdate(i)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === visibleIdx ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
