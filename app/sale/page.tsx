'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/Reveal';
import { Container, Section, Heading, Text } from '@/components/ui/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import LineSelector from '@/components/search/LineSelector';

const inputClass =
  'w-full px-4 py-3 bg-white/80 border hairline focus:border-ink/40 transition-colors text-sm text-ink placeholder:text-ink/35';

const propertyImages = [IMAGES.geometric, IMAGES.concreteColumns, IMAGES.windowLight, IMAGES.pavementFog];

export default function SalePage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [selectedLines, setSelectedLines] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="For Sale"
        title={t.sale.title}
        subtitle={t.sale.subtitle}
        image="geometric"
        alt="陰影の美しいミニマルな建築"
      />

      {/* 検索 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal>
            <div className="border hairline bg-gold-50/60 p-7 md:p-12">
              <p className="section-label mb-3">Search</p>
              <Heading level={3} className="mb-10 text-ink">{t.sale.searchTitle}</Heading>

              <div className="space-y-8">
                {/* 物件種別 */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {t.sale.propertyType}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'apartment', label: t.sale.apartment },
                      { key: 'house', label: t.sale.house },
                      { key: 'land', label: t.sale.land },
                    ].map((type) => (
                      <label
                        key={type.key}
                        className="flex items-center gap-3 py-3 px-4 bg-white/80 border border-ink/15 hover:border-ink/40 cursor-pointer transition-colors duration-300 text-sm text-ink/70"
                      >
                        <input type="radio" name="propertyType" className="accent-ink" />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* エリア */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {t.sale.location}
                  </label>
                  <select className={inputClass}>
                    <option>{t.sale.locationPlaceholder}</option>
                    <option>{locale === 'ja' ? '東京都' : locale === 'zh' ? '東京都' : 'Tokyo'}</option>
                    <option>{locale === 'ja' ? '神奈川県' : locale === 'zh' ? '神奈川縣' : 'Kanagawa'}</option>
                    <option>{locale === 'ja' ? '千葉県' : locale === 'zh' ? '千葉縣' : 'Chiba'}</option>
                    <option>{locale === 'ja' ? '埼玉県' : locale === 'zh' ? '埼玉縣' : 'Saitama'}</option>
                  </select>
                </div>

                {/* 沿線選択 */}
                <LineSelector locale={locale} selected={selectedLines} onChange={setSelectedLines} />

                {/* 価格範囲 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                      {t.sale.minPrice}
                    </label>
                    <input type="number" placeholder={t.sale.pricePlaceholder} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                      {t.sale.maxPrice}
                    </label>
                    <input type="number" placeholder="100,000,000" className={inputClass} />
                  </div>
                </div>

                <button className="w-full bg-ink text-washi py-4 text-sm tracking-[0.25em] hover:bg-gold-800 transition-colors duration-500">
                  {t.sale.searchButton}
                </button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* おすすめ物件 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Pick Up</p>
            <Heading level={2} className="text-ink">{t.rent.recommended}</Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {[
              { id: 1, type: 'apartment', price: '58,000,000', area: '70㎡' },
              { id: 2, type: 'house', price: '72,000,000', area: '120㎡' },
              { id: 3, type: 'apartment', price: '45,000,000', area: '65㎡' },
              { id: 4, type: 'land', price: '30,000,000', area: '100㎡' },
            ].map((property, index) => (
              <Reveal key={property.id} delay={(index % 2) as 0 | 1}>
                <article className="group">
                  <div className="img-breathe relative overflow-hidden aspect-[4/3] mb-5 bg-gold-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${propertyImages[index]}')` }}
                      role="img"
                      aria-label={`${locale === 'ja' ? 'サンプル物件' : locale === 'zh' ? '樣板房源' : 'Sample Property'} ${property.id}`}
                    />
                    <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
                    <p className="absolute bottom-0 left-0 bg-ink/85 text-washi px-5 py-2.5 font-serif text-lg">
                      ¥{property.price}
                    </p>
                  </div>

                  <p className="text-gold-600 text-xs tracking-[0.2em] uppercase mb-2">
                    {property.type === 'apartment' ? t.sale.apartment : property.type === 'house' ? t.sale.house : t.sale.land}
                  </p>
                  <Heading level={4} className="mb-3 text-ink">
                    {locale === 'ja' ? 'サンプル物件' : locale === 'zh' ? '樣板房源' : 'Sample Property'} {property.id}
                  </Heading>
                  <Text size="sm" color="light" className="mb-5">
                    {locale === 'ja' ? '東京都世田谷区' : locale === 'zh' ? '東京都世田谷區' : 'Setagaya, Tokyo'} ／ {property.area}
                  </Text>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 border border-ink/15 text-ink/55 text-xs tracking-wide">
                      {locale === 'ja' ? '駅近' : locale === 'zh' ? '近車站' : 'Near Station'}
                    </span>
                    <span className="px-3 py-1 border border-ink/15 text-ink/55 text-xs tracking-wide">
                      {locale === 'ja' ? '南向き' : locale === 'zh' ? '朝南' : 'South-Facing'}
                    </span>
                  </div>

                  <button className="w-full py-2.5 bg-ink text-washi text-sm tracking-widest hover:bg-gold-800 transition-colors duration-500">
                    {t.rent.viewDetails}
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" spacing="md">
        <Container>
          <Reveal className="text-center">
            <Heading level={3} align="center" className="mb-4 text-washi">
              {t.management.ctaTitle}
            </Heading>
            <Text size="base" className="mb-10 max-w-2xl mx-auto !text-washi/60">
              {t.management.ctaDescription}
            </Text>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-washi text-ink px-9 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
            >
              {t.management.ctaButton}
            </a>
          </Reveal>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
