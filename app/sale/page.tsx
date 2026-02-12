'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container, Section, Heading, Text } from '@/components/ui/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function SalePage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Dark Gradient */}
      <Section background="gradient" spacing="hero">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              {t.sale.title}
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              {t.sale.subtitle}
            </Text>
          </div>
        </Container>
      </Section>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.sale.searchTitle}</h2>
            
            <div className="space-y-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.sale.propertyType}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'apartment', label: t.sale.apartment },
                    { key: 'house', label: t.sale.house },
                    { key: 'land', label: t.sale.land }
                  ].map((type) => (
                    <label key={type.key} className="flex items-center space-x-2 p-4 border-2 border-gray-300 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
                      <input type="radio" name="propertyType" className="text-primary-600 focus:ring-primary-500" />
                      <span className="text-gray-900 font-semibold">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.sale.location}
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white">
                  <option className="text-gray-900">{t.sale.locationPlaceholder}</option>
                  <option className="text-gray-900">{locale === 'ja' ? '東京都' : locale === 'zh' ? '东京都' : 'Tokyo'}</option>
                  <option className="text-gray-900">{locale === 'ja' ? '神奈川県' : locale === 'zh' ? '神奈川县' : 'Kanagawa'}</option>
                  <option className="text-gray-900">{locale === 'ja' ? '千葉県' : locale === 'zh' ? '千叶县' : 'Chiba'}</option>
                  <option className="text-gray-900">{locale === 'ja' ? '埼玉県' : locale === 'zh' ? '埼玉县' : 'Saitama'}</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {t.sale.minPrice}
                  </label>
                  <input
                    type="number"
                    placeholder={t.sale.pricePlaceholder}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {t.sale.maxPrice}
                  </label>
                  <input
                    type="number"
                    placeholder="100000000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg">
                {t.sale.searchButton}
              </button>
            </div>
          </div>

          {/* Featured Properties */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.rent.recommended}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, type: 'apartment', price: '58,000,000', area: '70㎡' },
                { id: 2, type: 'house', price: '72,000,000', area: '120㎡' },
                { id: 3, type: 'apartment', price: '45,000,000', area: '65㎡' },
                { id: 4, type: 'land', price: '30,000,000', area: '100㎡' },
              ].map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gold-400 to-gold-600" />
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full mb-2">
                      {property.type === 'apartment' ? t.sale.apartment : property.type === 'house' ? t.sale.house : t.sale.land}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {locale === 'ja' ? `¥${property.price}` : locale === 'zh' ? `¥${property.price}` : `¥${property.price}`}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {locale === 'ja' ? 'サンプル物件' : locale === 'zh' ? '样板房源' : 'Sample Property'} {property.id}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {locale === 'ja' ? '東京都世田谷区' : locale === 'zh' ? '东京都世田谷区' : 'Setagaya, Tokyo'} / {property.area}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        {locale === 'ja' ? '駅近' : locale === 'zh' ? '近车站' : 'Near Station'}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {locale === 'ja' ? '南向き' : locale === 'zh' ? '朝南' : 'South-Facing'}
                      </span>
                    </div>
                    <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      {t.rent.viewDetails}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
