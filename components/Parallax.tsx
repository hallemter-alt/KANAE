'use client';

import { useEffect } from 'react';

/**
 * ごく控えめなパララックス。
 * [data-parallax] 要素に対し、ビューポート内の位置に応じて
 * CSS 変数 --p を更新する。動きは非常に穏やか（最大±24px）。
 */
export default function Parallax() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    );
    if (els.length === 0) return;

    const AMPLITUDE = 24; // px
    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // 要素中心とビューポート中心の相対位置（-1 〜 1）
        const center = rect.top + rect.height / 2;
        const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
        const clamped = Math.max(-1, Math.min(1, progress));
        el.style.setProperty('--p', `${(-clamped * AMPLITUDE).toFixed(1)}px`);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
