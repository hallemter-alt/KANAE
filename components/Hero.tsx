'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';

/**
 * ヒーロー — 3D カード輪播（墨・清水コンクリートの単色）
 * 中央のカードを軸に、左右へ緩やかに重なるカバーフロー。
 * ・中央カード = 鮮明（グレー抜け）
 * ・両脇 = 奥へ退き、わずかに暗く/ぼかす
 * ・ホバー = そっと持ち上がり、内容が露出（キャプション表示）
 * ・クリック / 矢印 / ドット = スライド、キーボード対応、自動再生
 */

type CardDef = { src: string; caption: string };

export default function Hero() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const captions =
    locale === 'ja'
      ? ['設計の素描', '素材の肌理', '陶の器', '住まいの食卓', '対話の余白', '光の室内', '緑の気配']
      : locale === 'zh'
      ? ['设计草图', '材料肌理', '陶器', '生活餐桌', '对话留白', '光的室内', '绿意']
      : ['Sketches', 'Material', 'Vessel', 'Dining', 'Dialogue', 'Interior', 'Green'];

  const cards: CardDef[] = IMAGES.heroCards.map((src, i) => ({
    src,
    caption: captions[i] ?? '',
  }));

  const N = cards.length;
  const [active, setActive] = useState(Math.floor(N / 2));
  const [mode, setMode] = useState<'linear' | 'random'>('linear');
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 高速切替の検出：短時間で連続操作すると「加速」モードに切替える
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lastGo = useRef<number>(0);
  const rushTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markRush = useCallback(() => {
    const now = Date.now();
    const track = trackRef.current;
    if (track && now - lastGo.current < 380) {
      track.classList.add('is-rushing');
      if (rushTimeout.current) clearTimeout(rushTimeout.current);
      rushTimeout.current = setTimeout(() => {
        track.classList.remove('is-rushing');
      }, 520);
    }
    lastGo.current = now;
  }, []);

  const go = useCallback(
    (dir: number) => {
      markRush();
      setActive((prev) => {
        if (mode === 'random') {
          let n = prev;
          while (n === prev) n = Math.floor(Math.random() * N);
          return n;
        }
        return (prev + dir + N) % N;
      });
    },
    [N, mode, markRush]
  );

  const jumpTo = useCallback(
    (i: number) => {
      markRush();
      setActive(i);
    },
    [markRush]
  );

  // 自動再生（静かなリズム）— ホバー中は停止
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(1), 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [go, paused]);

  // キーボード操作
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // 後片付け
  useEffect(() => {
    return () => {
      if (rushTimeout.current) clearTimeout(rushTimeout.current);
    };
  }, []);

  // カバーフローの位置を算出（循環距離で扇状に）
  const cardStyle = (i: number): React.CSSProperties => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    const abs = Math.abs(d);

    // 中央から離れるほど：横へ寄せ・奥へ退き・回転・縮小・減光（効果をはっきりと）
    const x = d * 62; // %（カード幅基準の重なり）
    const z = -abs * 175; // 奥行き（深く）
    const rotY = d * -30; // Y 軸回転（強め）
    const scale = Math.max(0.62, 1 - abs * 0.15);
    const opacity = abs > 3 ? 0 : Math.max(0.25, 1 - abs * 0.28);
    const zIndex = 100 - abs;
    const blur = abs >= 2 ? Math.min((abs - 1) * 1.8, 5) : 0;

    return {
      transform: `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur ? `blur(${blur}px)` : undefined,
      pointerEvents: abs > 3 ? 'none' : 'auto',
    };
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-washi texture-concrete">
      {/* トップラベル */}
      <div className="relative z-30 pt-28 md:pt-24 text-center animate-slowfade" aria-hidden="true">
        <p className="text-ink/55 text-[10px] md:text-xs tracking-[0.4em] uppercase font-serif">
          Kanae Real Estate — Tokyo
        </p>
      </div>

      {/* 3D ステージ */}
      <div
        className="hero-stage relative z-20 w-full flex-1 flex items-center justify-center py-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 中央の縦軸線 */}
        <div
          className="pointer-events-none absolute left-1/2 top-[10%] bottom-[10%] w-px bg-ink/12 -translate-x-1/2 z-0"
          aria-hidden="true"
        />

        {/* カード群 — 高さは vh 基準で比例、上限あり */}
        <div ref={trackRef} className="hero-track relative w-full h-[44vh] sm:h-[46vh] md:h-[48vh] max-h-[440px]">
          {cards.map((card, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => (isActive ? undefined : jumpTo(i))}
                aria-label={card.caption}
                aria-current={isActive}
                className={`hero-card group block h-full aspect-[3/4] overflow-hidden rounded-sm bg-ink/5 shadow-[0_30px_70px_-30px_rgba(28,28,27,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
                  isActive ? 'is-active cursor-default' : 'cursor-pointer'
                }`}
                style={cardStyle(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.caption}
                  className="hero-card-media absolute inset-0 w-full h-full object-cover"
                  loading={i === active ? 'eager' : 'lazy'}
                  draggable={false}
                />
                {/* 内容の露出 — アクティブカードのホバー時 */}
                <div className="hero-card-caption absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent">
                  <p className="text-washi text-[11px] md:text-xs tracking-[0.3em] uppercase">
                    {card.caption}
                  </p>
                </div>
                {/* 非アクティブカードの薄膜（沈める） */}
                {!isActive && (
                  <div className="hero-card-veil absolute inset-0 bg-washi/30" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* 左右の矢印 */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-3 md:left-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full border border-ink/25 bg-washi/70 backdrop-blur-sm flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink/50 hover:bg-washi transition-all duration-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full border border-ink/25 bg-washi/70 backdrop-blur-sm flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink/50 hover:bg-washi transition-all duration-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ボトムラベル */}
      <p
        className="relative z-30 text-ink/55 text-[10px] md:text-xs tracking-[0.4em] uppercase font-serif mb-5"
        aria-hidden="true"
      >
        Architecture &amp; People
      </p>

      {/* 見出し・CTA */}
      <div className="relative z-30 w-full max-w-3xl mx-auto px-5 text-center pb-5">
        <h1 className="animate-rise font-serif text-ink text-2xl sm:text-3xl md:text-4xl leading-[1.5] mb-6">
          {t.hero.title}
          <span className="block text-ink/75 mt-1">{t.hero.subtitle}</span>
        </h1>

        <div className="animate-rise-late flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/rent"
            className="group inline-flex items-center justify-center gap-3 border border-ink/40 text-ink px-9 py-3.5 text-sm tracking-[0.2em] hover:bg-ink hover:text-washi transition-all duration-700"
          >
            <span>{t.hero.cta}</span>
            <span className="inline-block w-6 h-px bg-current group-hover:w-9 transition-all duration-500" aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center justify-center gap-3 text-ink/70 px-4 py-3.5 text-sm tracking-[0.2em] hover:text-ink transition-colors duration-500"
          >
            <span className="link-quiet">{t.hero.learnMore}</span>
          </Link>
        </div>
      </div>

      {/* ページネーション + RANDOM / LINEAR 切替 */}
      <div className="relative z-30 flex flex-col items-center gap-4 pb-10">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="carousel pagination">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to card ${i + 1}`}
              aria-selected={i === active}
              className={`rounded-full transition-all duration-500 ${
                i === active ? 'w-2.5 h-2.5 bg-ink' : 'w-1.5 h-1.5 bg-ink/25 hover:bg-ink/50'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase select-none">
          <button
            type="button"
            onClick={() => setMode('random')}
            className={mode === 'random' ? 'text-ink' : 'text-ink/40 hover:text-ink/70 transition-colors'}
          >
            Random
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === 'linear' ? 'random' : 'linear')}
            aria-label="toggle mode"
            className="relative w-9 h-4 rounded-full bg-ink/15 border border-ink/20"
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ink transition-all duration-500 ${
                mode === 'linear' ? 'left-[calc(100%-14px)]' : 'left-0.5'
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => setMode('linear')}
            className={mode === 'linear' ? 'text-ink' : 'text-ink/40 hover:text-ink/70 transition-colors'}
          >
            Linear
          </button>
        </div>
      </div>
    </section>
  );
}
