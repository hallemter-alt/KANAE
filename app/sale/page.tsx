'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SalePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              売買物件検索
            </h1>
            <p className="text-xl text-gray-600">
              マンション・一戸建て・土地など、資産価値の高い物件をご提案します
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">物件を探す</h2>
            
            <div className="space-y-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  物件種別
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['マンション', '一戸建て', '土地'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 p-4 border-2 border-gray-300 rounded-lg hover:border-amber-500 cursor-pointer transition-colors">
                      <input type="radio" name="propertyType" className="text-amber-600 focus:ring-amber-500" />
                      <span className="text-gray-700 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  エリア
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option>東京都</option>
                  <option>神奈川県</option>
                  <option>千葉県</option>
                  <option>埼玉県</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    価格（下限）
                  </label>
                  <input
                    type="number"
                    placeholder="30000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    価格（上限）
                  </label>
                  <input
                    type="number"
                    placeholder="100000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                物件を検索
              </button>
            </div>
          </div>

          {/* Featured Properties */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">おすすめ物件</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, type: 'マンション', price: '5,800万円', area: '70㎡' },
                { id: 2, type: '一戸建て', price: '7,200万円', area: '120㎡' },
                { id: 3, type: 'マンション', price: '4,500万円', area: '65㎡' },
                { id: 4, type: '土地', price: '3,000万円', area: '100㎡' },
              ].map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gold-400 to-gold-600" />
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full mb-2">
                      {property.type}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {property.price}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      サンプル物件 {property.id}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      東京都世田谷区 / {property.area}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        駅近
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        南向き
                      </span>
                    </div>
                    <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      詳細を見る
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
