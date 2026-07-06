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
    <section className="relative bg-washi texture-paper overflow-hidden">
      {/* 導入 */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 md:pt-36 pb-8 md:pb-16">
        <Reveal className="max-w-2xl">
          <p className="section-label mb-5">{d.label}</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.45] mb-8 whitespace-pre-line">
            {d.title}
          </h2>
          <p className="font-serif text-ink/70 text-base md:text-lg leading-loose">
            {d.lead}
          </p>
        </Reveal>
      </div>

      {/* 情景 — 一主題一画面、左右交互 */}
      <div className="flex flex-col">
        {d.items.map((item, index) => {
          const isEven = index % 2 === 0; // 偶数: 画像右・文字左
          const image = images[index];

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-y-8 lg:gap-x-4 py-12 md:py-20"
            >
              {/* 画像 */}
              <Reveal
                variant="media"
                as="figure"
                className={`img-breathe relative overflow-hidden aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] lg:col-span-7 ${
                  isEven ? 'lg:col-start-6' : 'lg:col-start-1'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center parallax-media"
                  style={{ backgroundImage: `url('${image.src}')` }}
                  role="img"
                  aria-label={image.alt}
                  data-parallax
                />
                {/* 番号 — 静かな添え */}
                <span
                  className="absolute top-5 left-5 font-serif text-washi/85 text-xs tracking-[0.35em]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Reveal>

              {/* 文字 — 必ず余白側に、画像とは重ねない */}
              <Reveal
                variant={isEven ? 'text-left' : 'text'}
                className={`relative z-10 lg:col-span-5 ${
                  isEven
                    ? 'lg:col-start-1 lg:pr-8 lg:text-left'
                    : 'lg:col-start-8 lg:pl-8'
                }`}
              >
                <p className="text-xs tracking-[0.3em] uppercase text-gold-600 mb-5">
                  {item.eyebrow}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-ink leading-snug mb-5">
                  {item.title}
                </h3>
                <p className="text-ink/60 text-sm md:text-base leading-loose max-w-md">
                  {item.text}
                </p>
                <span
                  className="mt-8 inline-block w-12 h-px bg-gold-500/60"
                  aria-hidden="true"
                />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
