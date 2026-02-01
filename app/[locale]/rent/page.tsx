'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

// 樣本物件數據
const sampleProperties = [
  {
    id: 1,
    title: { ja: 'モダンな1LDKマンション', zh: '現代化1LDK公寓', en: 'Modern 1LDK Apartment' },
    rent: 85000,
    location: { ja: '東京都渋谷区', zh: '東京都澀谷區', en: 'Shibuya, Tokyo' },
    rooms: '1LDK',
    area: 35,
    features: { 
      ja: ['駅近', 'ペット可', '南向き', 'オートロック'],
      zh: ['車站近', '可養寵物', '朝南', '自動門禁'],
      en: ['Near Station', 'Pets OK', 'South-facing', 'Auto-lock']
    },
    nearestStation: { ja: '渋谷駅 徒歩5分', zh: '澀谷站 步行5分鐘', en: 'Shibuya Station 5 min walk' },
    imageColor: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    title: { ja: 'ファミリー向け2LDK', zh: '適合家庭2LDK', en: 'Family 2LDK' },
    rent: 120000,
    location: { ja: '東京都世田谷区', zh: '東京都世田谷區', en: 'Setagaya, Tokyo' },
    rooms: '2LDK',
    area: 55,
    features: { 
      ja: ['駐車場あり', 'リノベーション済み', '角部屋'],
      zh: ['附停車場', '已翻新', '角落房間'],
      en: ['Parking', 'Renovated', 'Corner Room']
    },
    nearestStation: { ja: '三軒茶屋駅 徒歩8分', zh: '三軒茶屋站 步行8分鐘', en: 'Sangenjaya Station 8 min walk' },
    imageColor: 'from-green-400 to-green-600'
  },
  {
    id: 3,
    title: { ja: '都心の好立地1K', zh: '市中心優良位置1K', en: 'Central 1K Apartment' },
    rent: 75000,
    location: { ja: '東京都港区', zh: '東京都港區', en: 'Minato, Tokyo' },
    rooms: '1K',
    area: 25,
    features: { 
      ja: ['駅近', '築浅', 'セキュリティ充実'],
      zh: ['車站近', '新建', '安保完善'],
      en: ['Near Station', 'New Building', 'Good Security']
    },
    nearestStation: { ja: '六本木駅 徒歩3分', zh: '六本木站 步行3分鐘', en: 'Roppongi Station 3 min walk' },
    imageColor: 'from-purple-400 to-purple-600'
  },
  {
    id: 4,
    title: { ja: '広々としたデザイナーズ', zh: '寬敞的設計師公寓', en: 'Spacious Designer Apartment' },
    rent: 150000,
    location: { ja: '東京都目黒区', zh: '東京都目黒區', en: 'Meguro, Tokyo' },
    rooms: '2LDK',
    area: 60,
    features: { 
      ja: ['デザイナーズ', 'ルーフバルコニー', '最上階'],
      zh: ['設計師公寓', '屋頂陽台', '頂樓'],
      en: ['Designer', 'Roof Balcony', 'Top Floor']
    },
    nearestStation: { ja: '中目黒駅 徒歩7分', zh: '中目黑站 步行7分鐘', en: 'Nakameguro Station 7 min walk' },
    imageColor: 'from-amber-400 to-amber-600'
  },
]

// 東京地區列表
const tokyoAreas = {
  ja: ['エリアを選択してください', '東京23区', '渋谷区', '港区', '新宿区', '世田谷区', '目黒区', '神奈川県', '千葉県', '埼玉県'],
  zh: ['請選擇地區', '東京23區', '澀谷區', '港區', '新宿區', '世田谷區', '目黑區', '神奈川縣', '千葉縣', '埼玉縣'],
  en: ['Select Area', 'Tokyo 23 Wards', 'Shibuya', 'Minato', 'Shinjuku', 'Setagaya', 'Meguro', 'Kanagawa', 'Chiba', 'Saitama']
}

export default function RentPage() {
  const { locale } = useLanguage()
  const t = translations[locale as keyof typeof translations] || translations.ja
  
  const [selectedArea, setSelectedArea] = useState('')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])

  const handleRoomToggle = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    )
  }

  const areas = tokyoAreas[locale as keyof typeof tokyoAreas] || tokyoAreas.ja

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              {t.rent.title}
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              {t.rent.subtitle}
            </Text>
          </div>
        </Container>
      </Section>

      {/* 搜索表單 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Card padding="lg" className="shadow-xl">
            <Heading level={3} className="mb-6">{t.rent.searchTitle}</Heading>
            
            <div className="space-y-6">
              {/* 地區選擇 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  {t.rent.area}
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base text-gray-900 bg-white"
                >
                  {areas.map((area, index) => (
                    <option key={index} value={index === 0 ? '' : area} className="text-gray-900">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* 租金範圍 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    {t.rent.minRent}
                  </label>
                  <input
                    type="number"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    placeholder={'rentPlaceholder' in t.rent ? (t.rent as any).rentPlaceholder : "50000"}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    {t.rent.maxRent}
                  </label>
                  <input
                    type="number"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    placeholder={'rentPlaceholderMax' in t.rent ? (t.rent as any).rentPlaceholderMax : "200000"}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base text-gray-900 bg-white"
                  />
                </div>
              </div>

              {/* 戶型選擇 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  {t.rent.layout}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK'].map((type) => (
                    <label 
                      key={type} 
                      className={`flex items-center justify-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedRooms.includes(type)
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedRooms.includes(type)}
                        onChange={() => handleRoomToggle(type)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-base font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 特定條件 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  {t.rent.features}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(('featuresList' in t.rent ? (t.rent as any).featuresList : []) || []).map((condition: string, index: number) => (
                    <label 
                      key={index} 
                      className="flex items-center space-x-2 p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-all text-gray-700"
                    >
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-medium">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 搜索按鈕 */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                {t.rent.searchButton}
              </button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* 推薦物件 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} className="mb-8">{t.rent.recommended}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleProperties.map((property) => (
              <Card key={property.id} padding="none" hover className="overflow-hidden">
                {/* 物件圖片 */}
                <div className={`h-64 bg-gradient-to-br ${property.imageColor} flex items-center justify-center`}>
                  <Text className="text-white text-2xl font-bold">
                    {locale === 'zh' ? '物件圖片' : locale === 'en' ? 'Property Image' : '物件画像'}
                  </Text>
                </div>
                
                {/* 物件信息 */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">
                        ¥{property.rent.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2">{t.rent.perMonth}</span>
                    </div>
                  </div>
                  
                  <Heading level={4} className="mb-3">
                    {property.title[locale as keyof typeof property.title] || property.title.ja}
                  </Heading>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="text-lg mr-2">📍</span>
                      <Text size="sm">
                        {property.location[locale as keyof typeof property.location] || property.location.ja} - {property.nearestStation[locale as keyof typeof property.nearestStation] || property.nearestStation.ja}
                      </Text>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-lg mr-2">🏠</span>
                      <Text size="sm">{property.rooms} / {property.area}㎡</Text>
                    </div>
                  </div>
                  
                  {/* 特徵標籤 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(property.features[locale as keyof typeof property.features] || property.features.ja).map((feature: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* 操作按鈕 */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      {t.rent.favorite}
                    </button>
                    <button className="py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                      {t.rent.viewDetails}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 查看更多按鈕 */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              {t.rent.loadMore}
            </button>
          </div>
        </Container>
      </Section>

      {/* 租賃流程 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            {t.rent.rentalProcess}
          </Heading>
          <div className="grid md:grid-cols-5 gap-6">
            <StepCard number="1" title={t.rent.step1} description={t.rent.step1Desc} />
            <StepCard number="2" title={t.rent.step2} description={t.rent.step2Desc} />
            <StepCard number="3" title={t.rent.step3} description={t.rent.step3Desc} />
            <StepCard number="4" title={t.rent.step4} description={t.rent.step4Desc} />
            <StepCard number="5" title={t.rent.step5} description={t.rent.step5Desc} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" spacing="md">
        <Container>
          <div className="text-center">
            <Heading level={3} align="center" className="mb-4 text-gray-900">
              {('ctaTitle' in t.rent ? (t.rent as any).ctaTitle : null) || t.cta.title}
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              {('ctaDescription' in t.rent ? (t.rent as any).ctaDescription : null) || t.cta.description}
            </Text>
            <a
              href={`/${locale}/contact`}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {('ctaButton' in t.rent ? (t.rent as any).ctaButton : null) || t.contact.inquiryButton}
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

// 步驟卡片組件
interface StepCardProps {
  number: string
  title: string
  description: string
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        {number}
      </div>
      <Heading level={5} className="mb-2">
        {title}
      </Heading>
      <Text size="sm" color="light">
        {description}
      </Text>
    </div>
  )
}
