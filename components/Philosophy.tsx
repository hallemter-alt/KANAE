'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

export default function Philosophy() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const pillars = [
    { label: 'Mission', title: t.philosophy.mission, text: t.philosophy.missionText, points: t.philosophy.missionPoints },
    { label: 'Vision', title: t.philosophy.vision, text: t.philosophy.visionText, points: t.philosophy.visionPoints },
    { label: 'Values', title: t.philosophy.values, text: t.philosophy.mottoDescription, points: t.philosophy.valuesPoints },
  ];

  return (
    <section className="relative py-24 md:py-36 bg-ink text-washi overflow-hidden">
      {/* 背景 — 苔むした石（歳月の痕跡）4K WEBP */}
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMAGES.mossHero}')` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* 社是 — 中央に静かに */}
        <Reveal className="text-center mb-20 md:mb-28">
          <p className="section-label !text-gold-400 mb-6">Philosophy</p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.15em] mb-6">
            {t.philosophy.motto}
          </h2>
          <p className="text-washi/50 text-sm md:text-base max-w-xl mx-auto leading-loose">
            {t.philosophy.subtitle}
          </p>
        </Reveal>

        {/* 三本柱 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-washi/10 border border-washi/10 mb-20 md:mb-28">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.label}
              delay={index as 0 | 1 | 2}
              className="bg-ink p-8 md:p-10"
            >
              <p className="font-serif text-xs tracking-[0.35em] uppercase text-gold-400 mb-5">
                {pillar.label}
              </p>
              <h3 className="font-serif text-xl md:text-2xl mb-5">{pillar.title}</h3>
              <p className="text-washi/60 text-sm leading-loose mb-6">
                {pillar.text}
              </p>
              <ul className="space-y-3">
                {pillar.points.map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-washi/50 text-xs leading-relaxed">
                    <span className="mt-2 block w-3 h-px bg-gold-500 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* 七つの原則 */}
        <Reveal>
          <h3 className="font-serif text-xl md:text-2xl text-center mb-12 tracking-widest">
            {t.philosophy.principlesTitle}
          </h3>
          <ol className="max-w-3xl mx-auto space-y-0 border-t border-washi/10">
            {t.philosophy.principles.map((principle: string, index: number) => (
              <li
                key={index}
                className="flex items-baseline gap-6 py-5 border-b border-washi/10"
              >
                <span className="font-serif text-gold-500 text-sm tracking-widest shrink-0 w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-washi/70 text-sm md:text-base leading-relaxed">{principle}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
