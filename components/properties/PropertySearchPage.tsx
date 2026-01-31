'use client';

import { useState, useEffect } from 'react';
import { Building2, MapPin, TrendingUp, Maximize2, Search, Filter, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import PropertyCard from './PropertyCard';
import SearchFilters from './SearchFilters';
import WardView from './WardView';

interface Property {
  id: string;
  property_name: string;
  property_type: string;
  price: number;
  address_city: string;
  address_full: string;
  land_area_sqm: number;
  land_area_tsubo: number;
  building_area_sqm: number;
  building_area_tsubo: number;
  yield_surface: number;
  total_units: number;
  construction_date: string;
  building_structure: string;
  occupancy_status: string;
  property_stations: any[];
  images: string[];
}

export default function PropertySearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState<any>({});
  const [viewMode, setViewMode] = useState<'properties' | 'wards'>('properties');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const { locale } = useLanguage();
  const t = translations[locale];

  // 物件を検索
  const searchProperties = async (params: any = {}, page: number = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...params,
        page: page.toString(),
        limit: pagination.limit.toString(),
      });

      const response = await fetch(`/api/properties/search?${queryParams}`);
      const result = await response.json();

      if (result.success) {
        setProperties(result.data || []);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初回ロード
  useEffect(() => {
    searchProperties();
  }, []);

  // フィルター適用
  const handleSearch = (filters: any) => {
    setSearchParams(filters);
    searchProperties(filters, 1);
    setShowFilters(false);
  };

  // ページ変更
  const handlePageChange = (page: number) => {
    searchProperties(searchParams, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 区をクリックした時の処理
  const handleWardClick = (ward: string) => {
    const filters = { city: ward };
    setSearchParams(filters);
    searchProperties(filters, 1);
    setViewMode('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section - Matching existing design */}
      <section className="relative bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-gold-900/90 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E')`
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              投資収益物件検索
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              東京都内の投資収益物件を簡単検索
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="エリア、沿線、駅名で検索"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        searchProperties({ keyword: e.currentTarget.value }, 1);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Filter className="w-5 h-5" />
                  <span>詳細検索</span>
                </button>
              </div>
            </div>
            
            {/* Show All Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setSearchParams({});
                  searchProperties({}, 1);
                }}
                className="px-8 py-3 bg-white/95 backdrop-blur-md text-primary-600 border-2 border-primary-600 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
              >
                <Building2 className="w-5 h-5" />
                <span>すべての物件を表示</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-2xl font-bold text-gray-900">詳細検索</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              <SearchFilters onSearch={handleSearch} />
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Mode Toggle */}
          <div className="mb-8 flex items-center justify-center space-x-4">
            <button
              onClick={() => setViewMode('properties')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                viewMode === 'properties'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>物件一覧</span>
              </div>
            </button>
            <button
              onClick={() => setViewMode('wards')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                viewMode === 'wards'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>エリア別検索</span>
              </div>
            </button>
          </div>

          {/* Ward View */}
          {viewMode === 'wards' && (
            <WardView onWardClick={handleWardClick} />
          )}

          {/* Properties View */}
          {viewMode === 'properties' && (
            <>
          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  検索結果
                </h2>
                <p className="text-gray-600">
                  全 <span className="font-semibold text-primary-600">{pagination.total}</span> 件の物件が見つかりました
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">
                  並び替え:
                </label>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    searchProperties({ ...searchParams, sortBy, sortOrder }, 1);
                  }}
                >
                  <option value="price-asc">価格: 安い順</option>
                  <option value="price-desc">価格: 高い順</option>
                  <option value="yield_surface-desc">利回り: 高い順</option>
                  <option value="yield_surface-asc">利回り: 低い順</option>
                  <option value="land_area_sqm-desc">土地面積: 広い順</option>
                  <option value="construction_date-desc">築年数: 新しい順</option>
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {properties.filter(p => p.property_type === '一棟マンション').length}
                </div>
                <div className="text-sm text-gray-600">一棟マンション</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {properties.filter(p => p.property_type === '一棟ビル').length}
                </div>
                <div className="text-sm text-gray-600">一棟ビル</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {properties.length > 0 
                    ? Math.round(properties.reduce((sum, p) => sum + (p.yield_surface || 0), 0) / properties.length * 10) / 10
                    : 0}%
                </div>
                <div className="text-sm text-gray-600">平均利回り</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {properties.length > 0
                    ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length / 10000000) / 10
                    : 0}億
                </div>
                <div className="text-sm text-gray-600">平均価格</div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && properties.length === 0 && (
            <div className="text-center py-20">
              <div className="mb-4">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                物件が見つかりませんでした
              </h3>
              <p className="text-gray-600 mb-6">
                検索条件を変更して再度お試しください
              </p>
              <button
                onClick={() => {
                  setSearchParams({});
                  searchProperties({}, 1);
                }}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all"
              >
                すべての物件を表示
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700"
              >
                前へ
              </button>

              {[...Array(pagination.totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= pagination.page - 1 && page <= pagination.page + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        pagination.page === page
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                          : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === pagination.page - 2 || page === pagination.page + 2) {
                  return <span key={page} className="text-gray-400">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700"
              >
                次へ
              </button>
            </div>
          )}
          </>
          )}
        </div>
      </section>
    </div>
  );
}
