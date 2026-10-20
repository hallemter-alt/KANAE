import { permanentRedirect } from 'next/navigation'

// Keep bookmarked links working without maintaining a separate consultation form.
export default async function MaterialsContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const source = await searchParams
  const target = new URLSearchParams({ business: 'materials' })
  for (const key of ['product', 'topic']) {
    const value = source[key]
    if (typeof value === 'string' && value.length <= 100) target.set(key, value)
  }
  permanentRedirect(`/contact?${target.toString()}`)
}
