/**
 * Property Detail Page
 * Displays comprehensive information about a single property
 */

'use client';

import { use } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  TrendingUp, 
  Building2, 
  Calendar, 
  Home,
  Ruler,
  Layers,
  Train,
  Star,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PropertyDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

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
  description?: string;
  image_url?: string;
  features?: string[];
  access_stations?: Array<{
    line: string;
    station: string;
    walk_minutes: number;
  }>;
}

export default function PropertyDetailPage(props: PropertyDetailPageProps) {
  const params = use(props.params);
  const { locale, t } = useLanguage();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          console.error('Property not found');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.property_name,
          text: `${property?.property_name} - ${property?.address_full}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('リンクをコピーしました！');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-gray-200 rounded-xl" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="space-y-4">
                  <div className="h-64 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              物件が見つかりませんでした
            </h1>
            <p className="text-gray-600 mb-8">
              お探しの物件は存在しないか、すでに削除されています。
            </p>
            <Link
              href={`/${locale}/sale`}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              物件一覧に戻る
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Placeholder images if none available
  const images = property.image_url 
    ? [property.image_url] 
    : [
        '/images/property-placeholder-1.jpg',
        '/images/property-placeholder-2.jpg',
        '/images/property-placeholder-3.jpg',
      ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href={`/${locale}`} className="hover:text-primary-600">
                ホーム
              </Link>
              <span>/</span>
              <Link href={`/${locale}/sale`} className="hover:text-primary-600">
                売買物件
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{property.property_name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-[16/10] bg-gray-100">
                  {images.length > 0 && (
                    <img
                      src={images[currentImageIndex]}
                      alt={property.property_name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Gallery Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex 
                                ? 'bg-white w-8' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-primary-600' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${property.property_name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                {/* Title & Actions */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-mono text-gray-500 mb-2">
                      {property.id}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.property_name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{property.address_full}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-3 rounded-full border-2 transition-all ${
                        isFavorite 
                          ? 'bg-red-50 border-red-500 text-red-500' 
                          : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-full border-2 border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Feature Badges */}
                {property.features && property.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {property.description && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">物件の特徴</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Property Details */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">物件詳細</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.building_structure && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">建物構造</div>
                          <div className="font-semibold text-gray-900">{property.building_structure}</div>
                        </div>
                      </div>
                    )}
                    
                    {property.completion_year && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">竣工年</div>
                          <div className="font-semibold text-gray-900">{property.completion_year}年</div>
                        </div>
                      </div>
                    )}
                    
                    {property.land_area && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Ruler className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">土地面積</div>
                          <div className="font-semibold text-gray-900">{property.land_area.toFixed(2)} m²</div>
                        </div>
                      </div>
                    )}
                    
                    {property.building_area && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Layers className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">建物面積</div>
                          <div className="font-semibold text-gray-900">{property.building_area.toFixed(2)} m²</div>
                        </div>
                      </div>
                    )}
                    
                    {property.total_units && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Home className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600 mb-1">総戸数</div>
                          <div className="font-semibold text-gray-900">{property.total_units}戸</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Access Information */}
                {property.access_stations && property.access_stations.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">交通アクセス</h2>
                    <div className="space-y-3">
                      {property.access_stations.map((station, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Train className="w-5 h-5 text-primary-600" />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {station.line} {station.station}駅
                            </div>
                            <div className="text-sm text-gray-600">
                              徒歩{station.walk_minutes}分
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">販売価格</div>
                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    {formatPrice(property.price)}
                  </div>

                  {property.yield_surface && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">期待利回り</div>
                        <div className="flex items-center gap-1 text-2xl font-bold text-green-600">
                          <TrendingUp className="w-5 h-5" />
                          {formatYield(property.yield_surface)}
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl mb-3">
                    お問い合わせ
                  </button>
                  
                  <button className="w-full py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all">
                    資料請求
                  </button>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">お問い合わせ</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <div className="font-semibold mb-1">KANAE 株式会社</div>
                      <div>不動産事業部</div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        03-XXXX-XXXX
                      </div>
                      <div className="text-xs text-gray-600">
                        営業時間: 9:00 - 18:00 (平日)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
