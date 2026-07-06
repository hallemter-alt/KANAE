'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';
import Reveal from '@/components/Reveal';

/**
 * 建築と人の対話 — 空間の哲学
 * 一つの主題を一つの情景で語る没入型セクション。
 * 画像は余白を大きくとり、文字は必ず余白側に置いて重ならない。
 * 左右交互のリズム。画像が先に現れ、文字が遅れて滑り込む。
 */
export default function Dialogue() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const d = t.dialogue;

  const images = [
    { src: IMAGES.dialogueVeranda, alt: '山並みを望む縁側と一脚の椅子' },
    { src: IMAGES.dialogueZen, alt: '砂紋を描いた枯山水の庭' },
    { src: IMAGES.dialogueStones, alt: '光と影の中の原石' },
    { src: IMAGES.dialogueVase, alt: '割れた石の上の白い器と一枝' },
  ];

  return (
    <section className="relative bg-washi texture-concrete overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* 導入 */}
        <div className="pt-24 md:pt-32 pb-6 md:pb-12">
          <Reveal className="max-w-2xl">
            <p className="section-label mb-5">{d.label}</p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.45] mb-6 whitespace-pre-line">
              {d.title}
            </h2>
            <p className="font-serif text-ink/70 text-base md:text-lg leading-loose">
              {d.lead}
            </p>
          </Reveal>
        </div>

        {/* 情景 — 一主題一画面、左右交互（比例を抑え、閲覧しやすく） */}
        <div className="flex flex-col divide-y divide-ink/10">
          {d.items.map((item, index) => {
            const isEven = index % 2 === 0; // 偶数: 画像右・文字左
            const image = images[index];

            return (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-y-6 md:gap-x-8 lg:gap-x-12 py-10 md:py-14"
              >
                {/* 画像 — 高さを比例で抑え、横長寄りに */}
                <Reveal
                  variant="media"
                  as="figure"
                  className={`img-breathe relative overflow-hidden aspect-[4/3] md:aspect-[3/2] md:col-span-6 ${
                    isEven ? 'md:col-start-7 md:order-2' : 'md:col-start-1'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center parallax-media grayscale-[0.35] hover:grayscale-0 transition-[filter] duration-700"
                    style={{ backgroundImage: `url('${image.src}')` }}
                    role="img"
                    aria-label={image.alt}
                    data-parallax
                  />
                  <span
                    className="absolute top-4 left-4 font-serif text-washi/85 text-xs tracking-[0.35em]"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Reveal>

                {/* 文字 */}
                <Reveal
                  variant={isEven ? 'text-left' : 'text'}
                  className={`relative z-10 md:col-span-5 ${
                    isEven ? 'md:col-start-1 md:order-1' : 'md:col-start-8'
                  }`}
                >
                  <p className="text-xs tracking-[0.3em] uppercase text-gold-600 mb-4">
                    {item.eyebrow}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-ink leading-snug mb-4">
                    {item.title}
                  </h3>
                  <p className="text-ink/60 text-sm md:text-base leading-loose max-w-md">
                    {item.text}
                  </p>
                  <span
                    className="mt-6 inline-block w-12 h-px bg-gold-500/60"
                    aria-hidden="true"
                  />
                </Reveal>
              </div>
            );
          })}
        </div>
        <div className="pb-16 md:pb-24" aria-hidden="true" />
      </div>
    </section>
  );
}
