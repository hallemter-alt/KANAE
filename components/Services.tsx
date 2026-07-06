'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

/**
 * 事業内容 — 没入型「一画面一事業」レイアウト（プランB）
 * 大きな画像に対し、文字は必ず余白側へ。重なりを避ける。
 * 左右交互のリズム。画像が先に立ち上がり、文字が遅れて滑り込む。
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
    <section className="relative bg-gold-50 texture-paper overflow-hidden">
      {/* セクション見出し */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 md:pt-36 pb-8 md:pb-12">
        <Reveal className="max-w-2xl">
          <p className="section-label mb-4">Our Services</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.4]">
              {t.services.title}
            </h2>
            <p className="text-ink/60 text-sm md:text-base max-w-md leading-loose">
              {t.services.subtitle}
            </p>
          </div>
          {/* 「建築と人の対話」を事業へと繋ぐ引子 */}
          <p className="font-serif text-ink/70 text-base md:text-lg leading-loose mt-8 max-w-2xl border-l-2 border-gold-500/50 pl-5">
            {t.services.dialogueLead}
          </p>
        </Reveal>
      </div>

      {/* 事業 — 一画面一事業、左右交互 */}
      <div className="flex flex-col">
        {services.map((service, index) => {
          const isEven = index % 2 === 0; // 偶数: 画像右・文字左

          return (
            <div
              key={service.num}
              className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-y-8 lg:gap-x-4 py-12 md:py-20"
            >
              {/* 画像 */}
              <Reveal
                variant="media"
                as="figure"
                className={`img-breathe relative overflow-hidden aspect-[16/11] lg:aspect-[16/10] lg:col-span-7 ${
                  isEven ? 'lg:col-start-6' : 'lg:col-start-1'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center parallax-media"
                  style={{ backgroundImage: `url('${service.image}')` }}
                  role="img"
                  aria-label={service.alt}
                  data-parallax
                />
                <div className="absolute inset-0 bg-ink/5" aria-hidden="true" />
              </Reveal>

              {/* 文字 — 余白側に配置、画像と重ねない */}
              <Reveal
                variant={isEven ? 'text-left' : 'text'}
                className={`relative z-10 lg:col-span-5 ${
                  isEven
                    ? 'lg:col-start-1 lg:pr-10'
                    : 'lg:col-start-8 lg:pl-10'
                }`}
              >
                <Link href={service.link} className="group block">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-serif text-gold-500 text-sm tracking-widest">
                      {service.num}
                    </span>
                    <span className="block w-10 h-px bg-gold-500/50" aria-hidden="true" />
                  </div>
                  {/* 哲学の引子 — 建築と人の関係を一言で */}
                  <p className="font-serif text-gold-700/90 text-base md:text-lg italic leading-snug mb-3">
                    {service.philosophy}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink group-hover:text-gold-700 transition-colors duration-500 mb-5">
                    {service.title}
                  </h3>
                  <p className="text-ink/60 text-sm md:text-base leading-loose mb-8 max-w-md">
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
