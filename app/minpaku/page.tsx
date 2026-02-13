'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container, Section, Heading, Text } from '@/components/ui/Layout';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function MinpakuPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  
  const [formData, setFormData] = useState({
    propertyType: t.sale.apartment,
    area: '',
    rooms: '1LDK',
    nightly_rate: '',
    occupancy_rate: '70',
    management_fee: '25',
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const nightlyRate = parseFloat(formData.nightly_rate) || 10000;
    const occupancyRate = parseFloat(formData.occupancy_rate) / 100;
    const managementFeeRate = parseFloat(formData.management_fee) / 100;

    const monthlyNights = 30;
    const bookedNights = monthlyNights * occupancyRate;
    const grossRevenue = nightlyRate * bookedNights;
    const managementFee = grossRevenue * managementFeeRate;
    const cleaningFee = bookedNights * 5000;
    const utilities = 10000;
    const platformFee = grossRevenue * 0.03;
    const totalExpenses = managementFee + cleaningFee + utilities + platformFee;
    const netRevenue = grossRevenue - totalExpenses;

    setResult({
      grossRevenue: Math.round(grossRevenue),
      managementFee: Math.round(managementFee),
      cleaningFee: Math.round(cleaningFee),
      utilities,
      platformFee: Math.round(platformFee),
      totalExpenses: Math.round(totalExpenses),
      netRevenue: Math.round(netRevenue),
      bookedNights: Math.round(bookedNights),
      occupancyRate: formData.occupancy_rate,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Dark Gradient */}
      <Section background="gradient" spacing="hero">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              {t.minpaku.title}
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              {t.minpaku.subtitle}
            </Text>
          </div>
        </Container>
      </Section>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Revenue Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.minpaku.calculator}</h2>
            <p className="text-gray-600 mb-6">{t.minpaku.calculatorDesc}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.minpaku.propertyType}
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                >
                  <option className="text-gray-900">{t.sale.apartment}</option>
                  <option className="text-gray-900">{t.sale.house}</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.minpaku.area}
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder={t.minpaku.areaPlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>

              {/* Layout */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.minpaku.rooms}
                </label>
                <select
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                >
                  <option className="text-gray-900">1R</option>
                  <option className="text-gray-900">1K</option>
                  <option className="text-gray-900">1LDK</option>
                  <option className="text-gray-900">2LDK</option>
                  <option className="text-gray-900">3LDK</option>
                </select>
              </div>

              {/* Nightly Rate */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.minpaku.nightlyRate}
                </label>
                <input
                  type="number"
                  value={formData.nightly_rate}
                  onChange={(e) => setFormData({ ...formData, nightly_rate: e.target.value })}
                  placeholder={t.minpaku.nightlyRatePlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>

              {/* Occupancy Rate */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.minpaku.occupancyRate}
                </label>
                <input
                  type="number"
                  value={formData.occupancy_rate}
                  onChange={(e) => setFormData({ ...formData, occupancy_rate: e.target.value })}
                  placeholder={t.minpaku.occupancyRatePlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>

              {/* Management Fee */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t.minpaku.managementFee}
                </label>
                <input
                  type="number"
                  value={formData.management_fee}
                  onChange={(e) => setFormData({ ...formData, management_fee: e.target.value })}
                  placeholder={t.minpaku.managementFeePlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
            >
              {t.minpaku.calculate}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.minpaku.results}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Income */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{t.minpaku.income}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">{t.minpaku.grossRevenue}</span>
                      <span className="text-lg font-bold text-green-700">
                        ¥{result.grossRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{t.minpaku.bookedNights}</span>
                      <span className="text-gray-900 font-semibold">
                        {result.bookedNights} {t.minpaku.nights}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expenses */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{t.minpaku.expenses}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{t.minpaku.managementFeeLabel}</span>
                      <span className="text-gray-900 font-semibold">
                        ¥{result.managementFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{t.minpaku.cleaningFee}</span>
                      <span className="text-gray-900 font-semibold">
                        ¥{result.cleaningFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{t.minpaku.utilities}</span>
                      <span className="text-gray-900 font-semibold">
                        ¥{result.utilities.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <span className="text-gray-700 font-medium">{t.minpaku.platformFee}</span>
                      <span className="text-gray-900 font-semibold">
                        ¥{result.platformFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-700">{t.minpaku.totalExpenses}</span>
                      <span className="text-lg font-bold text-red-700">
                        ¥{result.totalExpenses.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Revenue */}
              <div className="mt-6 p-6 bg-gradient-to-r from-primary-900 to-gold-900 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">{t.minpaku.netRevenue}</span>
                  <span className="text-3xl font-bold text-gold-300">
                    ¥{result.netRevenue.toLocaleString()} {t.minpaku.perMonth}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Services */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.minpaku.servicesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: t.minpaku.service1,
                  description: t.minpaku.service1Desc,
                  icon: '🔗'
                },
                {
                  title: t.minpaku.service2,
                  description: t.minpaku.service2Desc,
                  icon: '🌍'
                },
                {
                  title: t.minpaku.service3,
                  description: t.minpaku.service3Desc,
                  icon: '✨'
                },
                {
                  title: t.minpaku.service4,
                  description: t.minpaku.service4Desc,
                  icon: '📈'
                }
              ].map((service, index) => (
                <div key={index} className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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
