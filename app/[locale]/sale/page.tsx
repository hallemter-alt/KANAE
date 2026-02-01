/**
 * Unified Sale Page - 統合された買卖页面
 * Combines regular sale properties and investment properties
 */

'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, TrendingUp, Filter, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PropertyFilterParams } from '@/lib/types/premium-property';

type PropertyCategory = 'all' | 'residential' | 'investment';

interface Property {
  id: string;
  property_name: string;
  property_type: string;
  price: number;
  address_full: string;
  yield_surface?: number;
  building_structure?: string;
  total_units?: number;
  [key: string]: any;
}

function UnifiedSaleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLanguage();
  
  const [category, setCategory] = useState<PropertyCategory>('all');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PropertyFilterParams>({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category') as PropertyCategory;
    if (categoryParam && ['all', 'residential', 'investment'].includes(categoryParam)) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      // Build query based on category
      const params = new URLSearchParams();
      
      // Add category filter
      if (category === 'investment') {
        params.append('type', 'investment');
      } else if (category === 'residential') {
        params.append('type', 'residential');
      }
      
      // Add other filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, String(value));
          }
        }
      });
      
      // Add pagination
      params.append('page', String(pagination.page));
      params.append('limit', String(pagination.limit));

      const response = await fetch(`/api/properties/unified-search?${params}`);
      const data = await response.json();

      if (data.success) {
        setProperties(data.properties || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  }, [category, filters, pagination.page, pagination.limit]);

  // Fetch properties when category or filters change
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleCategoryChange = (newCategory: PropertyCategory) => {
    setCategory(newCategory);
    setFilters({}); // Reset filters when changing category
    setPagination({ ...pagination, page: 1 });
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    params.set('category', newCategory);
    router.push(`/${locale}/sale?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: PropertyFilterParams) => {
    setFilters(newFilters);
    setPagination({ ...pagination, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-gold-900/90 text-white py-20">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E')`
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              売買物件検索
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              住宅用・投資用の多様な物件をご提案
            </p>
          </div>

          {/* Category Selection */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                物件カテゴリを選択
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                    category === 'all'
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500'
                  }`}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-lg font-bold mb-1">すべて</div>
                  <div className="text-sm opacity-90">全物件を表示</div>
                </button>

                <button
                  onClick={() => handleCategoryChange('residential')}
                  className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                    category === 'residential'
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500'
                  }`}
                >
                  <Home className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-lg font-bold mb-1">住宅用</div>
                  <div className="text-sm opacity-90">マンション・戸建</div>
                </button>

                <button
                  onClick={() => handleCategoryChange('investment')}
                  className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                    category === 'investment'
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500'
                  }`}
                >
                  <TrendingUp className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-lg font-bold mb-1">投資用</div>
                  <div className="text-sm opacity-90">収益物件</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-4">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">詳細検索</span>
                  </button>
                </div>

                {/* Filters */}
                <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
                  <PropertyFilters
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                    language={locale as 'ja' | 'en' | 'zh'}
                    propertyCategory={category}
                  />
                </div>
              </div>
            </aside>

            {/* Properties Grid */}
            <main className="lg:col-span-3">
              {/* Results Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {category === 'all' && 'すべての物件'}
                      {category === 'residential' && '住宅用物件'}
                      {category === 'investment' && '投資用物件'}
                    </h2>
                    <p className="text-gray-600">
                      全 <span className="font-semibold text-primary-600">{pagination.total}</span> 件
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
                        const value = e.target.value;
                        handleFilterChange({
                          ...filters,
                          sort_by: value as any,
                        });
                      }}
                    >
                      <option value="priority">おすすめ順</option>
                      <option value="price_asc">価格: 安い順</option>
                      <option value="price_desc">価格: 高い順</option>
                      {category === 'investment' && (
                        <option value="yield_desc">利回り: 高い順</option>
                      )}
                      <option value="completion_desc">築年数: 新しい順</option>
                    </select>
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property as any}
                      language={locale as 'ja' | 'en' | 'zh'}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && properties.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    物件が見つかりませんでした
                  </h3>
                  <p className="text-gray-600 mb-6">
                    検索条件を変更してもう一度お試しください
                  </p>
                  <button
                    onClick={() => {
                      setFilters({});
                      setCategory('all');
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
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            物件についてのご相談
          </h2>
          <p className="text-xl text-white/90 mb-8">
            専門スタッフが丁寧にサポートいたします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              お問い合わせ
            </a>
            <a
              href="tel:03-6914-3633"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              📞 03-6914-3633
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Wrap in Suspense to handle useSearchParams
export default function UnifiedSalePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <UnifiedSaleContent />
    </Suspense>
  );
}
