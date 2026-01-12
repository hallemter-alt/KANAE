'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              賃貸物件検索
            </h1>
            <p className="text-xl text-gray-600">
              お客様のライフスタイルに合った理想の賃貸物件をお探しします
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">物件を探す</h2>
            
            <div className="space-y-6">
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
                    賃料（下限）
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    賃料（上限）
                  </label>
                  <input
                    type="number"
                    placeholder="200000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  間取り
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-amber-50 cursor-pointer">
                      <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500" />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
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
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600" />
                  <div className="p-6">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      ¥85,000
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      サンプル物件 {id}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      東京都渋谷区 / 1LDK / 35㎡
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        駅近
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        ペット可
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
