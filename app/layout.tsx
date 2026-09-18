import type { Metadata } from 'next'
import { Bebas_Neue, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { CALENDARIO, ESTADIO_CASA, RIVALES } from '@/lib/calendario'

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = 'https://alexrubioroldan.es'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Álex Rubio — Delantero del Albacete Balompié | Web Oficial',
    template: '%s | Álex Rubio',
  },
  description:
    'Web oficial de Álex Rubio Roldán, futbolista español y delantero del Albacete Balompié en Segunda División. Su trayectoria por Real Murcia, Antequera CF y Villarreal B, estadísticas, goles y highlights.',
  keywords: [
    'Alex Rubio',
    'Álex Rubio',
    'Alex Rubio delantero',
    'Alex Rubio Albacete',
    'Alex Rubio futbolista',
    'Alex Rubio Roldán',
    'Álex Rubio Roldán',
    'Alex Rubio Albacete Balompié',
    'Alex Rubio Segunda División',
    'Alex Rubio Villarreal B',
    'Alex Rubio Antequera',
    'Alex Rubio Real Murcia',
    'Alex Rubio goles',
    'delantero Albacete Balompié',
    'futbolista español delantero',
  ],
  authors: [{ name: 'Álex Rubio', url: SITE_URL }],
  creator: 'Álex Rubio',
  publisher: 'Álex Rubio',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon-192.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png?v=2',
  },
  category: 'sports',
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: 'Álex Rubio — Web Oficial',
    locale: 'es_ES',
    title: 'Álex Rubio — Delantero del Albacete Balompié',
    description:
      'Futbolista español, delantero del Albacete Balompié en Segunda División. Trayectoria, estadísticas, goles y highlights.',
    firstName: 'Álex',
    lastName: 'Rubio',
    gender: 'male',
    images: [
      {
        url: '/og_image.jpg',
        width: 1200,
        height: 630,
        alt: 'Álex Rubio, delantero del Albacete Balompié, conduciendo el balón',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Rubiooo00',
    creator: '@Rubiooo00',
    title: 'Álex Rubio — Delantero del Albacete Balompié',
    description:
      'Futbolista español, delantero del Albacete Balompié en Segunda División. Trayectoria, estadísticas, goles y highlights.',
    images: ['/og_image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Álex Rubio',
  alternateName: ['Alex Rubio', 'Álex Rubio Roldán', 'Alex Rubio Roldan'],
  url: SITE_URL,
  image: `${SITE_URL}/og_image.jpg`,
  jobTitle: 'Futbolista profesional · Delantero',
  description:
    'Álex Rubio Roldán es un futbolista español que juega como delantero en el Albacete Balompié, en la Segunda División de España. Formado en Real Murcia, Antequera CF y Villarreal CF B.',
  nationality: { '@type': 'Country', name: 'España' },
  memberOf: {
    '@type': 'SportsTeam',
    name: 'Albacete Balompié',
    sport: 'Fútbol',
    memberOf: { '@type': 'SportsOrganization', name: 'LaLiga Hypermotion — Segunda División' },
  },
  affiliation: [
    { '@type': 'SportsTeam', name: 'Villarreal CF B', sport: 'Fútbol' },
    { '@type': 'SportsTeam', name: 'Antequera CF', sport: 'Fútbol' },
    { '@type': 'SportsTeam', name: 'Real Murcia', sport: 'Fútbol' },
  ],
  sameAs: [
    'https://www.instagram.com/alexrubio.9',
    'https://x.com/Rubiooo00',
    'https://www.tiktok.com/@alexrubioo',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Álex Rubio — Web Oficial',
  alternateName: 'alexrubioroldan.es',
  url: SITE_URL,
  inLanguage: 'es',
  about: { '@id': `${SITE_URL}/#person` },
}

// Los proximos partidos como SportsEvent: Google puede mostrarlos
// como resultado enriquecido al buscar "Albacete proximo partido".
// Solo los que quedan por jugar, para no publicar eventos caducados.
const hoyISO = new Date().toISOString().slice(0, 10)
const partidosJsonLd = CALENDARIO.filter((p) => p.fecha >= hoyISO).map((p) => {
  const rival = RIVALES[p.rival]
  const local = p.casa ? RIVALES.albacete : rival
  const visitante = p.casa ? rival : RIVALES.albacete
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${local.nombre} - ${visitante.nombre}`,
    description: `Jornada ${p.j} de Segunda Division. ${local.nombre} recibe a ${visitante.nombre}.`,
    startDate: p.hora ? `${p.fecha}T${p.hora}:00+02:00` : p.fecha,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'Futbol',
    location: {
      '@type': 'Place',
      name: p.casa ? ESTADIO_CASA : `Campo del ${rival.nombre}`,
      address: { '@type': 'PostalAddress', addressCountry: 'ES' },
    },
    homeTeam: { '@type': 'SportsTeam', name: local.nombre },
    awayTeam: { '@type': 'SportsTeam', name: visitante.nombre },
    competitor: [
      { '@type': 'SportsTeam', name: local.nombre },
      { '@type': 'SportsTeam', name: visitante.nombre },
    ],
  }
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${outfit.variable} ${jetbrainsMono.variable} grain`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {partidosJsonLd.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(partidosJsonLd) }}
          />
        )}
        {children}
      </body>
    </html>
  )
}
