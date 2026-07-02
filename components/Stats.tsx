'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

interface StatItem {
  number: string;
  label: string;
  description: string;
}

export default function Stats() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="relative py-24 md:py-36 bg-gold-100 texture-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* 左 — 水辺の写真（静けさと時間の流れ） */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="img-breathe relative overflow-hidden aspect-[3/4]">
              <div
                className="absolute inset-0 bg-cover bg-center animate-water"
                style={{ backgroundImage: `url('${IMAGES.pondStill}')`, transform: 'scale(1.06)' }}
                role="img"
                aria-label="静かな水面に映る木々"
              />
            </div>
            <p className="mt-4 text-ink/40 text-xs tracking-widest">
              — {t.stats.subtitle}
            </p>
          </Reveal>

          {/* 右 — 実績 */}
          <div className="lg:col-span-7">
            <Reveal className="mb-14">
              <p className="section-label mb-4">Track Record</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                {t.stats.title}
              </h2>
            </Reveal>

            <div className="border-t hairline">
              {(t.stats.items as StatItem[]).map((stat, index) => (
                <Reveal key={index} delay={(index % 3) as 0 | 1 | 2}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-7 border-b hairline">
                    <span className="font-serif text-4xl md:text-5xl text-ink tracking-tight shrink-0 sm:w-40">
                      {stat.number}
                    </span>
                    <div>
                      <p className="font-serif text-base md:text-lg text-ink mb-1">{stat.label}</p>
                      <p className="text-ink/50 text-sm leading-relaxed">{stat.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* 取引銀行 */}
            {t.stats.banks && (
              <Reveal className="mt-12">
                <p className="text-ink/40 text-xs tracking-[0.25em] uppercase mb-5">{t.stats.banksTitle}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {(t.stats.banks as string[]).map((bank, i) => (
                    <span key={i} className="text-ink/60 text-sm">{bank}</span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
