'use client'

import Image from 'next/image'
import SocialLinks from './SocialLinks'

const NAV = ['Perfil', 'Trayectoria', 'Stats', 'Highlights']

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink border-t border-zinc-800/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-14">

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">

          {/* Identity */}
          <div>
            <div className="flex items-baseline gap-3 mb-3">
              <div className="w-5 h-px flex-shrink-0 mb-1" style={{ backgroundColor: 'var(--accent)' }} />
              <div className="leading-none">
                <span className="font-display uppercase text-zinc-500"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.3rem)', letterSpacing: '0.12em' }}>
                  Alex
                </span>
                <span className="font-display uppercase text-white ml-2"
                  style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)', letterSpacing: '-0.01em' }}>
                  Rubio
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-8">
              <span className="font-mono text-[0.48rem] tracking-[0.25em] uppercase"
                style={{ color: 'var(--accent)', opacity: 0.8 }}>
                Delantero
              </span>
              <span className="w-px h-3 bg-zinc-700 flex-shrink-0" />
              <span className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-zinc-600">
                Albacete BP
              </span>
              <span className="w-px h-3 bg-zinc-700 flex-shrink-0" />
              <span className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-zinc-700">
                Segunda División
              </span>
            </div>
          </div>

          {/* Nav + socials */}
          <div className="flex flex-col gap-5">
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV.map(label => (
                <button
                  key={label}
                  onClick={() => scrollTo(label)}
                  className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-zinc-500 hover:text-white transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </nav>
            <SocialLinks />
          </div>

        </div>

        {/* Bottom rule */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-10 pt-6 border-t border-zinc-800/50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-px" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-zinc-700">
              Temporada 2025/26
            </span>
          </div>

          {/* Crafted by Fluentia */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.44rem] tracking-[0.2em] uppercase text-zinc-700">
              Crafted with
            </span>
            <a
              href="https://fluentiatech.es"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-40 hover:opacity-80 transition-opacity duration-200"
            >
              <Image
                src="/fluentia_clean.png"
                alt="Fluentia"
                width={64}
                height={20}
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
            <span className="font-mono text-[0.44rem] tracking-[0.2em] uppercase text-zinc-700">
              Precision
            </span>
          </div>

          <span className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-zinc-700">
            © 2025 Álex Rubio
          </span>
        </div>

      </div>
    </footer>
  )
}
