'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

interface FeatureItem {
  title: string;
  description: string;
  iconPath: string;
}

export default function Features() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="py-24 md:py-36 bg-washi texture-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* 見出し + 木漏れ日の帯 */}
        <Reveal className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-6">
              <p className="section-label mb-4">Why Kanae</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-5">
                {t.features.title}
              </h2>
              <p className="text-ink/60 text-sm md:text-base leading-loose max-w-lg">
                {t.features.subtitle}
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="img-breathe relative overflow-hidden aspect-[21/9]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.komorebi}')` }}
                  role="img"
                  aria-label="木漏れ日 — 葉を透かす柔らかな光"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* 特徴 — 罫線のグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l hairline">
          {(t.features.items as FeatureItem[]).map((feature, index) => (
            <Reveal
              key={index}
              delay={(index % 3) as 0 | 1 | 2}
              className="border-b border-r hairline p-8 md:p-10 group hover:bg-gold-50 transition-colors duration-700"
            >
              <span className="font-serif text-gold-400 text-xs tracking-[0.3em] block mb-6">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-lg md:text-xl text-ink mb-4 group-hover:text-gold-700 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-ink/55 text-sm leading-loose">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
