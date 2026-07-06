'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

/**
 * 事業内容 — プランA：整然と揃えたグリッド
 * 画像（上）＋文字（下）の統一カード。厳密に整列。
 * 哲学の引子（philosophy）と対話の引子（dialogueLead）は保持。
 */
export default function Services() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const services = [
    {
      num: '01',
      title: t.services.rent.title,
      philosophy: t.services.rent.philosophy,
      description: t.services.rent.description,
      link: '/rent',
      image: IMAGES.corridor,
      alt: '光の入る静かな廊下',
    },
    {
      num: '02',
      title: t.services.sale.title,
      philosophy: t.services.sale.philosophy,
      description: t.services.sale.description,
      link: '/sale',
      image: IMAGES.geometric,
      alt: '幾何学的な陰影のある建築',
    },
    {
      num: '03',
      title: t.services.management.title,
      philosophy: t.services.management.philosophy,
      description: t.services.management.description,
      link: '/management',
      image: IMAGES.concreteShadow,
      alt: 'コンクリートに落ちる木の影',
    },
    {
      num: '04',
      title: t.services.minpaku.title,
      philosophy: t.services.minpaku.philosophy,
      description: t.services.minpaku.description,
      link: '/minpaku',
      image: IMAGES.biophilic,
      alt: '緑と共にある住まい',
    },
  ];

  return (
    <section className="relative bg-washi texture-concrete overflow-hidden py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* セクション見出し */}
        <Reveal className="max-w-2xl mb-14 md:mb-20">
          <p className="section-label mb-4">Our Services</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.4]">
              {t.services.title}
            </h2>
            <p className="text-ink/60 text-sm md:text-base max-w-md leading-loose">
              {t.services.subtitle}
            </p>
          </div>
          {/* 「建築と人の対話」を事業へと繋ぐ引子（保持） */}
          <p className="font-serif text-ink/70 text-base md:text-lg leading-loose mt-8 max-w-2xl border-l-2 border-gold-500/50 pl-5">
            {t.services.dialogueLead}
          </p>
        </Reveal>

        {/* 事業 — 整然としたグリッド（2×2） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-20">
          {services.map((service, index) => (
            <Reveal key={service.num} delay={(index % 2) as 0 | 1}>
              <Link href={service.link} className="group block">
                {/* 画像 — 揃った比率 */}
                <figure className="img-breathe relative overflow-hidden aspect-[4/3] mb-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[0.35] group-hover:grayscale-0 transition-[filter] duration-700"
                    style={{ backgroundImage: `url('${service.image}')` }}
                    role="img"
                    aria-label={service.alt}
                  />
                  <span
                    className="absolute top-4 left-4 font-serif text-washi text-xs tracking-[0.35em]"
                    aria-hidden="true"
                  >
                    {service.num}
                  </span>
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" aria-hidden="true" />
                </figure>

                {/* 文字 — 画像の下に整列 */}
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="block w-10 h-px bg-gold-500/50" aria-hidden="true" />
                  {/* 哲学の引子（保持） */}
                  <p className="font-serif text-gold-700/90 text-sm md:text-base italic leading-snug">
                    {service.philosophy}
                  </p>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-ink group-hover:text-gold-700 transition-colors duration-500 mb-4">
                  {service.title}
                </h3>
                <p className="text-ink/60 text-sm md:text-base leading-loose mb-6 max-w-md">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.25em] text-ink/50 group-hover:text-ink transition-colors duration-500 uppercase">
                  {t.services.learnMore}
                  <span
                    className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-500"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
