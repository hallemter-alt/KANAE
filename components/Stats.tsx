'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function Stats() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.stats.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.stats.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.stats.items.map((stat: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="mb-4">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t.stats.banksTitle}
            </h3>
            <p className="text-gray-600">
              {t.stats.banksSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {t.stats.banks.map((bank: string, index: number) => (
              <div key={index} className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200">
                <p className="text-sm font-semibold text-gray-900">{bank}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
