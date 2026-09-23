// ─────────────────────────────────────────────────────────────
//  CALENDARIO — Albacete BP · Segunda División 2026/27
// ─────────────────────────────────────────────────────────────
//
//  PARA ACTUALIZAR UN HORARIO:
//  Busca la jornada y escribe la hora en `hora`. Nada más.
//
//      { j: 11, fecha: '2026-10-25', hora: '',      ... }   ← sin hora
//      { j: 11, fecha: '2026-10-25', hora: '18:30', ... }   ← con hora
//
//  Si `hora` está vacío, la web muestra "Por confirmar" en su sitio.
//  El Hero elige solo el próximo partido según la fecha de hoy,
//  así que no hay que tocar nada más cuando pasa una jornada.
// ─────────────────────────────────────────────────────────────

export type Partido = {
  /** Número de jornada */
  j: number
  /** Fecha del partido en formato YYYY-MM-DD */
  fecha: string
  /** Hora en formato HH:MM. Vacío si aún no está confirmada. */
  hora: string
  /** Id del rival — debe existir en RIVALES */
  rival: string
  /** true si el Albacete juega en casa (Carlos Belmonte) */
  casa: boolean
}

export type Rival = {
  nombre: string
  /** Nombre del estadio donde juega como local */
  estadio: string
  escudo: string
}

/** Escudos: cada archivo vive en /public/escudos/ */
export const RIVALES: Record<string, Rival> = {
  albacete:       { nombre: 'Albacete', estadio: 'Estadio Carlos Belmonte', escudo: '/escudos/albacete.png' },
  cordoba:        { nombre: 'Córdoba', estadio: 'Estadio Nuevo Arcángel', escudo: '/escudos/cordoba.png' },
  girona:         { nombre: 'Girona', estadio: 'Estadi Montilivi', escudo: '/escudos/girona.webp' },
  eibar:          { nombre: 'Eibar', estadio: 'Estadio Municipal de Ipurúa', escudo: '/escudos/eibar.webp' },
  valladolid:     { nombre: 'Valladolid', estadio: 'Estadio José Zorrilla', escudo: '/escudos/valladolid.png' },
  sporting:       { nombre: 'Sporting', estadio: 'Estadio El Molinón', escudo: '/escudos/sporting.webp' },
  eldense:        { nombre: 'Eldense', estadio: 'Estadio Nuevo Pepico Amat', escudo: '/escudos/eldense.webp' },
  sabadell:       { nombre: 'Sabadell', estadio: 'Estadi Nova Creu Alta', escudo: '/escudos/sabadell.webp' },
  leganes:        { nombre: 'Leganés', estadio: 'Estadio Butarque', escudo: '/escudos/leganes.webp' },
  celta:          { nombre: 'Celta Fortuna', estadio: 'Estadio de Balaídos', escudo: '/escudos/celta-fortuna.webp' },
  burgos:         { nombre: 'Burgos', estadio: 'Estadio El Plantío', escudo: '/escudos/burgos.webp' },
  tenerife:       { nombre: 'Tenerife', estadio: 'Estadio Heliodoro Rodríguez López', escudo: '/escudos/tenerife.webp' },
  ceuta:          { nombre: 'Ceuta', estadio: 'Estadio Alfonso Murube', escudo: '/escudos/ceuta.webp' },
  almeria:        { nombre: 'Almería', estadio: 'Power Horse Stadium', escudo: '/escudos/almeria.webp' },
  mallorca:       { nombre: 'Mallorca', estadio: 'Estadi Mallorca Son Moix', escudo: '/escudos/mallorca.webp' },
  cadiz:          { nombre: 'Cádiz', estadio: 'Estadio Nuevo Mirandilla', escudo: '/escudos/cadiz.webp' },
  andorra:        { nombre: 'Andorra', estadio: "Estadi d'Encamp", escudo: '/escudos/andorra.png' },
  granada:        { nombre: 'Granada', estadio: 'Estadio Nuevo Los Cármenes', escudo: '/escudos/granada.png' },
  castellon:      { nombre: 'Castellón', estadio: 'Estadio Castalia', escudo: '/escudos/castellon.svg' },
  laspalmas:      { nombre: 'Las Palmas', estadio: 'Estadio de Gran Canaria', escudo: '/escudos/las-palmas.png' },
  sociedadb:      { nombre: 'Real Sociedad B', estadio: 'Estadio de Zubieta', escudo: '/escudos/sociedad-b.png' },
  oviedo:         { nombre: 'Oviedo', estadio: 'Estadio Carlos Tartiere', escudo: '/escudos/oviedo.webp' },
}

export const ESTADIO_CASA = RIVALES.albacete.estadio

// ─────────────────────────────────────────────────────────────
//  LAS 42 JORNADAS
//  Edita solo la columna `hora` cuando se confirmen los horarios.
// ─────────────────────────────────────────────────────────────
export const CALENDARIO: Partido[] = [
  { j:  6, fecha: '2026-09-18', hora: '20:30', rival: 'cordoba',    casa: true  },
  { j:  7, fecha: '2026-09-25', hora: '20:30', rival: 'girona',     casa: false },
  { j:  8, fecha: '2026-10-03', hora: '14:00', rival: 'eibar',      casa: true  },
  { j:  9, fecha: '2026-10-12', hora: '14:00', rival: 'valladolid', casa: false },
  { j: 10, fecha: '2026-10-17', hora: '18:30', rival: 'sporting',   casa: false },
  { j: 11, fecha: '2026-10-25', hora: '',      rival: 'eldense',    casa: true  },
  { j: 12, fecha: '2026-11-01', hora: '',      rival: 'sabadell',   casa: true  },
  { j: 13, fecha: '2026-11-08', hora: '',      rival: 'leganes',    casa: false },
  { j: 14, fecha: '2026-11-15', hora: '',      rival: 'celta',      casa: true  },
  { j: 15, fecha: '2026-11-22', hora: '',      rival: 'burgos',     casa: false },
  { j: 16, fecha: '2026-11-29', hora: '',      rival: 'tenerife',   casa: true  },
  { j: 17, fecha: '2026-12-06', hora: '',      rival: 'ceuta',      casa: false },
  { j: 18, fecha: '2026-12-13', hora: '',      rival: 'almeria',    casa: false },
  { j: 19, fecha: '2026-12-20', hora: '',      rival: 'mallorca',   casa: true  },
  { j: 20, fecha: '2027-01-03', hora: '',      rival: 'cadiz',      casa: false },
  { j: 21, fecha: '2027-01-10', hora: '',      rival: 'andorra',    casa: true  },
  { j: 22, fecha: '2027-01-17', hora: '',      rival: 'eldense',    casa: false },
  { j: 23, fecha: '2027-01-24', hora: '',      rival: 'granada',    casa: true  },
  { j: 24, fecha: '2027-01-31', hora: '',      rival: 'eibar',      casa: false },
  { j: 25, fecha: '2027-02-07', hora: '',      rival: 'valladolid', casa: true  },
  { j: 26, fecha: '2027-02-14', hora: '',      rival: 'castellon',  casa: true  },
  { j: 27, fecha: '2027-02-21', hora: '',      rival: 'tenerife',   casa: false },
  { j: 28, fecha: '2027-02-28', hora: '',      rival: 'burgos',     casa: true  },
  { j: 29, fecha: '2027-03-07', hora: '',      rival: 'sabadell',   casa: false },
  { j: 30, fecha: '2027-03-14', hora: '',      rival: 'laspalmas',  casa: true  },
  { j: 31, fecha: '2027-03-21', hora: '',      rival: 'andorra',    casa: false },
  { j: 32, fecha: '2027-03-28', hora: '',      rival: 'almeria',    casa: true  },
  { j: 33, fecha: '2027-04-04', hora: '',      rival: 'sociedadb',  casa: false },
  { j: 34, fecha: '2027-04-11', hora: '',      rival: 'ceuta',      casa: true  },
  { j: 35, fecha: '2027-04-18', hora: '',      rival: 'cordoba',    casa: false },
  { j: 36, fecha: '2027-04-25', hora: '',      rival: 'leganes',    casa: true  },
  { j: 37, fecha: '2027-05-02', hora: '',      rival: 'oviedo',     casa: false },
  { j: 38, fecha: '2027-05-09', hora: '',      rival: 'girona',     casa: true  },
  { j: 39, fecha: '2027-05-16', hora: '',      rival: 'celta',      casa: false },
  { j: 40, fecha: '2027-05-23', hora: '',      rival: 'sporting',   casa: true  },
  { j: 41, fecha: '2027-05-30', hora: '',      rival: 'mallorca',   casa: false },
  { j: 42, fecha: '2027-06-06', hora: '',      rival: 'cadiz',      casa: true  },
]

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

/** "2026-09-18" → "18 Septiembre" */
export function formatearFecha(fecha: string): string {
  const [, mes, dia] = fecha.split('-').map(Number)
  return `${dia} ${MESES[mes - 1]}`
}

/**
 * Devuelve el próximo partido: el primero cuya fecha no haya pasado.
 * Un partido sigue siendo "el próximo" durante todo su día, así que la
 * tarjeta no salta al siguiente mientras se está jugando.
 * Si la temporada ha terminado, devuelve null.
 */
export function proximoPartido(hoy: Date = new Date()): Partido | null {
  const y = hoy.getFullYear()
  const m = String(hoy.getMonth() + 1).padStart(2, '0')
  const d = String(hoy.getDate()).padStart(2, '0')
  const hoyStr = `${y}-${m}-${d}`

  return CALENDARIO.find((p) => p.fecha >= hoyStr) ?? null
}
