'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/Reveal';
import { Container, Section, Heading, Text } from '@/components/ui/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const inputClass =
  'w-full px-4 py-3 bg-white/80 border hairline focus:border-ink/40 transition-colors text-sm text-ink placeholder:text-ink/35';
const labelClass = 'block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3';

interface CalcResult {
  grossRevenue: number;
  managementFee: number;
  cleaningFee: number;
  utilities: number;
  platformFee: number;
  totalExpenses: number;
  netRevenue: number;
  bookedNights: number;
  occupancyRate: string;
}

export default function MinpakuPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const [formData, setFormData] = useState({
    propertyType: 'apartment',
    area: '',
    rooms: '1LDK',
    nightly_rate: '',
    occupancy_rate: '70',
    management_fee: '25',
  });

  const [result, setResult] = useState<CalcResult | null>(null);

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

  const services = [
    { title: t.minpaku.service1, description: t.minpaku.service1Desc },
    { title: t.minpaku.service2, description: t.minpaku.service2Desc },
    { title: t.minpaku.service3, description: t.minpaku.service3Desc },
    { title: t.minpaku.service4, description: t.minpaku.service4Desc },
  ];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="Vacation Rental"
        title={t.minpaku.title}
        subtitle={t.minpaku.subtitle}
        image="minpakuHero"
        alt="光あふれる和モダンな宿泊空間"
      />

      {/* 収益シミュレーター */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal>
            <div className="border hairline bg-gold-50/60 p-7 md:p-12">
              <p className="section-label mb-3">Simulator</p>
              <Heading level={3} className="mb-3 text-ink">{t.minpaku.calculator}</Heading>
              <Text size="sm" color="light" className="mb-10">{t.minpaku.calculatorDesc}</Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={labelClass}>{t.minpaku.propertyType}</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className={inputClass}
                  >
                    <option value="apartment">{t.sale.apartment}</option>
                    <option value="house">{t.sale.house}</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>{t.minpaku.area}</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder={t.minpaku.areaPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t.minpaku.rooms}</label>
                  <select
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className={inputClass}
                  >
                    <option>1R</option>
                    <option>1K</option>
                    <option>1LDK</option>
                    <option>2LDK</option>
                    <option>3LDK</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>{t.minpaku.nightlyRate}</label>
                  <input
                    type="number"
                    value={formData.nightly_rate}
                    onChange={(e) => setFormData({ ...formData, nightly_rate: e.target.value })}
                    placeholder={t.minpaku.nightlyRatePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t.minpaku.occupancyRate}</label>
                  <input
                    type="number"
                    value={formData.occupancy_rate}
                    onChange={(e) => setFormData({ ...formData, occupancy_rate: e.target.value })}
                    placeholder={t.minpaku.occupancyRatePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t.minpaku.managementFee}</label>
                  <input
                    type="number"
                    value={formData.management_fee}
                    onChange={(e) => setFormData({ ...formData, management_fee: e.target.value })}
                    placeholder={t.minpaku.managementFeePlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-ink text-washi py-4 text-sm tracking-[0.25em] hover:bg-gold-800 transition-colors duration-500"
              >
                {t.minpaku.calculate}
              </button>
            </div>
          </Reveal>

          {/* シミュレーション結果 */}
          {result && (
            <div className="mt-12 border hairline p-7 md:p-12 animate-rise">
              <p className="section-label mb-3">Result</p>
              <Heading level={3} className="mb-10 text-ink">{t.minpaku.results}</Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
                {/* 収入 */}
                <div>
                  <Heading level={5} className="mb-4 text-ink pb-3 border-b hairline">{t.minpaku.income}</Heading>
                  <dl>
                    <ResultRow label={t.minpaku.grossRevenue} value={`¥${result.grossRevenue.toLocaleString()}`} highlight="positive" />
                    <ResultRow label={t.minpaku.bookedNights} value={`${result.bookedNights} ${t.minpaku.nights}`} />
                  </dl>
                </div>

                {/* 支出 */}
                <div>
                  <Heading level={5} className="mb-4 text-ink pb-3 border-b hairline">{t.minpaku.expenses}</Heading>
                  <dl>
                    <ResultRow label={t.minpaku.managementFeeLabel} value={`¥${result.managementFee.toLocaleString()}`} />
                    <ResultRow label={t.minpaku.cleaningFee} value={`¥${result.cleaningFee.toLocaleString()}`} />
                    <ResultRow label={t.minpaku.utilities} value={`¥${result.utilities.toLocaleString()}`} />
                    <ResultRow label={t.minpaku.platformFee} value={`¥${result.platformFee.toLocaleString()}`} />
                    <ResultRow label={t.minpaku.totalExpenses} value={`¥${result.totalExpenses.toLocaleString()}`} highlight="negative" />
                  </dl>
                </div>
              </div>

              {/* 純利益 */}
              <div className="mt-10 bg-ink text-washi px-7 py-7 md:px-10 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <span className="font-serif text-lg tracking-widest">{t.minpaku.netRevenue}</span>
                <span className="font-serif text-2xl md:text-3xl text-gold-300">
                  ¥{result.netRevenue.toLocaleString()}
                  <span className="text-washi/50 text-sm ml-2">{t.minpaku.perMonth}</span>
                </span>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* サービス内容 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Services</p>
            <Heading level={2} className="text-ink">{t.minpaku.servicesTitle}</Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l hairline">
            {services.map((service, index) => (
              <Reveal
                key={index}
                delay={(index % 2) as 0 | 1}
                className="border-b border-r hairline p-8 md:p-10 hover:bg-white/60 transition-colors duration-700"
              >
                <span className="font-serif text-gold-400 text-xs tracking-[0.3em] block mb-5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Heading level={4} className="mb-3 text-ink">{service.title}</Heading>
                <Text size="sm" color="light">{service.description}</Text>
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
              {t.cta.title}<span className="text-gold-300">{t.cta.subtitle}</span>
            </Heading>
            <Text size="base" className="mb-10 max-w-2xl mx-auto !text-washi/60">
              {t.cta.description}
            </Text>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-washi text-ink px-9 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
            >
              {t.nav.contact}
            </a>
          </Reveal>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: 'positive' | 'negative' }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-3 border-b hairline">
      <dt className="text-ink/55 text-sm">{label}</dt>
      <dd
        className={`font-serif text-base md:text-lg ${
          highlight === 'positive' ? 'text-pine-deep' : highlight === 'negative' ? 'text-gold-800' : 'text-ink'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
