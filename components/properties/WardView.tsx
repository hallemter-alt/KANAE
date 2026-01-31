'use client';

import { useState, useEffect } from 'react';
import { MapPin, Building2, TrendingUp } from 'lucide-react';

interface WardStats {
  ward: string;
  count: number;
  avgPrice: number;
  avgYield: number;
}

interface WardViewProps {
  onWardClick: (ward: string) => void;
}

export default function WardView({ onWardClick }: WardViewProps) {
  const [wardStats, setWardStats] = useState<WardStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    fetchWardStats();
  }, []);

  const fetchWardStats = async () => {
    setLoading(true);
    try {
      // すべての物件を取得して区ごとに集計
      const response = await fetch('/api/properties/search?limit=1000');
      const result = await response.json();

      if (result.success && result.data) {
        const properties = result.data;
        
        // 区ごとに集計
        const statsMap = new Map<string, { count: number; totalPrice: number; totalYield: number }>();
        
        properties.forEach((property: any) => {
          const ward = property.address_ward || property.address_city || '不明';
          const current = statsMap.get(ward) || { count: 0, totalPrice: 0, totalYield: 0 };
          
          current.count++;
          current.totalPrice += property.price || 0;
          current.totalYield += property.yield_surface || 0;
          
          statsMap.set(ward, current);
        });

        // 配列に変換してソート
        const stats = Array.from(statsMap.entries()).map(([ward, data]) => ({
          ward,
          count: data.count,
          avgPrice: data.count > 0 ? data.totalPrice / data.count : 0,
          avgYield: data.count > 0 ? data.totalYield / data.count : 0,
        })).sort((a, b) => b.count - a.count);

        setWardStats(stats);
      }
    } catch (error) {
      console.error('Ward stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 100000000) {
      return `${(price / 100000000).toFixed(1)}億円`;
    }
    return `${(price / 10000).toFixed(0)}万円`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          エリア別物件検索
        </h2>
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            グリッド
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            リスト
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wardStats.map((stat) => (
            <button
              key={stat.ward}
              onClick={() => onWardClick(stat.ward)}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 text-left border-2 border-transparent hover:border-primary-500"
            >
              {/* Ward Name */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {stat.ward}
                  </h3>
                  <p className="text-sm text-gray-500">東京都</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">物件数</span>
                  </div>
                  <span className="text-xl font-bold text-primary-600">
                    {stat.count}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">平均価格</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(stat.avgPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">平均利回り</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {stat.avgYield.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* View Properties Link */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-primary-600 font-medium group-hover:underline">
                  物件を見る →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  エリア
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  物件数
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  平均価格
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  平均利回り
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wardStats.map((stat) => (
                <tr
                  key={stat.ward}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onWardClick(stat.ward)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {stat.ward}
                        </div>
                        <div className="text-sm text-gray-500">東京都</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {stat.count} 件
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    {formatPrice(stat.avgPrice)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center text-sm font-semibold text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.avgYield.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      物件を見る →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {wardStats.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            エリア情報がありません
          </h3>
          <p className="text-gray-600">
            物件データをインポートしてください
          </p>
        </div>
      )}
    </div>
  );
}
