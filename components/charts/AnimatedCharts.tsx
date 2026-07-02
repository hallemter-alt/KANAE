'use client'

// 動的SVGチャート — 依存ライブラリなし・ベクター描画（高解像度）
// IntersectionObserverで表示時にアニメーション開始、prefers-reduced-motion対応

import { useEffect, useRef, useState } from 'react'

function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export interface SeriesPoint {
  label: string
  value: number
}

interface LineChartProps {
  data: SeriesPoint[]
  /** 第二系列（任意） */
  data2?: SeriesPoint[]
  seriesName?: string
  series2Name?: string
  unit?: string
  height?: number
  color?: string
  color2?: string
  /** Y軸の下限を0にしない（変動を強調） */
  tightY?: boolean
  formatValue?: (v: number) => string
}

export function LineChart({
  data,
  data2,
  seriesName,
  series2Name,
  unit = '',
  height = 300,
  color = '#7a857c',
  color2 = '#94877d',
  tightY = false,
  formatValue,
}: LineChartProps) {
  const { ref, inView } = useInView()
  const W = 720
  const H = height
  const PAD = { t: 24, r: 20, b: 40, l: 56 }
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b

  const all = [...data.map((d) => d.value), ...(data2?.map((d) => d.value) ?? [])]
  const rawMin = Math.min(...all)
  const rawMax = Math.max(...all)
  const span = rawMax - rawMin || 1
  const yMin = tightY ? rawMin - span * 0.12 : 0
  const yMax = rawMax + span * 0.12
  const x = (i: number, n: number) => PAD.l + (iw * i) / Math.max(n - 1, 1)
  const y = (v: number) => PAD.t + ih - (ih * (v - yMin)) / (yMax - yMin)

  const path = (pts: SeriesPoint[]) =>
    pts.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i, pts.length).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ')

  const fmt = formatValue ?? ((v: number) => v.toLocaleString('ja-JP'))
  const ticks = 4
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => yMin + ((yMax - yMin) * i) / ticks)

  return (
    <div ref={ref} className="w-full">
      {(seriesName || series2Name) && (
        <div className="flex gap-6 mb-3 text-xs tracking-widest text-ink/50">
          {seriesName && (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-5 h-px" style={{ backgroundColor: color }} />
              {seriesName}
            </span>
          )}
          {series2Name && data2 && (
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block w-5 h-px"
                style={{ backgroundColor: color2, borderTop: `1px dashed ${color2}` }}
              />
              {series2Name}
            </span>
          )}
        </div>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label={seriesName ?? 'chart'}
      >
        {/* グリッド */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.l}
              y1={y(t)}
              x2={W - PAD.r}
              y2={y(t)}
              stroke="#21201f"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
            <text
              x={PAD.l - 8}
              y={y(t) + 3.5}
              textAnchor="end"
              fontSize={10.5}
              fill="#21201f"
              fillOpacity={0.4}
            >
              {fmt(Math.round(t * 100) / 100)}
            </text>
          </g>
        ))}
        {/* X軸ラベル（間引き） */}
        {data.map((d, i) => {
          const n = data.length
          const step = Math.ceil(n / 8)
          if (i % step !== 0 && i !== n - 1) return null
          return (
            <text
              key={i}
              x={x(i, n)}
              y={H - PAD.b + 20}
              textAnchor="middle"
              fontSize={10.5}
              fill="#21201f"
              fillOpacity={0.45}
            >
              {d.label}
            </text>
          )
        })}
        {/* 面グラデーション */}
        <defs>
          <linearGradient id={`fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.16" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${path(data)} L${x(data.length - 1, data.length)},${PAD.t + ih} L${PAD.l},${PAD.t + ih} Z`}
          fill={`url(#fill-${color.replace('#', '')})`}
          opacity={inView ? 1 : 0}
          style={{ transition: 'opacity 1.4s ease 0.6s' }}
        />
        {/* 折れ線（描画アニメーション） */}
        <path
          d={path(data)}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.25,0.1,0.25,1)' }}
        />
        {data2 && (
          <path
            d={path(data2)}
            fill="none"
            stroke={color2}
            strokeWidth={1.8}
            strokeDasharray="5 4"
            strokeLinecap="round"
            opacity={inView ? 1 : 0}
            style={{ transition: 'opacity 1.2s ease 0.9s' }}
          />
        )}
        {/* 終点マーカー */}
        <circle
          cx={x(data.length - 1, data.length)}
          cy={y(data[data.length - 1].value)}
          r={3.5}
          fill={color}
          opacity={inView ? 1 : 0}
          style={{ transition: 'opacity 0.6s ease 1.6s' }}
        />
        <text
          x={x(data.length - 1, data.length) - 6}
          y={y(data[data.length - 1].value) - 10}
          textAnchor="end"
          fontSize={11.5}
          fontWeight={500}
          fill="#21201f"
          fillOpacity={inView ? 0.75 : 0}
          style={{ transition: 'fill-opacity 0.6s ease 1.7s' }}
        >
          {fmt(data[data.length - 1].value)}
          {unit}
        </text>
      </svg>
    </div>
  )
}

interface BarChartProps {
  data: SeriesPoint[]
  unit?: string
  height?: number
  color?: string
  highlightIndex?: number
  formatValue?: (v: number) => string
}

export function BarChart({
  data,
  unit = '',
  height = 300,
  color = '#94877d',
  highlightIndex,
  formatValue,
}: BarChartProps) {
  const { ref, inView } = useInView()
  const W = 720
  const H = height
  const PAD = { t: 30, r: 16, b: 40, l: 56 }
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const max = Math.max(...data.map((d) => d.value)) * 1.15
  const bw = Math.min((iw / data.length) * 0.55, 48)
  const fmt = formatValue ?? ((v: number) => v.toLocaleString('ja-JP'))

  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="img" aria-label="bar chart">
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <g key={i}>
            <line
              x1={PAD.l}
              y1={PAD.t + ih * (1 - f)}
              x2={W - PAD.r}
              y2={PAD.t + ih * (1 - f)}
              stroke="#21201f"
              strokeOpacity={0.08}
            />
            <text
              x={PAD.l - 8}
              y={PAD.t + ih * (1 - f) + 3.5}
              textAnchor="end"
              fontSize={10.5}
              fill="#21201f"
              fillOpacity={0.4}
            >
              {fmt(Math.round(max * f * 100) / 100)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = PAD.l + (iw * (i + 0.5)) / data.length
          const h = (ih * d.value) / max
          const isHl = highlightIndex === i
          return (
            <g key={i}>
              <rect
                x={cx - bw / 2}
                y={PAD.t + ih - (inView ? h : 0)}
                width={bw}
                height={inView ? h : 0}
                fill={isHl ? '#21201f' : color}
                fillOpacity={isHl ? 0.85 : 0.55}
                style={{ transition: `all 1s cubic-bezier(0.25,0.1,0.25,1) ${i * 0.08}s` }}
              />
              <text
                x={cx}
                y={PAD.t + ih - h - 8}
                textAnchor="middle"
                fontSize={10.5}
                fill="#21201f"
                fillOpacity={inView ? 0.6 : 0}
                style={{ transition: `fill-opacity 0.5s ease ${0.9 + i * 0.08}s` }}
              >
                {fmt(d.value)}
                {unit}
              </text>
              <text
                x={cx}
                y={H - PAD.b + 20}
                textAnchor="middle"
                fontSize={10.5}
                fill="#21201f"
                fillOpacity={0.45}
              >
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/** 数値カウントアップ */
export function CountUp({
  value,
  duration = 1400,
  formatValue,
  className,
}: {
  value: number
  duration?: number
  formatValue?: (v: number) => string
  className?: string
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5)
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])
  const fmt = formatValue ?? ((v: number) => Math.round(v).toLocaleString('ja-JP'))
  return (
    <span ref={ref} className={className}>
      {fmt(display)}
    </span>
  )
}
