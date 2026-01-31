'use client';

import Link from 'next/link';
import { Building2, MapPin, TrendingUp, Maximize2, Calendar, Train } from 'lucide-react';

interface PropertyCardProps {
  property: any;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // 価格をフォーマット（万円表示）
  const formatPrice = (price: number) => {
    if (!price) return '価格応談';
    const manYen = price / 10000;
    if (manYen >= 10000) {
      return `${(manYen / 10000).toFixed(2)}億円`;
    }
    return `${manYen.toLocaleString()}万円`;
  };

  // 面積をフォーマット
  const formatArea = (sqm: number, tsubo: number) => {
    if (!sqm) return '-';
    return (
      <>
        {sqm.toFixed(2)}㎡
        {tsubo && <span className="text-gray-500"> ({tsubo.toFixed(2)}坪)</span>}
      </>
    );
  };

  // 築年数を計算
  const getAge = (constructionDate: string) => {
    if (!constructionDate) return '-';
    const year = new Date(constructionDate).getFullYear();
    const age = new Date().getFullYear() - year;
    return `築${age}年`;
  };

  // 最寄り駅を取得
  const getPrimaryStation = () => {
    const stations = property.property_stations || [];
    if (stations.length === 0) return null;
    
    // is_primary がある駅を探す
    const primary = stations.find((ps: any) => ps.is_primary);
    return primary || stations[0];
  };

  const primaryStation = getPrimaryStation();

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group">
        {/* 画像 */}
        <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.property_name || '物件画像'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          {/* 物件タイプバッジ */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
              {property.property_type || '一棟収益'}
            </span>
          </div>
          
          {/* 利回りバッジ */}
          {property.yield_surface && (
            <div className="absolute top-3 right-3">
              <div className="px-3 py-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-sm font-bold rounded-full flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {property.yield_surface.toFixed(2)}%
              </div>
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          {/* 価格 */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* 物件名 */}
          {property.property_name && (
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {property.property_name}
            </h3>
          )}

          {/* 所在地 */}
          <div className="flex items-start gap-2 text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm line-clamp-2">
              {property.address_full || `${property.address_city || ''}`}
            </span>
          </div>

          {/* 最寄り駅 */}
          {primaryStation && (
            <div className="flex items-center gap-2 text-gray-600 mb-3 pb-3 border-b border-gray-200">
              <Train className="w-4 h-4 flex-shrink-0" />
              <div className="text-sm line-clamp-1">
                <span className="font-medium" style={{ color: primaryStation.line?.line_color }}>
                  {primaryStation.line?.line_name}
                </span>
                <span className="mx-1">「{primaryStation.station?.station_name}」</span>
                <span className="text-gray-500">徒歩{primaryStation.walk_time}分</span>
              </div>
            </div>
          )}

          {/* 物件情報グリッド */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {/* 土地面積 */}
            <div>
              <div className="text-gray-500 text-xs mb-1">土地面積</div>
              <div className="font-medium text-gray-900">
                {formatArea(property.land_area_sqm, property.land_area_tsubo)}
              </div>
            </div>

            {/* 建物面積 */}
            <div>
              <div className="text-gray-500 text-xs mb-1">建物面積</div>
              <div className="font-medium text-gray-900">
                {formatArea(property.building_area_sqm, property.building_area_tsubo)}
              </div>
            </div>

            {/* 構造 */}
            {property.building_structure && (
              <div>
                <div className="text-gray-500 text-xs mb-1">構造</div>
                <div className="font-medium text-gray-900 truncate">
                  {property.building_structure}
                </div>
              </div>
            )}

            {/* 築年数 */}
            {property.construction_date && (
              <div>
                <div className="text-gray-500 text-xs mb-1">築年数</div>
                <div className="font-medium text-gray-900">
                  {getAge(property.construction_date)}
                </div>
              </div>
            )}

            {/* 総戸数 */}
            {property.total_units && (
              <div>
                <div className="text-gray-500 text-xs mb-1">総戸数</div>
                <div className="font-medium text-gray-900">
                  {property.total_units}戸
                </div>
              </div>
            )}

            {/* 稼働状況 */}
            {property.occupancy_status && (
              <div>
                <div className="text-gray-500 text-xs mb-1">稼働状況</div>
                <div className="font-medium">
                  <span className={`
                    px-2 py-0.5 rounded text-xs
                    ${property.occupancy_status === '満室' 
                      ? 'bg-green-100 text-green-800' 
                      : property.occupancy_status === '賃貸中'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {property.occupancy_status}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 詳細を見るボタン */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-primary-600 font-medium text-sm flex items-center justify-between group-hover:text-primary-700">
              <span>詳細を見る</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
