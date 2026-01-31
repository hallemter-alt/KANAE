'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  initialFilters?: any;
}

export default function SearchFilters({ onSearch, initialFilters = {} }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    city: initialFilters.city || '',
    lineId: initialFilters.lineId || '',
    stationId: initialFilters.stationId || '',
    maxWalkTime: initialFilters.maxWalkTime || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    minLandArea: initialFilters.minLandArea || '',
    maxLandArea: initialFilters.maxLandArea || '',
    minBuildingArea: initialFilters.minBuildingArea || '',
    maxBuildingArea: initialFilters.maxBuildingArea || '',
    minYield: initialFilters.minYield || '',
    maxYield: initialFilters.maxYield || '',
    propertyType: initialFilters.propertyType || '',
    maxBuildingAge: initialFilters.maxBuildingAge || '',
  });

  const [railwayLines, setRailwayLines] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);

  // 路線データを取得
  useEffect(() => {
    fetch('/api/railway-lines')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRailwayLines(data.data);
        }
      })
      .catch(console.error);
  }, []);

  // 駅データを取得（路線が選択された時）
  useEffect(() => {
    if (filters.lineId) {
      fetch(`/api/stations?lineId=${filters.lineId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStations(data.data);
          }
        })
        .catch(console.error);
    } else {
      setStations([]);
      setFilters(prev => ({ ...prev, stationId: '' }));
    }
  }, [filters.lineId]);

  const handleChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 空の値を除外
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
    
    onSearch(cleanFilters);
  };

  const handleReset = () => {
    setFilters({
      city: '',
      lineId: '',
      stationId: '',
      maxWalkTime: '',
      minPrice: '',
      maxPrice: '',
      minLandArea: '',
      maxLandArea: '',
      minBuildingArea: '',
      maxBuildingArea: '',
      minYield: '',
      maxYield: '',
      propertyType: '',
      maxBuildingAge: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* エリア検索 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">エリア</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              市区町村
            </label>
            <select
              value={filters.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="">すべて</option>
              <option value="新宿区">新宿区</option>
              <option value="渋谷区">渋谷区</option>
              <option value="港区">港区</option>
              <option value="中央区">中央区</option>
              <option value="千代田区">千代田区</option>
              <option value="品川区">品川区</option>
              <option value="目黒区">目黒区</option>
              <option value="大田区">大田区</option>
              <option value="世田谷区">世田谷区</option>
              <option value="中野区">中野区</option>
              <option value="杉並区">杉並区</option>
              <option value="豊島区">豊島区</option>
              <option value="文京区">文京区</option>
              <option value="台東区">台東区</option>
              <option value="墨田区">墨田区</option>
              <option value="江東区">江東区</option>
            </select>
          </div>
        </div>
      </div>

      {/* 路線・駅検索 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">路線・駅</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              路線
            </label>
            <select
              value={filters.lineId}
              onChange={(e) => handleChange('lineId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="">すべて</option>
              {railwayLines.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.line_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              駅
            </label>
            <select
              value={filters.stationId}
              onChange={(e) => handleChange('stationId', e.target.value)}
              disabled={!filters.lineId}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">すべて</option>
              {stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.station_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              徒歩時間
            </label>
            <select
              value={filters.maxWalkTime}
              onChange={(e) => handleChange('maxWalkTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="">指定なし</option>
              <option value="5">5分以内</option>
              <option value="10">10分以内</option>
              <option value="15">15分以内</option>
              <option value="20">20分以内</option>
            </select>
          </div>
        </div>
      </div>

      {/* 価格 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">価格</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              下限（万円）
            </label>
            <input
              type="number"
              value={filters.minPrice ? filters.minPrice / 10000 : ''}
              onChange={(e) => handleChange('minPrice', e.target.value ? parseInt(e.target.value) * 10000 : '')}
              placeholder="例：3000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上限（万円）
            </label>
            <input
              type="number"
              value={filters.maxPrice ? filters.maxPrice / 10000 : ''}
              onChange={(e) => handleChange('maxPrice', e.target.value ? parseInt(e.target.value) * 10000 : '')}
              placeholder="例：10000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* 面積 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">面積</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">土地面積（㎡）</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={filters.minLandArea}
                onChange={(e) => handleChange('minLandArea', e.target.value)}
                placeholder="下限"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
              <input
                type="number"
                value={filters.maxLandArea}
                onChange={(e) => handleChange('maxLandArea', e.target.value)}
                placeholder="上限"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">建物面積（㎡）</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={filters.minBuildingArea}
                onChange={(e) => handleChange('minBuildingArea', e.target.value)}
                placeholder="下限"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
              <input
                type="number"
                value={filters.maxBuildingArea}
                onChange={(e) => handleChange('maxBuildingArea', e.target.value)}
                placeholder="上限"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 利回り */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">想定利回り</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              下限（%）
            </label>
            <input
              type="number"
              step="0.1"
              value={filters.minYield}
              onChange={(e) => handleChange('minYield', e.target.value)}
              placeholder="例：4.0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上限（%）
            </label>
            <input
              type="number"
              step="0.1"
              value={filters.maxYield}
              onChange={(e) => handleChange('maxYield', e.target.value)}
              placeholder="例：10.0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* 物件タイプ・築年数 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">その他条件</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              物件タイプ
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="">すべて</option>
              <option value="一棟マンション">一棟マンション</option>
              <option value="一棟ビル">一棟ビル</option>
              <option value="一棟アパート">一棟アパート</option>
              <option value="一棟収益">一棟収益</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              築年数
            </label>
            <select
              value={filters.maxBuildingAge}
              onChange={(e) => handleChange('maxBuildingAge', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="">指定なし</option>
              <option value="5">5年以内</option>
              <option value="10">10年以内</option>
              <option value="20">20年以内</option>
              <option value="30">30年以内</option>
            </select>
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Search className="w-5 h-5" />
          この条件で検索
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          条件をクリア
        </button>
      </div>
    </form>
  );
}
