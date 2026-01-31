'use client';

import { useState, useEffect } from 'react';
import { Building2, MapPin, TrendingUp, Maximize2, Search, Filter, X } from 'lucide-react';
import PropertyCard from './PropertyCard';
import SearchFilters from './SearchFilters';

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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">投資収益物件検索</h1>
          <p className="text-xl text-primary-100">
            東京都内の優良投資物件を多数掲載。エリア・路線・価格・利回りで検索
          </p>
          
          {/* クイック検索バー */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  エリア
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleSearch({ ...searchParams, city: e.target.value });
                    }
                  }}
                >
                  <option value="">すべて</option>
                  <option value="新宿区">新宿区</option>
                  <option value="渋谷区">渋谷区</option>
                  <option value="港区">港区</option>
                  <option value="中央区">中央区</option>
                  <option value="千代田区">千代田区</option>
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  価格帯
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(v => parseInt(v) * 10000000);
                    if (min) {
                      handleSearch({ ...searchParams, minPrice: min, maxPrice: max });
                    }
                  }}
                >
                  <option value="">すべて</option>
                  <option value="0-30">3,000万円以下</option>
                  <option value="30-50">3,000万円～5,000万円</option>
                  <option value="50-100">5,000万円～1億円</option>
                  <option value="100-">1億円以上</option>
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  利回り
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleSearch({ ...searchParams, minYield: parseFloat(e.target.value) });
                    }
                  }}
                >
                  <option value="">すべて</option>
                  <option value="3">3%以上</option>
                  <option value="4">4%以上</option>
                  <option value="5">5%以上</option>
                  <option value="6">6%以上</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <Filter className="w-5 h-5" />
              詳細条件で検索
            </button>
          </div>
        </div>
      </div>

      {/* 詳細検索フィルター */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">詳細検索条件</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <SearchFilters 
                  onSearch={handleSearch}
                  initialFilters={searchParams}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 検索結果サマリー */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-lg text-gray-700">
            <span className="font-bold text-2xl text-primary-600">{pagination.total}</span>
            <span className="ml-2">件の物件が見つかりました</span>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleSearch({ ...searchParams, sortBy, sortOrder });
              }}
            >
              <option value="created_at-desc">新着順</option>
              <option value="price-asc">価格が安い順</option>
              <option value="price-desc">価格が高い順</option>
              <option value="yield_surface-desc">利回りが高い順</option>
              <option value="land_area_sqm-desc">土地面積が大きい順</option>
            </select>
          </div>
        </div>

        {/* ローディング */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">条件に合う物件が見つかりませんでした</p>
            <button
              onClick={() => handleSearch({})}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              すべての物件を表示
            </button>
          </div>
        ) : (
          <>
            {/* 物件リスト */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* ページネーション */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    前へ
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= pagination.page - 2 && page <= pagination.page + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 border rounded-lg ${
                            page === pagination.page
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === pagination.page - 3 || page === pagination.page + 3) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    次へ
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
