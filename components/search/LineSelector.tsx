'use client'

// 沿線選択 — 賃貸・売買検索フォーム共通のコンポーネント
// Train line multi-select shared by the rent / sale search forms

import { useState } from 'react'
import { TRAIN_LINE_GROUPS, groupLabel, lineLabel } from '@/lib/trainLines'
import type { Locale } from '@/lib/translations'

const L = {
  ja: {
    label: '沿線',
    hint: '複数選択できます',
    selectedCount: (n: number) => `${n}路線を選択中`,
    clear: '選択をクリア',
  },
  zh: {
    label: '沿線',
    hint: '可複選',
    selectedCount: (n: number) => `已選擇${n}條路線`,
    clear: '清除選擇',
  },
  en: {
    label: 'Train Lines',
    hint: 'Multiple selections allowed',
    selectedCount: (n: number) => `${n} line${n === 1 ? '' : 's'} selected`,
    clear: 'Clear selection',
  },
} as const

export default function LineSelector({
  locale,
  selected,
  onChange,
}: {
  locale: Locale
  selected: string[]
  onChange: (ids: string[]) => void
}) {
  const s = L[locale]
  const [openGroup, setOpenGroup] = useState<string | null>(TRAIN_LINE_GROUPS[0].id)

  const toggleLine = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase">
          {s.label}
          <span className="ml-3 normal-case tracking-normal text-ink/35">{s.hint}</span>
        </label>
        {selected.length > 0 && (
          <span className="flex items-center gap-3 text-xs text-ink/55">
            {s.selectedCount(selected.length)}
            <button
              type="button"
              onClick={() => onChange([])}
              className="underline underline-offset-2 decoration-ink/25 hover:text-ink transition-colors"
            >
              {s.clear}
            </button>
          </span>
        )}
      </div>

      <div className="border border-ink/15 bg-white/80 divide-y divide-ink/10">
        {TRAIN_LINE_GROUPS.map((group) => {
          const isOpen = openGroup === group.id
          const countInGroup = group.lines.filter((l) => selected.includes(l.id)).length
          return (
            <div key={group.id}>
              <button
                type="button"
                onClick={() => setOpenGroup(isOpen ? null : group.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink/75 hover:bg-gold-50/60 transition-colors duration-300"
              >
                <span className="flex items-center gap-3">
                  {groupLabel(group, locale)}
                  {countInGroup > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[1.35rem] h-[1.35rem] px-1 bg-ink text-washi text-[10px] rounded-full">
                      {countInGroup}
                    </span>
                  )}
                </span>
                <span
                  className={`text-ink/40 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {group.lines.map((line) => {
                    const active = selected.includes(line.id)
                    return (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => toggleLine(line.id)}
                        aria-pressed={active}
                        className={`py-2 px-2.5 text-xs sm:text-[13px] border text-left leading-snug transition-colors duration-300 ${
                          active
                            ? 'bg-ink text-washi border-ink'
                            : 'bg-white/80 border-ink/15 text-ink/65 hover:border-ink/40'
                        }`}
                      >
                        {lineLabel(line, locale)}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
