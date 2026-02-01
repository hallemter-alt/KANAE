/**
 * Premium Property Card Component
 * Displays high-end investment property with Japanese real estate marketing style
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, TrendingUp, Building2, Calendar, Users } from 'lucide-react';
import type { PremiumProperty } from '@/lib/types/premium-property';

interface PropertyCardProps {
  property: PremiumProperty;
  language?: 'ja' | 'en' | 'zh';
  locale?: string;
  showBadges?: boolean;
  showYield?: boolean;
  showLocation?: boolean;
}

export default function PropertyCard({
  property,
  language = 'ja',
  locale = 'ja',
  showBadges = true,
  showYield = true,
  showLocation = true,
}: PropertyCardProps) {
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

  const getPropertyName = () => {
    switch (language) {
      case 'en': return property.name_en || property.name;
      case 'zh': return property.name_zh || property.name;
      default: return property.name;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'en': return property.description_en || property.description;
      case 'zh': return property.description_zh || property.description;
      default: return property.description_ja || property.description;
    }
  };

  const getHeadline = () => {
    switch (language) {
      case 'en': return property.headline_en;
      case 'zh': return property.headline_zh;
      default: return property.headline_ja;
    }
  };

  const getFeatures = () => {
    switch (language) {
      case 'en': return property.features_en;
      case 'zh': return property.features_zh;
      default: return property.features_ja;
    }
  };

  const getBadgeColor = (feature: string): string => {
    if (feature.includes('IoT') || feature.includes('スマート') || feature.includes('智能')) return 'bg-blue-100 text-blue-800';
    if (feature.includes('民泊') || feature.includes('Minpaku') || feature.includes('民宿')) return 'bg-amber-100 text-amber-800';
    if (feature.includes('防音') || feature.includes('Soundproof') || feature.includes('隔音')) return 'bg-purple-100 text-purple-800';
    if (feature.includes('RC') || feature.includes('構造')) return 'bg-gray-100 text-gray-800';
    if (feature.includes('公園') || feature.includes('Park') || feature.includes('环境')) return 'bg-green-100 text-green-800';
    return 'bg-sky-100 text-sky-800';
  };

  const headline = getHeadline();
  const features = getFeatures();
  
  // Use locale-aware link
  const detailLink = `/${locale}/properties/${property.id}`;

  return (
    <Link href={detailLink} className="block h-full">
      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100">
          {property.image_urls && property.image_urls.length > 0 ? (
            <img
              src={property.image_urls[0]}
              alt={property.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-20 h-20 text-sky-300" />
            </div>
          )}
          
          {/* Premium Badge */}
          {property.is_premium && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {language === 'ja' && 'プレミアム'}
              {language === 'en' && 'PREMIUM'}
              {language === 'zh' && '高端'}
            </div>
          )}

          {/* Status Badge */}
          {property.status === 'coming_soon' && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {language === 'ja' && '近日公開'}
              {language === 'en' && 'COMING SOON'}
              {language === 'zh' && '即将推出'}
            </div>
          )}

          {/* Featured Star */}
          {property.is_featured && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <span className="text-amber-500 text-xl">⭐</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Property ID */}
          <div className="text-xs font-mono text-gray-500 mb-2">
            {property.id}
          </div>

          {/* Property Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">
            {getPropertyName()}
          </h3>

          {/* Headline */}
          {headline && (
            <div className="mb-3 text-sm font-semibold text-sky-700 line-clamp-2">
              {headline}
            </div>
          )}

          {/* Location */}
          {showLocation && (
            <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-t border-b border-gray-100">
            {/* Price */}
            <div>
              <div className="text-xs text-gray-500 mb-1">
                {language === 'ja' && '販売価格'}
                {language === 'en' && 'Price'}
                {language === 'zh' && '售价'}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(property.price_jpy)}
              </div>
            </div>

            {/* Yield */}
            {showYield && property.yield_expected && (
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  {language === 'ja' && '期待利回り'}
                  {language === 'en' && 'Yield'}
                  {language === 'zh' && '预期收益'}
                </div>
                <div className="text-lg font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {formatYield(property.yield_expected)}
                </div>
              </div>
            )}
          </div>

          {/* Structure & Completion */}
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{property.structure}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{property.completion_year}年</span>
            </div>
          </div>

          {/* Feature Badges */}
          {showBadges && features && features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(feature)}`}
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{features.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
            {getDescription()}
          </p>

          {/* Action Button */}
          <button className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-[1.02]">
            {language === 'ja' && '詳細を見る'}
            {language === 'en' && 'View Details'}
            {language === 'zh' && '查看详情'}
          </button>
        </div>
      </div>
    </Link>
  );
}

/**
 * Property Card Skeleton for loading state
 */
export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full animate-pulse">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="p-5 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
