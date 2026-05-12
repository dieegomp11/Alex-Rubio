export type Team = {
  id: string
  name: string
  shortName: string
  period: string
  goals: number
  assists: number
  goalsPer90: number
  accent: string
  timelineColor: string
  quoteColor: string
  badge: string
  quote: string
  description: string
  images: [string, string]
}

export const TEAMS: Team[] = [
  {
    id: 'murcia',
    name: 'Real Murcia',
    shortName: 'MRC',
    period: '2023 – 2024',
    goals: 3,
    assists: 0,
    goalsPer90: 0.37,
    accent: '#CC1F1F',
    timelineColor: '#CC1F1F',
    quoteColor: '#CC1F1F',
    badge: 'MRC',
    quote: 'El lugar donde empezó a curtirse de verdad.',
    description:
      'Fue el lugar donde empezó a curtirse de verdad. En Murcia aprendió a convivir con la presión de un club histórico y una afición exigente. Allí comenzó a formar el carácter competitivo que hoy define su juego.',
    images: [
      '/Murcia/AlexRubioMurcia.webp',
      '/Murcia/AlexRubioMurcia1.jpg',
    ],
  },
  {
    id: 'antequera',
    name: 'Antequera CF',
    shortName: 'ANT',
    period: '2024 – 2025',
    goals: 9,
    assists: 0,
    goalsPer90: 0.61,
    accent: '#22C55E',
    timelineColor: '#22C55E',
    quoteColor: '#22C55E',
    badge: 'ANT',
    quote: 'Su explosión definitiva. Dos goles que casi cambian todo.',
    description:
      'En Antequera llegó su explosión definitiva. Se consagró como delantero importante y lideró al equipo en una gran campaña que terminó en playoff de ascenso. Marcó dos goles clave en esa fase final, aunque el ascenso terminó escapándose.',
    images: [
      '/Antequera/AlexRubioAntequera.jpg',
      '/Antequera/AlexRubioAntequera1.jpg',
    ],
  },
  {
    id: 'villarreal',
    name: 'Villarreal CF B',
    shortName: 'VIL',
    period: '2025 – Ene 2026',
    goals: 8,
    assists: 2,
    goalsPer90: 0.56,
    accent: '#F5C800',
    timelineColor: '#F5C800',
    quoteColor: '#F5C800',
    badge: 'VIL',
    quote: 'La referencia arriba. Figura de un equipo joven.',
    description:
      'En el Villarreal B asumió el papel de referencia ofensiva. Fue la figura arriba de un equipo joven y dinámico, destacando por su movilidad, personalidad y capacidad para aparecer en los momentos importantes.',
    images: [
      '/Villarreal/AlexRubioVillarreal.jpg',
      '/Villarreal/AlexRubioVillarreal1.jpg',
    ],
  },
  {
    id: 'albacete',
    name: 'Albacete Balompié',
    shortName: 'ALB',
    period: 'Ene 2026 —',
    goals: 4,
    assists: 0,
    goalsPer90: 0.43,
    accent: '#E8D44D',
    timelineColor: '#ffffff',
    quoteColor: '#ffffff',
    badge: 'ALB',
    quote: 'El salto al fútbol profesional. Respondió con madurez.',
    description:
      'Con el Albacete ha dado el salto al fútbol profesional y ha respondido con madurez desde el primer momento. Ha demostrado ser un delantero con garra, carácter y gol, preparado para competir al máximo nivel.',
    images: [
      '/Albacete/AlexRubioAlbacete.jpg',
      '/Albacete/AlexRubioAlbacete1.jpeg',
    ],
  },
]

export const TOTAL_GOALS = TEAMS.reduce((acc, t) => acc + t.goals, 0)
export const TOTAL_ASSISTS = TEAMS.reduce((acc, t) => acc + t.assists, 0)
export const DEFAULT_TEAM = TEAMS[3]
