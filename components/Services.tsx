'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

export default function Services() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const services = [
    {
      num: '01',
      title: t.services.rent.title,
      description: t.services.rent.description,
      link: '/rent',
      image: IMAGES.corridor,
      alt: '光の入る静かな廊下',
    },
    {
      num: '02',
      title: t.services.sale.title,
      description: t.services.sale.description,
      link: '/sale',
      image: IMAGES.geometric,
      alt: '幾何学的な陰影のある建築',
    },
    {
      num: '03',
      title: t.services.management.title,
      description: t.services.management.description,
      link: '/management',
      image: IMAGES.concreteShadow,
      alt: 'コンクリートに落ちる木の影',
    },
    {
      num: '04',
      title: t.services.minpaku.title,
      description: t.services.minpaku.description,
      link: '/minpaku',
      image: IMAGES.biophilic,
      alt: '緑と共にある住まい',
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-washi texture-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* セクション見出し */}
        <Reveal className="mb-16 md:mb-24">
          <p className="section-label mb-4">Our Services</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              {t.services.title}
            </h2>
            <p className="text-ink/60 text-sm md:text-base max-w-md leading-loose">
              {t.services.subtitle}
            </p>
          </div>
        </Reveal>

        {/* サービス一覧 — 画像と余白で語る */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-24">
          {services.map((service, index) => (
            <Reveal key={service.num} delay={(index % 2) as 0 | 1} className={index % 2 === 1 ? 'md:mt-16' : ''}>
              <Link href={service.link} className="group block">
                <div className="img-breathe relative overflow-hidden aspect-[4/3] mb-6 bg-gold-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${service.image}')` }}
                    role="img"
                    aria-label={service.alt}
                  />
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
                </div>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-serif text-gold-500 text-sm tracking-widest">{service.num}</span>
                  <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-gold-700 transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                <p className="text-ink/60 text-sm leading-loose mb-4 max-w-md">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.25em] text-ink/50 group-hover:text-ink transition-colors duration-500 uppercase">
                  {t.services.learnMore}
                  <span className="inline-block w-8 h-px bg-current group-hover:w-12 transition-all duration-500" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
