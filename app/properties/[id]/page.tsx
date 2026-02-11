'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'

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
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <Section background="white" spacing="lg">
          <Container>
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <Text>読み込み中...</Text>
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
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <Section background="white" spacing="lg">
          <Container>
            <div className="text-center py-16">
              <Heading level={2} className="mb-6 text-gray-900">
                物件が見つかりません
              </Heading>
              <Text className="mb-8">{error || 'この物件は存在しないか、削除された可能性があります。'}</Text>
              <a
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
              >
                ホームに戻る
              </a>
            </div>
          </Container>
        </Section>
        <Footer />
      </main>
    )
  }

  const typeLabels = {
    rent: '賃貸',
    sale: '売買',
    minpaku: '民泊'
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-sm mb-4">
              {typeLabels[property.type]}
            </span>
            <Heading level={1} align="center" className="mb-6 text-white">
              {property.title}
            </Heading>
            <div className="flex items-center justify-center space-x-4 text-white/90 text-lg">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.address}
              </span>
              {property.nearest_station && (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {property.nearest_station} 徒歩{property.walking_minutes}分
                </span>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price Card */}
              <Card padding="lg">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <Text size="sm" className="mb-2">
                      {property.type === 'rent' ? '賃料' : '販売価格'}
                    </Text>
                    <Heading level={2} className="text-primary-600">
                      ¥{property.price.toLocaleString()}
                      {property.type === 'rent' && <span className="text-2xl text-gray-600 ml-2">/ 月</span>}
                    </Heading>
                  </div>
                  <div className="text-right">
                    {property.rooms && (
                      <div className="mb-2">
                        <Text size="sm" className="text-gray-600">間取り</Text>
                        <Text size="lg" className="font-bold text-gray-900">{property.rooms}</Text>
                      </div>
                    )}
                    {property.area && (
                      <div>
                        <Text size="sm" className="text-gray-600">専有面積</Text>
                        <Text size="lg" className="font-bold text-gray-900">{property.area}㎡</Text>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Description */}
              {property.description && (
                <Card padding="lg">
                  <Heading level={3} className="mb-6 text-gray-900">物件詳細</Heading>
                  <Text className="whitespace-pre-wrap leading-loose">
                    {property.description}
                  </Text>
                </Card>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <Card padding="lg">
                  <Heading level={3} className="mb-6 text-gray-900">設備・特徴</Heading>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card padding="lg" className="sticky top-24">
                <Heading level={4} className="mb-6 text-gray-900">お問い合わせ</Heading>
                <div className="space-y-4">
                  <a
                    href={`tel:03-6914-3633`}
                    className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold text-center hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    電話で問い合わせる
                  </a>
                  <button className="w-full border-2 border-primary-600 text-primary-600 py-4 rounded-lg font-bold hover:bg-primary-50 transition-all">
                    メールで問い合わせる
                  </button>
                  <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all">
                    内見予約をする
                  </button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Heading level={5} className="mb-4 text-gray-900">営業時間</Heading>
                  <Text size="sm" className="space-y-2">
                    <div>平日: 9:00〜18:00</div>
                    <div>土曜: 10:00〜17:00</div>
                    <div className="text-gray-500">日祝: 定休日</div>
                  </Text>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
