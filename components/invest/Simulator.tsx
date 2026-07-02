'use client'

// 収益シミュレーション — 一棟収益物件用
// 購入条件・運営条件を入力し、年間収支と長期キャッシュフローを試算する

import { useMemo, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LineChart, CountUp, type SeriesPoint } from '@/components/charts/AnimatedCharts'
import type { InvestProperty } from '@/lib/invest'

const L = {
  ja: {
    purchase: '購入条件',
    operation: '運営条件',
    price: '物件価格',
    downPayment: '自己資金',
    loanRate: '借入金利（年）',
    loanYears: '借入期間',
    years: '年',
    grossYield: '表面利回り',
    occupancy: '想定稼働率',
    expenseRatio: '運営経費率',
    expenseNote: '管理費・修繕・固定資産税等の年間賃料に対する割合',
    purchaseCost: '購入諸費用率',
    purchaseCostNote: '仲介手数料・登記・不動産取得税等（物件価格比）',
    results: '試算結果',
    annualRent: '満室想定年間賃料',
    effectiveRent: '実効賃料収入（稼働率考慮）',
    opex: '年間運営経費',
    noi: 'NOI（純収益）',
    noiYield: 'NOI利回り',
    loanAmount: '借入金額',
    annualDebt: '年間返済額',
    cashFlow: '税引前キャッシュフロー（年）',
    monthlyCF: '（月あたり',
    totalInvestment: '総投資額（諸費用込）',
    cashOnCash: '自己資金利回り（CCR）',
    chartTitle: '累積キャッシュフローの推移（30年）',
    chartCum: '累積税引前CF',
    chartBalance: 'ローン残高',
    manYen: '万円',
    disclaimer:
      '本シミュレーションは簡易試算であり、税金・空室変動・金利変動・大規模修繕等を完全には反映していません。実際の投資判断にあたっては、個別の資料とあわせて専門家にご相談ください。',
    reset: '初期値に戻す',
  },
  zh: {
    purchase: '购买条件',
    operation: '运营条件',
    price: '物业价格',
    downPayment: '自有资金',
    loanRate: '贷款利率（年）',
    loanYears: '贷款年限',
    years: '年',
    grossYield: '表面收益率',
    occupancy: '预计入住率',
    expenseRatio: '运营费用率',
    expenseNote: '管理费·修缮·固定资产税等占年租金的比例',
    purchaseCost: '购买杂费率',
    purchaseCostNote: '中介费·登记·不动产取得税等（占物业价格）',
    results: '试算结果',
    annualRent: '满室预计年租金',
    effectiveRent: '实际租金收入（考虑入住率）',
    opex: '年运营费用',
    noi: 'NOI（净收益）',
    noiYield: 'NOI收益率',
    loanAmount: '贷款金额',
    annualDebt: '年还款额',
    cashFlow: '税前现金流（年）',
    monthlyCF: '（每月约',
    totalInvestment: '总投资额（含杂费）',
    cashOnCash: '自有资金收益率（CCR）',
    chartTitle: '累计现金流推移（30年）',
    chartCum: '累计税前现金流',
    chartBalance: '贷款余额',
    manYen: '万円',
    disclaimer:
      '本模拟为简易试算，未完全反映税金、空置变动、利率变动、大规模修缮等因素。实际投资决策请结合物业资料咨询专业人士。',
    reset: '恢复初始值',
  },
  en: {
    purchase: 'Purchase Terms',
    operation: 'Operating Assumptions',
    price: 'Property Price',
    downPayment: 'Down Payment',
    loanRate: 'Interest Rate (p.a.)',
    loanYears: 'Loan Term',
    years: 'yrs',
    grossYield: 'Gross Yield',
    occupancy: 'Occupancy Rate',
    expenseRatio: 'Expense Ratio',
    expenseNote: 'Management, repairs, property tax etc. as % of annual rent',
    purchaseCost: 'Acquisition Cost Ratio',
    purchaseCostNote: 'Brokerage, registration, acquisition tax etc. (% of price)',
    results: 'Results',
    annualRent: 'Full-Occupancy Annual Rent',
    effectiveRent: 'Effective Rental Income',
    opex: 'Annual Operating Expenses',
    noi: 'NOI (Net Operating Income)',
    noiYield: 'NOI Yield',
    loanAmount: 'Loan Amount',
    annualDebt: 'Annual Debt Service',
    cashFlow: 'Pre-Tax Cash Flow (Annual)',
    monthlyCF: '(approx. monthly',
    totalInvestment: 'Total Investment (incl. costs)',
    cashOnCash: 'Cash-on-Cash Return',
    chartTitle: 'Cumulative Cash Flow — 30 Years',
    chartCum: 'Cumulative Pre-Tax CF',
    chartBalance: 'Loan Balance',
    manYen: '万円',
    disclaimer:
      'This is a simplified simulation. Taxes, vacancy fluctuations, rate changes, and major repairs are not fully reflected. Please consult professionals with property documents before making investment decisions.',
    reset: 'Reset to Defaults',
  },
} as const

function manYen(v: number): string {
  return Math.round(v / 10000).toLocaleString('ja-JP')
}

interface SimInput {
  priceMan: number // 万円
  downMan: number // 万円
  rate: number // %
  yearsLoan: number
  grossYield: number // %
  occupancy: number // %
  expenseRatio: number // %
  purchaseCostRatio: number // %
}

const inputCls =
  'w-full bg-white/70 border border-ink/15 px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-ink/50 transition-colors'
const labelCls = 'block text-[11px] tracking-widest text-ink/50 mb-1.5'

// ※ レンダー内で定義すると入力のたびに再マウントされフォーカスが外れるため、モジュールレベルで定義
function Field({
  label,
  k,
  value,
  onChange,
  step = 1,
  suffix,
  note,
}: {
  label: string
  k: keyof SimInput
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  step?: number
  suffix: string
  note?: string
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={`sim-${k}`}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={`sim-${k}`}
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={onChange}
          className={inputCls}
        />
        <span className="text-ink/45 text-xs whitespace-nowrap">{suffix}</span>
      </div>
      {note && <p className="mt-1 text-ink/35 text-[10.5px] leading-snug">{note}</p>}
    </div>
  )
}

function ResultRow({ label, value, strong = false, negativeRed = false }: { label: string; value: string; strong?: boolean; negativeRed?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between py-3 border-b border-ink/10 ${strong ? 'bg-ink/[0.03] px-3 -mx-3' : ''}`}>
      <span className={`text-[13px] tracking-wide ${strong ? 'text-ink/80' : 'text-ink/50'}`}>{label}</span>
      <span
        className={`font-serif ${strong ? 'text-xl text-ink' : 'text-[15px] text-ink/80'} ${
          negativeRed && value.startsWith('-') ? 'text-red-800' : ''
        }`}
      >
        {value}
      </span>
    </div>
  )
}

export default function Simulator({ property }: { property: InvestProperty }) {
  const { locale } = useLanguage()
  const s = L[locale]

  const defaults: SimInput = useMemo(
    () => ({
      priceMan: Math.round(property.price / 10000),
      downMan: Math.round((property.price * 0.2) / 10000),
      rate: 1.8,
      yearsLoan: 30,
      grossYield: property.grossYield,
      occupancy: 95,
      expenseRatio: 20,
      purchaseCostRatio: 7,
    }),
    [property]
  )

  const [inp, setInp] = useState<SimInput>(defaults)

  const set = (k: keyof SimInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setInp((prev) => ({ ...prev, [k]: Number.isFinite(v) ? v : 0 }))
  }

  const calc = useMemo(() => {
    const price = inp.priceMan * 10000
    const down = Math.min(inp.downMan * 10000, price)
    const purchaseCost = (price * inp.purchaseCostRatio) / 100
    const loan = Math.max(price - down, 0)
    const annualRentFull = (price * inp.grossYield) / 100
    const effectiveRent = (annualRentFull * inp.occupancy) / 100
    const opex = (effectiveRent * inp.expenseRatio) / 100
    const noi = effectiveRent - opex

    // 元利均等返済
    const r = inp.rate / 100 / 12
    const n = inp.yearsLoan * 12
    const monthlyPay = loan > 0 && r > 0 ? (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan > 0 ? loan / n : 0
    const annualDebt = monthlyPay * 12
    const cf = noi - annualDebt
    const totalInvestment = down + purchaseCost
    const ccr = totalInvestment > 0 ? (cf / totalInvestment) * 100 : 0
    const noiYield = price > 0 ? (noi / price) * 100 : 0

    // 30年キャッシュフロー曲線 + ローン残高
    const cumCF: SeriesPoint[] = []
    const balance: SeriesPoint[] = []
    let bal = loan
    let cum = -totalInvestment
    for (let yr = 0; yr <= 30; yr++) {
      if (yr > 0) {
        // 1年分返済して残高更新
        for (let m = 0; m < 12; m++) {
          if (bal <= 0) break
          const interest = bal * r
          const principal = Math.min(monthlyPay - interest, bal)
          bal -= principal
        }
        const debtThisYear = yr <= inp.yearsLoan ? annualDebt : 0
        cum += noi - debtThisYear
      }
      cumCF.push({ label: `${yr}`, value: Math.round(cum / 10000) })
      balance.push({ label: `${yr}`, value: Math.round(Math.max(bal, 0) / 10000) })
    }

    return { annualRentFull, effectiveRent, opex, noi, loan, annualDebt, cf, totalInvestment, ccr, noiYield, cumCF, balance }
  }, [inp])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* 入力 */}
      <div className="lg:col-span-5">
        <div className="border border-ink/10 bg-gold-50/70 p-6 lg:p-8">
          <p className="font-serif text-xs tracking-widest2 uppercase text-gold-600 mb-6">{s.purchase}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-10">
            <Field label={s.price} k="priceMan" value={inp.priceMan} onChange={set('priceMan')} step={100} suffix={s.manYen} />
            <Field label={s.downPayment} k="downMan" value={inp.downMan} onChange={set('downMan')} step={100} suffix={s.manYen} />
            <Field label={s.loanRate} k="rate" value={inp.rate} onChange={set('rate')} step={0.05} suffix="%" />
            <Field label={s.loanYears} k="yearsLoan" value={inp.yearsLoan} onChange={set('yearsLoan')} step={1} suffix={s.years} />
            <Field label={s.purchaseCost} k="purchaseCostRatio" value={inp.purchaseCostRatio} onChange={set('purchaseCostRatio')} step={0.5} suffix="%" note={s.purchaseCostNote} />
          </div>
          <p className="font-serif text-xs tracking-widest2 uppercase text-gold-600 mb-6">{s.operation}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <Field label={s.grossYield} k="grossYield" value={inp.grossYield} onChange={set('grossYield')} step={0.05} suffix="%" />
            <Field label={s.occupancy} k="occupancy" value={inp.occupancy} onChange={set('occupancy')} step={1} suffix="%" />
            <Field label={s.expenseRatio} k="expenseRatio" value={inp.expenseRatio} onChange={set('expenseRatio')} step={1} suffix="%" note={s.expenseNote} />
          </div>
          <button
            onClick={() => setInp(defaults)}
            className="mt-8 text-ink/45 hover:text-ink text-xs tracking-widest underline underline-offset-4 decoration-ink/25 transition-colors"
          >
            {s.reset}
          </button>
        </div>
      </div>

      {/* 結果 */}
      <div className="lg:col-span-7">
        <p className="font-serif text-xs tracking-widest2 uppercase text-gold-600 mb-6">{s.results}</p>

        {/* 主要指標 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-ink/10 border border-ink/10 mb-8">
          {[
            { label: s.cashFlow, v: calc.cf, fmt: (x: number) => `${manYen(x)}${s.manYen}` },
            { label: s.cashOnCash, v: calc.ccr, fmt: (x: number) => `${x.toFixed(2)}%` },
            { label: s.noiYield, v: calc.noiYield, fmt: (x: number) => `${x.toFixed(2)}%` },
          ].map((m) => (
            <div key={m.label} className="bg-white/80 px-4 py-6 text-center">
              <p className="text-[10.5px] tracking-widest text-ink/45 mb-2 leading-snug">{m.label}</p>
              <p className={`font-serif text-2xl ${m.v < 0 ? 'text-red-800' : 'text-ink'}`}>
                <CountUp value={m.v} formatValue={m.fmt} />
              </p>
            </div>
          ))}
        </div>

        {/* 明細 */}
        <dl className="mb-12 border-t border-ink/10">
          <ResultRow label={s.annualRent} value={`${manYen(calc.annualRentFull)}${s.manYen}`} />
          <ResultRow label={s.effectiveRent} value={`${manYen(calc.effectiveRent)}${s.manYen}`} />
          <ResultRow label={s.opex} value={`-${manYen(calc.opex)}${s.manYen}`} />
          <ResultRow label={s.noi} value={`${manYen(calc.noi)}${s.manYen}`} strong />
          <ResultRow label={s.loanAmount} value={`${manYen(calc.loan)}${s.manYen}`} />
          <ResultRow label={s.annualDebt} value={`-${manYen(calc.annualDebt)}${s.manYen}`} />
          <ResultRow
            label={`${s.cashFlow} ${s.monthlyCF} ${manYen(calc.cf / 12)}${s.manYen}）`}
            value={`${calc.cf < 0 ? '' : ''}${manYen(calc.cf)}${s.manYen}`}
            strong
            negativeRed
          />
          <ResultRow label={s.totalInvestment} value={`${manYen(calc.totalInvestment)}${s.manYen}`} />
        </dl>

        {/* 30年チャート */}
        <p className="text-ink/60 text-sm tracking-wide mb-4">{s.chartTitle}</p>
        <div className="border border-ink/10 bg-white/60 p-5 lg:p-7">
          <LineChart
            data={calc.cumCF}
            data2={calc.balance}
            seriesName={s.chartCum}
            series2Name={s.chartBalance}
            unit={s.manYen}
            tightY
            height={320}
            formatValue={(v) => v.toLocaleString('ja-JP')}
          />
        </div>

        <p className="mt-8 text-ink/40 text-[11px] leading-relaxed">{s.disclaimer}</p>
      </div>
    </div>
  )
}
