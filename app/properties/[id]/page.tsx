'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/Reveal'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'

interface Property {
  id: string
  title: string
  type: 'rent' | 'sale' | 'minpaku'
  price: number
  monthly_rent?: number
  address: string
  area?: number
  rooms?: string
  description?: string
  image_urls?: string[]
  features?: string[]
  nearest_station?: string
  walking_minutes?: number
  status: string
}

// 注意：'use client' 組件無法使用 revalidate
// 如需 ISR，應該將此頁面轉換為服務端組件

const typeLabels = {
  rent: '賃貸',
  sale: '売買',
  minpaku: '民泊',
} as const

export default function PropertyDetailPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`/api/properties/${params.id}`)
        if (!response.ok) {
          throw new Error('物件が見つかりません')
        }
        const data = await response.json()
        setProperty(data.property)
      } catch (err) {
        setError(err instanceof Error ? err.message : '読み込みエラー')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-washi texture-paper">
        <Navbar />
        <Section background="white" spacing="xl">
          <Container>
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin h-10 w-10 border-b border-ink mx-auto mb-6" />
                <Text color="light" size="sm" className="tracking-widest">読み込み中…</Text>
              </div>
            </div>
          </Container>
        </Section>
        <Footer />
      </main>
    )
  }

  if (error || !property) {
    return (
      <main className="min-h-screen bg-washi texture-paper">
        <Navbar />
        <Section background="white" spacing="xl">
          <Container>
            <div className="text-center py-20">
              <p className="section-label mb-4">Not Found</p>
              <Heading level={2} align="center" className="mb-6 text-ink">
                物件が見つかりません
              </Heading>
              <Text className="mb-10 text-center">
                {error || 'この物件は存在しないか、削除された可能性があります。'}
              </Text>
              <Link
                href="/"
                className="inline-block border border-ink/40 text-ink px-9 py-4 text-sm tracking-[0.15em] hover:bg-ink hover:text-washi transition-all duration-500"
              >
                ホームに戻る
              </Link>
            </div>
          </Container>
        </Section>
        <Footer />
      </main>
    )
  }

  const heroImage = property.image_urls?.[0]
  const specs: Array<[string, string]> = [
    [property.type === 'rent' ? '賃料' : '販売価格', `¥${property.price.toLocaleString()}${property.type === 'rent' ? ' / 月' : ''}`],
    ...(property.rooms ? ([['間取り', property.rooms]] as Array<[string, string]>) : []),
    ...(property.area ? ([['専有面積', `${property.area}㎡`]] as Array<[string, string]>) : []),
    ['所在地', property.address],
    ...(property.nearest_station
      ? ([['交通', `${property.nearest_station}${property.walking_minutes ? ` 徒歩${property.walking_minutes}分` : ''}`]] as Array<[string, string]>)
      : []),
  ]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      {/* Hero — 物件写真（なければ静かなコンクリートの情景） */}
      <PageHero
        size="lg"
        label={typeLabels[property.type]}
        title={property.title}
        subtitle={property.nearest_station
          ? `${property.address} — ${property.nearest_station}${property.walking_minutes ? ` 徒歩${property.walking_minutes}分` : ''}`
          : property.address}
        image={heroImage ?? 'concreteShadow'}
        alt={heroImage ? property.title : ''}
        sideShade
      />

      {/* 概要 */}
      <section className="bg-washi texture-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="section-label mb-3">Overview</p>
                <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-10">物件概要</h2>
              </Reveal>
              <Reveal delay={1}>
                <dl className="border-t border-ink/15">
                  {specs.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-4 border-b border-ink/10">
                      <dt className="text-ink/45 text-[13px] tracking-wide pt-0.5">{k}</dt>
                      <dd className="col-span-2 text-ink/85 text-[14px] leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {property.description && (
                <Reveal delay={1}>
                  <h3 className="font-serif text-xl text-ink mt-14 mb-6">物件詳細</h3>
                  <p className="text-ink/70 text-[15px] leading-loose whitespace-pre-wrap">
                    {property.description}
                  </p>
                </Reveal>
              )}

              {property.features && property.features.length > 0 && (
                <Reveal delay={1}>
                  <h3 className="font-serif text-xl text-ink mt-14 mb-6">設備・特徴</h3>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-ink/75 text-sm leading-relaxed">
                        <span className="mt-2.5 inline-block w-4 h-px bg-gold-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>

            {/* お問い合わせ */}
            <div className="lg:col-span-5">
              <Reveal delay={1}>
                <div className="border hairline bg-white/70 p-8 md:p-10 sticky top-24">
                  <p className="section-label mb-3">Contact</p>
                  <h3 className="font-serif text-xl text-ink mb-8">この物件についてのご相談</h3>
                  <div className="space-y-4">
                    <a
                      href="tel:03-6914-3633"
                      className="block w-full bg-ink text-washi text-center py-4 text-sm tracking-[0.15em] hover:bg-gold-800 transition-colors duration-500"
                    >
                      電話で問い合わせる
                    </a>
                    <Link
                      href="/contact"
                      className="block w-full border border-ink/40 text-ink text-center py-4 text-sm tracking-[0.15em] hover:bg-ink hover:text-washi transition-all duration-500"
                    >
                      メールで問い合わせる
                    </Link>
                  </div>
                  <div className="mt-10 pt-8 border-t border-ink/10">
                    <h4 className="font-serif text-sm text-ink mb-4 tracking-widest">営業時間</h4>
                    <div className="space-y-2 text-ink/60 text-sm leading-relaxed">
                      <p>平日: 9:00〜18:00</p>
                      <p>土曜: 10:00〜17:00</p>
                      <p className="text-ink/40">日祝: 定休日</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
