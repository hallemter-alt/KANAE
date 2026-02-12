'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container, Section, Heading, Text } from '@/components/ui/Layout';
import { useState } from 'react';

export default function MinpakuPage() {
  const [formData, setFormData] = useState({
    propertyType: 'マンション',
    area: '',
    rooms: '1LDK',
    nightly_rate: '',
    occupancy_rate: '70',
    management_fee: '25',
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const nightlyRate = parseFloat(formData.nightly_rate) || 10000;
    const occupancyRate = parseFloat(formData.occupancy_rate) / 100;
    const managementFeeRate = parseFloat(formData.management_fee) / 100;

    const monthlyNights = 30;
    const bookedNights = monthlyNights * occupancyRate;
    const grossRevenue = nightlyRate * bookedNights;
    const managementFee = grossRevenue * managementFeeRate;
    const cleaningFee = bookedNights * 5000;
    const utilities = 10000;
    const platformFee = grossRevenue * 0.03;
    const totalExpenses = managementFee + cleaningFee + utilities + platformFee;
    const netRevenue = grossRevenue - totalExpenses;

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
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Dark Gradient */}
      <Section background="gradient" spacing="hero">
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
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: '完全代行', desc: 'ゲスト対応から清掃まで全てお任せください' },
              { title: '高稼働率', desc: '最適な価格設定で高い稼働率を維持' },
              { title: '安心サポート', desc: '24時間365日のトラブル対応' },
            ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-600">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Revenue Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">収支シミュレーター</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  物件種別
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                >
                  <option className="text-gray-900">マンション</option>
                  <option className="text-gray-900">一戸建て</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  面積（㎡）
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="50"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>

              {/* Rooms */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  間取り
                </label>
                <select
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                >
                  <option className="text-gray-900">1R</option>
                  <option className="text-gray-900">1K</option>
                  <option className="text-gray-900">1LDK</option>
                  <option className="text-gray-900">2LDK</option>
                  <option className="text-gray-900">3LDK</option>
                </select>
              </div>

              {/* Nightly Rate */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  1泊料金（円）
                </label>
                <input
                  type="number"
                  value={formData.nightly_rate}
                  onChange={(e) => setFormData({ ...formData, nightly_rate: e.target.value })}
                  placeholder="10000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>

              {/* Occupancy Rate */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  予想稼働率（%）
                </label>
                <input
                  type="number"
                  value={formData.occupancy_rate}
                  onChange={(e) => setFormData({ ...formData, occupancy_rate: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>

              {/* Management Fee */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  管理手数料（%）
                </label>
                <input
                  type="number"
                  value={formData.management_fee}
                  onChange={(e) => setFormData({ ...formData, management_fee: e.target.value })}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              収支を計算する
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">月次収支予想</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">収入</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">総売上</span>
                      <span className="font-semibold">¥{result.grossRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>稼働日数</span>
                      <span>{result.bookedNights}日 / 30日</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">支出</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">管理手数料</span>
                      <span>¥{result.managementFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">清掃費</span>
                      <span>¥{result.cleaningFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">水道光熱費</span>
                      <span>¥{result.utilities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">プラットフォーム手数料</span>
                      <span>¥{result.platformFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                      <span>合計支出</span>
                      <span>¥{result.totalExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 text-center">
                <div className="text-sm text-gray-600 mb-2">月間純利益</div>
                <div className="text-4xl font-bold text-amber-600">
                  ¥{result.netRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  年間予想：¥{(result.netRevenue * 12).toLocaleString()}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  無料相談を申し込む
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
