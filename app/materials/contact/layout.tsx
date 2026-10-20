import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  alternates: { canonical: '/contact' },
}

export default function MaterialsContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
