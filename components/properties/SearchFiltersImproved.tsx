'use client';

import { useState, useEffect } from 'react';
import { Search, X, ChevronDown, ChevronUp, MapPin, Home, Ruler, TrendingUp, Calendar, Settings } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
  initialFilters?: any;
  onFilterChange?: (filters: any, count: number) => void; // 即時結果更新
}

export default function SearchFiltersImproved({ onSearch, initialFilters = {}, onFilterChange }: SearchFiltersProps) {
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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  // 東京23区リスト
  const tokyoWards = [
    '千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区',
    '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区',
    '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区'
  ];

  // 価格プリセット（億円単位）
  const pricePresets = [
    { label: '1億円以下', max: 100000000 },
    { label: '1-3億円', min: 100000000, max: 300000000 },
    { label: '3-5億円', min: 300000000, max: 500000000 },
    { label: '5億円以上', min: 500000000 },
  ];

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

  // 駅データを取得
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

  // 即時結果カウント取得（デバウンス付き）
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResultCount();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const fetchResultCount = async () => {
    try {
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

      const queryParams = new URLSearchParams({ ...cleanFilters, limit: '1' });
      const response = await fetch(`/api/properties/search?${queryParams}`);
      const result = await response.json();
      
      if (result.success && result.pagination) {
        setResultCount(result.pagination.total);
        if (onFilterChange) {
          onFilterChange(cleanFilters, result.pagination.total);
        }
      }
    } catch (error) {
      console.error('Result count error:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handlePricePreset = (preset: any) => {
    setFilters(prev => ({
      ...prev,
      minPrice: preset.min || '',
      maxPrice: preset.max || ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
    
    onSearch(cleanFilters);
  };

  const handleReset = () => {
    const resetFilters = {
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
    };
    setFilters(resetFilters);
    onSearch({});
  };

  // 適用中のフィルター数をカウント
  const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== null && v !== undefined).length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {/* 結果カウントとクリアボタン */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            該当物件: <span className="text-2xl font-bold text-primary-600">{resultCount}</span> 件
          </div>
          {activeFilterCount > 0 && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
              {activeFilterCount} 個の条件
            </div>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>すべてクリア</span>
          </button>
        )}
      </div>

      {/* ========== 核心搜索組合 (Top-level Filters) ========== */}
      <div className="space-y-6">
        
        {/* 1. 地理位置 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">地理位置</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* エリア（区） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                エリア（区）
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
              >
                <option value="">すべてのエリア</option>
                {tokyoWards.map((ward) => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>

            {/* 路線 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                路線
              </label>
              <select
                value={filters.lineId}
                onChange={(e) => handleChange('lineId', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
              >
                <option value="">すべての路線</option>
                {railwayLines.map((line) => (
                  <option key={line.id} value={line.id}>
                    {line.line_name}
                  </option>
                ))}
              </select>
            </div>

            {/* 駅 */}
            {filters.lineId && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  駅
                </label>
                <select
                  value={filters.stationId}
                  onChange={(e) => handleChange('stationId', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
                >
                  <option value="">すべての駅</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.station_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 2. 預算範圍 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">予算範囲</h3>
          </div>

          {/* 価格プリセット */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {pricePresets.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handlePricePreset(preset)}
                className="px-3 py-2 text-sm border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-700 hover:text-primary-700 font-medium"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* 価格範囲入力 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                下限（万円）
              </label>
              <input
                type="number"
                value={filters.minPrice ? filters.minPrice / 10000 : ''}
                onChange={(e) => handleChange('minPrice', e.target.value ? parseInt(e.target.value) * 10000 : '')}
                placeholder="例：3000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3. 物件類型 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Home className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">物件タイプ</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['一棟マンション', '一棟ビル', '一棟アパート', '一棟収益'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('propertyType', filters.propertyType === type ? '' : type)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  filters.propertyType === type
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 4. 面積 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Ruler className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">面積</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">土地面積（㎡）</div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={filters.minLandArea}
                  onChange={(e) => handleChange('minLandArea', e.target.value)}
                  placeholder="下限"
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
                />
                <input
                  type="number"
                  value={filters.maxLandArea}
                  onChange={(e) => handleChange('maxLandArea', e.target.value)}
                  placeholder="上限"
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
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
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
                />
                <input
                  type="number"
                  value={filters.maxBuildingArea}
                  onChange={(e) => handleChange('maxBuildingArea', e.target.value)}
                  placeholder="上限"
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== 進階篩選 (Advanced Filters) ========== */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">詳細条件</span>
          </div>
          {showAdvanced ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            {/* 利回り */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary-600" />
                <h4 className="font-semibold text-gray-900">想定利回り（%）</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.1"
                  value={filters.minYield}
                  onChange={(e) => handleChange('minYield', e.target.value)}
                  placeholder="下限（例：4.0）"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
                <input
                  type="number"
                  step="0.1"
                  value={filters.maxYield}
                  onChange={(e) => handleChange('maxYield', e.target.value)}
                  placeholder="上限（例：10.0）"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            {/* 築年数 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-primary-600" />
                <h4 className="font-semibold text-gray-900">築年数</h4>
              </div>
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

            {/* 徒歩時間 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-4 h-4 text-primary-600" />
                <h4 className="font-semibold text-gray-900">駅徒歩時間</h4>
              </div>
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
        )}
      </div>

      {/* ボタン */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold text-lg"
        >
          <Search className="w-6 h-6" />
          検索する（{resultCount}件）
        </button>
      </div>
    </form>
  );
}
