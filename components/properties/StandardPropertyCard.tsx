/**
 * Standard Property Card Component
 * For regular investment properties (non-premium)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, TrendingUp, Building2, Calendar } from 'lucide-react';

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
  property_stations?: any[];
  images: string[];
}

interface StandardPropertyCardProps {
  property: Property;
}

export default function StandardPropertyCard({ property }: StandardPropertyCardProps) {
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

  const getYear = (dateString: string): string => {
    if (!dateString) return '—';
    return dateString.substring(0, 4) + '年';
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.property_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-20 h-20 text-sky-300" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Property Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">
            {property.property_name}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
            <span className="line-clamp-1">{property.address_full}</span>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-t border-b border-gray-100">
            {/* Price */}
            <div>
              <div className="text-xs text-gray-500 mb-1">販売価格</div>
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Yield */}
            {property.yield_surface && (
              <div>
                <div className="text-xs text-gray-500 mb-1">表面利回り</div>
                <div className="text-lg font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {formatYield(property.yield_surface)}
                </div>
              </div>
            )}
          </div>

          {/* Structure & Year */}
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{property.building_structure}</span>
            </div>
            {property.construction_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{getYear(property.construction_date)}</span>
              </div>
            )}
          </div>

          {/* Property Type Badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
              {property.property_type}
            </span>
            {property.occupancy_status && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {property.occupancy_status}
              </span>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 mb-4 flex-1">
            {property.land_area_tsubo && (
              <div className="flex justify-between">
                <span>土地面積:</span>
                <span className="font-semibold">{property.land_area_tsubo.toFixed(2)}坪</span>
              </div>
            )}
            {property.building_area_tsubo && (
              <div className="flex justify-between">
                <span>建物面積:</span>
                <span className="font-semibold">{property.building_area_tsubo.toFixed(2)}坪</span>
              </div>
            )}
            {property.total_units && (
              <div className="flex justify-between">
                <span>総戸数:</span>
                <span className="font-semibold">{property.total_units}戸</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-[1.02]">
            詳細を見る
          </button>
        </div>
      </div>
    </Link>
  );
}
