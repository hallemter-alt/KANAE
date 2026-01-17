'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card, Badge } from '@/components/ui/Layout'

export default function SalePage() {
  const sampleProperties = [
    { id: 1, type: 'マンション', price: '5,800万円', area: '70㎡', location: '東京都世田谷区', features: ['駅近', '南向き', 'リノベーション済み'] },
    { id: 2, type: '一戸建て', price: '7,200万円', area: '120㎡', location: '東京都目黒区', features: ['駐車場2台', '庭付き', '角地'] },
    { id: 3, type: 'マンション', price: '4,500万円', area: '65㎡', location: '東京都品川区', features: ['駅近', 'オートロック', 'ペット可'] },
    { id: 4, type: '土地', price: '3,000万円', area: '100㎡', location: '東京都杉並区', features: ['建築条件なし', '角地', '閑静な住宅街'] },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              売買物件検索
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              マンション・一戸建て・土地など、資産価値の高い物件をご提案します
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
              {/* 物件種別 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  物件種別
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['マンション', '一戸建て', '土地'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 p-4 border-2 border-gray-300 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
                      <input type="radio" name="propertyType" className="text-primary-600 focus:ring-primary-500" />
                      <span className="text-gray-700 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* エリア */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  エリア
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-base text-gray-900 bg-white">
                  <option className="text-gray-900">エリアを選択してください</option>
                  <option className="text-gray-900">東京都</option>
                  <option className="text-gray-900">神奈川県</option>
                  <option className="text-gray-900">千葉県</option>
                  <option className="text-gray-900">埼玉県</option>
                </select>
              </div>

              {/* 価格範囲 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    価格（下限）
                  </label>
                  <input
                    type="number"
                    placeholder="例: 30000000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-base text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    価格（上限）
                  </label>
                  <input
                    type="number"
                    placeholder="例: 100000000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-base text-gray-900 bg-white"
                  />
                </div>
              </div>

              {/* 検索ボタン */}
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-[1.02] shadow-lg">
                物件を検索
              </button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* おすすめ物件 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            おすすめ物件
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleProperties.map((property) => (
              <Card key={property.id} padding="none" hover className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600" />
                <div className="p-6">
                  <Badge variant="primary" size="md" className="mb-3">
                    {property.type}
                  </Badge>
                  <div className="text-3xl font-black text-primary-600 mb-2">
                    {property.price}
                  </div>
                  <Heading level={4} className="mb-2">
                    サンプル物件 {property.id}
                  </Heading>
                  <Text size="sm" color="gray" className="mb-4">
                    {property.location} / {property.area}
                  </Text>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    詳細を見る
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 売買の流れ */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            購入の流れ
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: 1, title: '物件探し', desc: 'ご希望の条件をヒアリング' },
              { step: 2, title: '内見・見学', desc: '実際に物件をご覧いただきます' },
              { step: 3, title: '申し込み', desc: '購入申込書を提出' },
              { step: 4, title: '契約', desc: '重要事項説明・売買契約' },
              { step: 5, title: '引き渡し', desc: '残金決済・物件引き渡し' },
            ].map((item) => (
              <Card key={item.step} padding="md" className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3">
                  {item.step}
                </div>
                <Heading level={5} className="mb-2">
                  {item.title}
                </Heading>
                <Text size="sm" color="gray">
                  {item.desc}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
