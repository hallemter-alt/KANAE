'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'

// サンプル物件データ
const sampleProperties = [
  {
    id: 1,
    title: 'モダンな1LDKマンション',
    rent: 85000,
    location: '東京都渋谷区',
    rooms: '1LDK',
    area: 35,
    features: ['駅近', 'ペット可', '南向き', 'オートロック'],
    nearestStation: '渋谷駅 徒歩5分',
    imageColor: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    title: 'ファミリー向け2LDK',
    rent: 120000,
    location: '東京都世田谷区',
    rooms: '2LDK',
    area: 55,
    features: ['駐車場あり', 'リノベーション済み', '角部屋'],
    nearestStation: '三軒茶屋駅 徒歩8分',
    imageColor: 'from-green-400 to-green-600'
  },
  {
    id: 3,
    title: '都心の好立地1K',
    rent: 75000,
    location: '東京都港区',
    rooms: '1K',
    area: 25,
    features: ['駅近', '築浅', 'セキュリティ充実'],
    nearestStation: '六本木駅 徒歩3分',
    imageColor: 'from-purple-400 to-purple-600'
  },
  {
    id: 4,
    title: '広々としたデザイナーズ',
    rent: 150000,
    location: '東京都目黒区',
    rooms: '2LDK',
    area: 60,
    features: ['デザイナーズ', 'ルーフバルコニー', '最上階'],
    nearestStation: '中目黒駅 徒歩7分',
    imageColor: 'from-amber-400 to-amber-600'
  },
]

export default function RentPage() {
  const [selectedArea, setSelectedArea] = useState('')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])

  const handleRoomToggle = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              賃貸物件検索
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              お客様のライフスタイルに合った理想の賃貸物件をお探しします
            </Text>
          </div>
        </Container>
      </Section>

      {/* 検索フォーム */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Card padding="lg" className="shadow-xl">
            <Heading level={3} className="mb-6">物件を探す</Heading>
            
            <div className="space-y-6">
              {/* エリア選択 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  エリア
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-base"
                >
                  <option value="">エリアを選択してください</option>
                  <option value="tokyo23">東京23区</option>
                  <option value="shibuya">渋谷区</option>
                  <option value="minato">港区</option>
                  <option value="shinjuku">新宿区</option>
                  <option value="setagaya">世田谷区</option>
                  <option value="meguro">目黒区</option>
                  <option value="kanagawa">神奈川県</option>
                  <option value="chiba">千葉県</option>
                  <option value="saitama">埼玉県</option>
                </select>
              </div>

              {/* 賃料範囲 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    賃料（下限）
                  </label>
                  <input
                    type="number"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    placeholder="例: 50000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    賃料（上限）
                  </label>
                  <input
                    type="number"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    placeholder="例: 200000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-base"
                  />
                </div>
              </div>

              {/* 間取り選択 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  間取り
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK'].map((type) => (
                    <label 
                      key={type} 
                      className={`flex items-center justify-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedRooms.includes(type)
                          ? 'bg-primary-50 border-primary-500 text-primary-700 font-bold'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedRooms.includes(type)}
                        onChange={() => handleRoomToggle(type)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-base">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* その他の条件 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  こだわり条件
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['駅近（徒歩5分以内）', 'ペット可', 'バス・トイレ別', 'オートロック', '築浅（5年以内）', '駐車場あり'].map((condition) => (
                    <label 
                      key={condition} 
                      className="flex items-center space-x-2 p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 検索ボタン */}
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                この条件で検索する
              </button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* おすすめ物件 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} className="mb-8">おすすめ物件</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleProperties.map((property) => (
              <Card key={property.id} padding="none" hover className="overflow-hidden">
                {/* 物件画像（プレースホルダー） */}
                <div className={`h-64 bg-gradient-to-br ${property.imageColor} flex items-center justify-center`}>
                  <Text className="text-white text-2xl font-bold">物件画像</Text>
                </div>
                
                {/* 物件情報 */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">
                        ¥{property.rent.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2">/ 月</span>
                    </div>
                  </div>
                  
                  <Heading level={4} className="mb-3">
                    {property.title}
                  </Heading>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="text-lg mr-2">📍</span>
                      <Text size="sm">{property.location} - {property.nearestStation}</Text>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-lg mr-2">🏠</span>
                      <Text size="sm">{property.rooms} / {property.area}㎡</Text>
                    </div>
                  </div>
                  
                  {/* 特徴タグ */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* アクションボタン */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      お気に入り
                    </button>
                    <button className="py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                      詳細を見る
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* もっと見るボタン */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-colors">
              もっと見る
            </button>
          </div>
        </Container>
      </Section>

      {/* 賃貸の流れ */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            賃貸物件ご契約の流れ
          </Heading>
          <div className="grid md:grid-cols-5 gap-6">
            <StepCard number="1" title="物件検索" description="ご希望の条件で物件を検索" />
            <StepCard number="2" title="内見予約" description="気になる物件の内見を予約" />
            <StepCard number="3" title="入居申込" description="審査のため申込書を提出" />
            <StepCard number="4" title="契約手続き" description="重要事項説明と契約締結" />
            <StepCard number="5" title="入居開始" description="鍵の受け渡し・入居" />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" spacing="md">
        <Container>
          <div className="text-center">
            <Heading level={3} align="center" className="mb-4 text-white">
              お気軽にご相談ください
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto text-white/90">
              物件に関するご質問や内見のご予約は、お電話またはお問い合わせフォームから
            </Text>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              お問い合わせはこちら
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

// ステップカード
interface StepCardProps {
  number: string
  title: string
  description: string
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        {number}
      </div>
      <Heading level={5} className="mb-2 text-gray-900">
        {title}
      </Heading>
      <Text size="sm" color="light">
        {description}
      </Text>
    </div>
  )
}
