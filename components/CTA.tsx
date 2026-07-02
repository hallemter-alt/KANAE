'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

export default function CTA() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="relative py-28 md:py-44 overflow-hidden bg-ink text-washi">
      {/* 背景 — 夕方の柔らかな光 */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${IMAGES.lightOnWall}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
        <Reveal>
          <p className="section-label !text-gold-400 mb-6">Contact</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.5] mb-6">
            {t.cta.title}
            <br />
            <span className="text-gold-300">{t.cta.subtitle}</span>
          </h2>
          <p className="text-washi/60 text-sm md:text-base max-w-2xl mx-auto leading-loose mb-14">
            {t.cta.description}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-washi text-ink px-10 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
            >
              <span>{t.nav.contact}</span>
              <span className="inline-block w-6 h-px bg-current group-hover:w-9 transition-all duration-500" aria-hidden="true" />
            </Link>
            <Link
              href="/rent"
              className="inline-flex items-center justify-center border border-washi/40 text-washi px-10 py-4 text-sm tracking-[0.2em] hover:bg-washi/10 transition-colors duration-700"
            >
              {t.cta.searchProperties}
            </Link>
          </div>
        </Reveal>

        {/* 連絡先 — 罫線区切りで静かに */}
        <Reveal delay={2}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-washi/15 border-t border-b border-washi/15">
            <div className="py-8 px-6">
              <p className="text-washi/40 text-xs tracking-[0.25em] uppercase mb-3">{t.contact.phone}</p>
              <a href="tel:03-6914-3633" className="font-serif text-lg text-washi hover:text-gold-300 transition-colors duration-500">
                03-6914-3633
              </a>
            </div>
            <div className="py-8 px-6">
              <p className="text-washi/40 text-xs tracking-[0.25em] uppercase mb-3">{t.contact.email}</p>
              <a href="mailto:info@kanae-tokyo.com" className="font-serif text-lg text-washi hover:text-gold-300 transition-colors duration-500 break-all">
                info@kanae-tokyo.com
              </a>
            </div>
            <div className="py-8 px-6">
              <p className="text-washi/40 text-xs tracking-[0.25em] uppercase mb-3">{t.contact.businessHours}</p>
              <p className="font-serif text-lg text-washi">{t.contact.businessHoursValue}</p>
              <p className="text-washi/40 text-xs mt-1">{t.contact.businessHoursNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
