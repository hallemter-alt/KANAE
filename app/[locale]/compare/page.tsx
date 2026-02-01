/**
 * Property Comparison Page
 * Compare multiple properties side by side
 */

'use client';

import { useState, useEffect } from 'react';
import { Scale, X, TrendingUp, Building2, Calendar, Ruler, Layers, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useComparison } from '@/contexts/ComparisonContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface Property {
  id: string;
  property_name: string;
  property_type: string;
  price: number;
  address_full: string;
  yield_surface?: number;
  building_structure?: string;
  total_units?: number;
  land_area?: number;
  building_area?: number;
  completion_year?: number;
  image_url?: string;
  [key: string]: any;
}

export default function ComparisonPage() {
  const { locale } = useLanguage();
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const propertyPromises = comparisonList.map(async (item) => {
          try {
            const response = await fetch(`/api/properties/${item.id}`);
            if (response.ok) {
              return await response.json();
            }
            return null;
          } catch (error) {
            console.error(`Failed to fetch property ${item.id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(propertyPromises);
        const validProperties = results.filter((p): p is Property => p !== null);
        setProperties(validProperties);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (comparisonList.length > 0) {
      fetchProperties();
    } else {
      setProperties([]);
      setLoading(false);
    }
  }, [comparisonList]);

  const formatPrice = (price: number): string => {
    const oku = Math.floor(price / 100000000);
    const man = Math.floor((price % 100000000) / 10000);
    
    if (oku > 0) {
      return `${oku}億${man > 0 ? `${man}万` : ''}円`;
    }
    return `${man}万円`;
  };

  const formatYield = (yield_value?: number): string => {
    return yield_value ? `${yield_value.toFixed(2)}%` : '—';
  };

  const labels = {
    ja: {
      title: '物件比較',
      subtitle: '選択した物件を並べて比較',
      empty: '比較する物件がありません',
      emptyDesc: '物件詳細ページから比較に追加してください',
      clearAll: 'すべてクリア',
      price: '価格',
      yield: '期待利回り',
      location: '所在地',
      structure: '建物構造',
      completion: '竣工年',
      landArea: '土地面積',
      buildingArea: '建物面積',
      units: '総戸数',
      viewDetails: '詳細を見る',
    },
    en: {
      title: 'Property Comparison',
      subtitle: 'Compare selected properties side by side',
      empty: 'No properties to compare',
      emptyDesc: 'Add properties to comparison from the property detail page',
      clearAll: 'Clear All',
      price: 'Price',
      yield: 'Expected Yield',
      location: 'Location',
      structure: 'Structure',
      completion: 'Completion',
      landArea: 'Land Area',
      buildingArea: 'Building Area',
      units: 'Total Units',
      viewDetails: 'View Details',
    },
    zh: {
      title: '房产比较',
      subtitle: '并排比较所选房产',
      empty: '没有要比较的房产',
      emptyDesc: '从房产详情页添加到比较',
      clearAll: '清除全部',
      price: '价格',
      yield: '预期收益率',
      location: '位置',
      structure: '建筑结构',
      completion: '竣工年份',
      landArea: '土地面积',
      buildingArea: '建筑面积',
      units: '总户数',
      viewDetails: '查看详情',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.ja;

  const comparisonFields = [
    { key: 'price', label: t.price, icon: TrendingUp, format: (v: any) => formatPrice(v) },
    { key: 'yield_surface', label: t.yield, icon: TrendingUp, format: (v: any) => formatYield(v) },
    { key: 'address_full', label: t.location, icon: MapPin, format: (v: any) => v },
    { key: 'building_structure', label: t.structure, icon: Building2, format: (v: any) => v || '—' },
    { key: 'completion_year', label: t.completion, icon: Calendar, format: (v: any) => v ? `${v}年` : '—' },
    { key: 'land_area', label: t.landArea, icon: Ruler, format: (v: any) => v ? `${v.toFixed(2)} m²` : '—' },
    { key: 'building_area', label: t.buildingArea, icon: Layers, format: (v: any) => v ? `${v.toFixed(2)} m²` : '—' },
    { key: 'total_units', label: t.units, icon: Building2, format: (v: any) => v ? `${v}戸` : '—' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="w-8 h-8" />
                  <h1 className="text-4xl font-bold">{t.title}</h1>
                </div>
                <p className="text-purple-100 text-lg">{t.subtitle}</p>
                <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold">{properties.length}</span>
                  <span className="ml-2">/ 4</span>
                </div>
              </div>
              {properties.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('すべての比較をクリアしますか？')) {
                      clearComparison();
                    }
                  }}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors font-semibold"
                >
                  {t.clearAll}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}

          {!loading && properties.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl">
              <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.empty}</h3>
              <p className="text-gray-600">{t.emptyDesc}</p>
            </div>
          )}

          {!loading && properties.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="sticky left-0 z-10 bg-gray-50 px-6 py-4 text-left">
                        <div className="font-semibold text-gray-900">比較項目</div>
                      </th>
                      {properties.map((property) => (
                        <th key={property.id} className="px-6 py-4 min-w-[280px]">
                          <div className="space-y-3">
                            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              {property.image_url && (
                                <img
                                  src={property.image_url}
                                  alt={property.property_name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              <button
                                onClick={() => removeFromComparison(property.id)}
                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-left">
                              <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                                {property.property_name}
                              </h3>
                              <Link
                                href={`/${locale}/properties/${property.id}`}
                                className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
                              >
                                {t.viewDetails} →
                              </Link>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonFields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <tr key={field.key} className="hover:bg-gray-50">
                          <td className="sticky left-0 z-10 bg-white hover:bg-gray-50 px-6 py-4 font-semibold text-gray-700">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-gray-400" />
                              {field.label}
                            </div>
                          </td>
                          {properties.map((property) => (
                            <td key={property.id} className="px-6 py-4 text-gray-900">
                              {field.format(property[field.key as keyof Property])}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {properties.map((property) => (
                  <div key={property.id} className="p-6">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                      {property.image_url && (
                        <img
                          src={property.image_url}
                          alt={property.property_name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        onClick={() => removeFromComparison(property.id)}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-4">{property.property_name}</h3>
                    
                    <div className="space-y-3">
                      {comparisonFields.map((field) => {
                        const Icon = field.icon;
                        return (
                          <div key={field.key} className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-600 mb-1">{field.label}</div>
                              <div className="font-semibold text-gray-900">
                                {field.format(property[field.key as keyof Property])}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Link
                      href={`/${locale}/properties/${property.id}`}
                      className="block mt-4 px-4 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
