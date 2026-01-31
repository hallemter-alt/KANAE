/**
 * Premium Investment Properties Page
 * 高級投資物件検索ページ
 */

'use client';

import { useState, useEffect } from 'react';
import { Building2, TrendingUp, Filter as FilterIcon } from 'lucide-react';
import PropertyCard, { PropertyCardSkeleton } from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import type { PremiumProperty, PropertyFilterParams, PropertySearchResult } from '@/lib/types/premium-property';

export default function PremiumPropertiesPage() {
  const [searchResult, setSearchResult] = useState<PropertySearchResult | null>(null);
  const [filters, setFilters] = useState<PropertyFilterParams>({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Build query parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, String(value));
          }
        }
      });

      const response = await fetch(`/api/premium-properties?${params}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: PropertyFilterParams) => {
    setFilters(newFilters);
  };

  const properties = searchResult?.properties || [];
  const totalCount = searchResult?.total_count || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                プレミアム投資物件
              </h1>
            </div>
            <p className="text-xl text-sky-100 mb-6">
              新宿区・RC造・築浅の高級投資用不動産
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>高利回り物件多数</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>IoT・防音など特殊設備完備</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <FilterIcon className="w-5 h-5" />
            <span className="font-semibold">筛选条件</span>
            {Object.keys(filters).length > 0 && (
              <span className="bg-sky-600 text-white px-2 py-1 rounded-full text-xs">
                {Object.keys(filters).length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-4">
              <PropertyFilters
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                language="ja"
              />
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  検索結果
                </h2>
                {!loading && (
                  <p className="text-gray-600">
                    {totalCount}件の物件が見つかりました
                  </p>
                )}
              </div>

              {/* Sort Dropdown */}
              <select
                value={filters.sort_by || 'priority'}
                onChange={(e) => handleFilterChange({ ...filters, sort_by: e.target.value as any })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
              >
                <option value="priority">おすすめ順</option>
                <option value="price_asc">価格: 低い順</option>
                <option value="price_desc">価格: 高い順</option>
                <option value="yield_desc">利回り: 高い順</option>
                <option value="completion_desc">竣工日: 新しい順</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && properties.length === 0 && (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  物件が見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-6">
                  筛选条件を変更してもう一度お試しください
                </p>
                <button
                  onClick={() => handleFilterChange({})}
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  筛选条件をクリア
                </button>
              </div>
            )}

            {/* Properties Grid */}
            {!loading && properties.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      language="ja"
                      showBadges={true}
                      showYield={true}
                      showLocation={true}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {searchResult && searchResult.total_pages > 1 && (
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: searchResult.total_pages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handleFilterChange({ ...filters, page })}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          page === (filters.page || 1)
                            ? 'bg-sky-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            投資物件についてのご相談
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            専門スタッフが丁寧にサポートいたします
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-sky-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
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
      </div>
    </div>
  );
}
