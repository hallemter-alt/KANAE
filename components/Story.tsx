'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

/**
 * 住まいの物語 — 建築と自然の融合
 * 光・影・素材・植物・水・歳月をイメージと余白で語るセクション
 */
export default function Story() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const s = t.story;

  const items = [
    { title: s.item1Title, text: s.item1Text },
    { title: s.item2Title, text: s.item2Text },
    { title: s.item3Title, text: s.item3Text },
  ];

  return (
    <section className="py-24 md:py-36 bg-gold-50 texture-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* 導入 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-28">
          <Reveal className="lg:col-span-5">
            <p className="section-label mb-5">{s.label}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-[1.5] mb-8">
              {s.title}
            </h2>
            <p className="font-serif text-ink/75 text-base md:text-lg leading-loose mb-6">
              {s.lead}
            </p>
            <p className="text-ink/55 text-sm leading-loose">
              {s.body}
            </p>

            {/* 三つの視点 */}
            <div className="mt-12 space-y-0 border-t hairline">
              {items.map((item, i) => (
                <div key={i} className="py-5 border-b hairline flex items-baseline gap-6">
                  <span className="font-serif text-gold-500 text-xs tracking-[0.3em] shrink-0 w-7">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-serif text-ink text-base mb-1">{item.title}</p>
                    <p className="text-ink/50 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 写真コラージュ — ずらした配置で静かなリズムを */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 md:gap-6 items-start">
            <Reveal delay={1} className="col-span-7">
              <figure className="img-breathe relative overflow-hidden aspect-[3/4]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.storyKomorebi}')` }}
                  role="img"
                  aria-label={s.caption1}
                />
              </figure>
              <figcaption className="mt-3 text-ink/40 text-xs tracking-widest">{s.caption1}</figcaption>
            </Reveal>
            <Reveal delay={2} className="col-span-5 mt-16 md:mt-24">
              <figure className="img-breathe relative overflow-hidden aspect-[3/4]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.storyWood}')` }}
                  role="img"
                  aria-label={s.caption2}
                />
              </figure>
              <figcaption className="mt-3 text-ink/40 text-xs tracking-widest">{s.caption2}</figcaption>
            </Reveal>
            <Reveal delay={2} className="col-span-8 col-start-3 -mt-4 md:-mt-8">
              <figure className="img-breathe relative overflow-hidden aspect-[16/9]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.storyMoss}')` }}
                  role="img"
                  aria-label={s.caption3}
                />
              </figure>
              <figcaption className="mt-3 text-ink/40 text-xs tracking-widest text-right">{s.caption3}</figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
