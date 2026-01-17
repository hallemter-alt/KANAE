'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'

export default function MinpakuPage() {
  const [formData, setFormData] = useState({
    propertyType: 'マンション',
    area: '',
    rooms: '1LDK',
    nightly_rate: '',
    occupancy_rate: '70',
    management_fee: '25',
  })

  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {
    const nightlyRate = parseFloat(formData.nightly_rate) || 10000
    const occupancyRate = parseFloat(formData.occupancy_rate) / 100
    const managementFeeRate = parseFloat(formData.management_fee) / 100

    const monthlyNights = 30
    const bookedNights = monthlyNights * occupancyRate
    const grossRevenue = nightlyRate * bookedNights
    const managementFee = grossRevenue * managementFeeRate
    const cleaningFee = bookedNights * 5000
    const utilities = 10000
    const platformFee = grossRevenue * 0.03
    const totalExpenses = managementFee + cleaningFee + utilities + platformFee
    const netRevenue = grossRevenue - totalExpenses

    setResult({
      grossRevenue: Math.round(grossRevenue),
      managementFee: Math.round(managementFee),
      cleaningFee: Math.round(cleaningFee),
      utilities,
      platformFee: Math.round(platformFee),
      totalExpenses: Math.round(totalExpenses),
      netRevenue: Math.round(netRevenue),
      bookedNights: Math.round(bookedNights),
      occupancyRate: formData.occupancy_rate,
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              民泊運営代行サービス
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              お持ちの物件を民泊として運営し、安定した収益を実現します
            </Text>
          </div>
        </Container>
      </Section>

      {/* サービス特徴 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '✓', title: '完全代行', desc: 'ゲスト対応から清掃まで全てお任せください' },
              { icon: '📈', title: '高稼働率', desc: '最適な価格設定で高い稼働率を維持' },
              { icon: '🛡️', title: '安心サポート', desc: '24時間365日のトラブル対応' },
            ].map((feature, idx) => (
              <Card key={idx} padding="lg" hover className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <Heading level={4} className="mb-3">{feature.title}</Heading>
                <Text color="gray">{feature.desc}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 収支シミュレーター */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            収支シミュレーター
          </Heading>
          
          <Card padding="lg" className="shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 物件種別 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  物件種別
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 bg-white"
                >
                  <option>マンション</option>
                  <option>一戸建て</option>
                </select>
              </div>

              {/* 面積 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  面積（㎡）
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="例: 50"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 bg-white"
                />
              </div>

              {/* 間取り */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  間取り
                </label>
                <select
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 bg-white"
                >
                  <option>1R</option>
                  <option>1K</option>
                  <option>1LDK</option>
                  <option>2LDK</option>
                  <option>3LDK</option>
                </select>
              </div>

              {/* 1泊料金 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  1泊料金（円）
                </label>
                <input
                  type="number"
                  value={formData.nightly_rate}
                  onChange={(e) => setFormData({ ...formData, nightly_rate: e.target.value })}
                  placeholder="例: 10000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 bg-white"
                />
              </div>

              {/* 予想稼働率 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  予想稼働率（%）
                </label>
                <input
                  type="number"
                  value={formData.occupancy_rate}
                  onChange={(e) => setFormData({ ...formData, occupancy_rate: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 bg-white"
                />
              </div>

              {/* 管理手数料 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  管理手数料（%）
                </label>
                <input
                  type="number"
                  value={formData.management_fee}
                  onChange={(e) => setFormData({ ...formData, management_fee: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              収支を計算する
            </button>
          </Card>

          {/* 計算結果 */}
          {result && (
            <Card padding="lg" className="mt-8 bg-gradient-to-br from-primary-50 to-purple-50">
              <Heading level={3} className="mb-6">月次収支予想</Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card padding="md" className="bg-white">
                  <Heading level={5} className="mb-4 text-primary-600">収入</Heading>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text size="sm" color="gray">総売上</Text>
                      <Text size="lg" weight="bold" color="dark">¥{result.grossRevenue.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>稼働日数</span>
                      <span>{result.bookedNights}日 / 30日</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>稼働率</span>
                      <span>{result.occupancyRate}%</span>
                    </div>
                  </div>
                </Card>

                <Card padding="md" className="bg-white">
                  <Heading level={5} className="mb-4 text-purple-600">支出</Heading>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Text size="sm">管理手数料</Text>
                      <Text size="sm" weight="medium">¥{result.managementFee.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text size="sm">清掃費</Text>
                      <Text size="sm" weight="medium">¥{result.cleaningFee.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text size="sm">光熱費</Text>
                      <Text size="sm" weight="medium">¥{result.utilities.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text size="sm">プラットフォーム手数料</Text>
                      <Text size="sm" weight="medium">¥{result.platformFee.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between pt-2 border-t-2">
                      <Text size="sm" weight="bold">合計支出</Text>
                      <Text size="sm" weight="bold">¥{result.totalExpenses.toLocaleString()}</Text>
                    </div>
                  </div>
                </Card>
              </div>

              <Card padding="lg" className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <Text size="sm" className="text-white/80 mb-1">月次純利益</Text>
                    <div className="text-4xl font-black">¥{result.netRevenue.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <Text size="sm" className="text-white/80 mb-1">年間予想収益</Text>
                    <div className="text-2xl font-bold">¥{(result.netRevenue * 12).toLocaleString()}</div>
                  </div>
                </div>
              </Card>
            </Card>
          )}
        </Container>
      </Section>

      {/* 民泊運営の流れ */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            民泊運営の流れ
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: '物件査定', desc: '収益性を無料で診断' },
              { step: 2, title: '準備・登録', desc: '許可申請と設備準備' },
              { step: 3, title: '運営開始', desc: 'リスティング公開' },
              { step: 4, title: '収益管理', desc: '月次レポート提供' },
            ].map((item) => (
              <Card key={item.step} padding="md" hover className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3">
                  {item.step}
                </div>
                <Heading level={5} className="mb-2">{item.title}</Heading>
                <Text size="sm" color="gray">{item.desc}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
