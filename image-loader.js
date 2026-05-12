export default function customLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${base}${src}`
}
