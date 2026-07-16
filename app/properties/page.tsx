'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/Reveal'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'
import { IMAGES } from '@/lib/images'
import { INVEST_PROPERTIES, formatOku } from '@/lib/invest'

// 統合された物件の種別
 type PropertyKind = 'rent' | 'sale' | 'invest'

interface UnifiedProperty {
  id: string
  kind: PropertyKind
  title: string
  location: string
  price: number
  priceDisplay: string
  features: string[]
  nearestStation: string
  image: string
  rooms?: string
  area?: string
  yield?: number
  units?: number
  built?: string
  structure?: string
  catch?: string
  published?: boolean
}

// 賃貸サンプル物件
const rentProperties = [
  {
    id: 'r1',
    title: 'モダンな1LDKマンション',
    price: 85000,
    location: '東京都渋谷区',
    rooms: '1LDK',
    area: 35,
    features: ['駅近', 'ペット可', '南向き', 'オートロック'],
    nearestStation: '渋谷駅 徒歩5分',
    image: IMAGES.windowLight,
  },
  {
    id: 'r2',
    title: 'ファミリー向け2LDK',
    price: 120000,
    location: '東京都世田谷区',
    rooms: '2LDK',
    area: 55,
    features: ['駐車場あり', 'リノベーション済み', '角部屋'],
    nearestStation: '三軒茶屋駅 徒歩8分',
    image: IMAGES.biophilic,
  },
  {
    id: 'r3',
    title: '都心の好立地1K',
    price: 75000,
    location: '東京都港区',
    rooms: '1K',
    area: 25,
    features: ['駅近', '築浅', 'セキュリティ充実'],
    nearestStation: '六本木駅 徒歩3分',
    image: IMAGES.corridor,
  },
  {
    id: 'r4',
    title: '広々としたデザイナーズ',
    price: 150000,
    location: '東京都目黒区',
    rooms: '2LDK',
    area: 60,
    features: ['デザイナーズ', 'ルーフバルコニー', '最上階'],
    nearestStation: '中目黒駅 徒歩7分',
    image: IMAGES.geometric,
  },
]

// 売買サンプル物件
const saleProperties = [
  {
    id: 's1',
    type: 'apartment',
    title: '渋谷区 マンション',
    price: '58,000,000',
    location: '東京都渋谷区',
    area: '70㎡',
    features: ['駅近', '南向き'],
    nearestStation: '渋谷駅 徒歩6分',
    image: IMAGES.geometric,
  },
  {
    id: 's2',
    type: 'house',
    title: '世田谷区 一戸建て',
    price: '72,000,000',
    location: '東京都世田谷区',
    area: '120㎡',
    features: ['駐車場あり', '庭付き'],
    nearestStation: '三軒茶屋駅 徒歩8分',
    image: IMAGES.concreteColumns,
  },
  {
    id: 's3',
    type: 'apartment',
    title: '港区 マンション',
    price: '45,000,000',
    location: '東京都港区',
    area: '65㎡',
    features: ['駅近', 'リノベーション済み'],
    nearestStation: '六本木駅 徒歩4分',
    image: IMAGES.windowLight,
  },
  {
    id: 's4',
    type: 'land',
    title: '目黒区 土地',
    price: '30,000,000',
    location: '東京都目黒区',
    area: '100㎡',
    features: ['建築条件なし', '閑静な住宅街'],
    nearestStation: '中目黒駅 徒歩9分',
    image: IMAGES.pavementFog,
  },
]

const saleTypeLabels = {
  apartment: 'マンション',
  house: '一戸建て',
  land: '土地',
}

const inputClass =
  'w-full px-4 py-3 bg-white/80 border hairline focus:border-ink/40 transition-colors text-sm text-ink placeholder:text-ink/35'

export default function PropertiesPage() {
  const { locale } = useLanguage()
  const t = translations[locale]
  const p = t.properties

  const [activeTab, setActiveTab] = useState<'all' | PropertyKind>('invest')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // 投資物件を統一形式に変換
  const investProperties = useMemo<UnifiedProperty[]>(
    () =>
      INVEST_PROPERTIES.map((item) => ({
        id: item.slug,
        kind: 'invest' as PropertyKind,
        title: item.name[locale],
        location: item.address,
        price: item.price,
        priceDisplay: formatOku(item.price),
        yield: item.grossYield,
        units: item.units,
        built: item.built[locale],
        structure: item.structure[locale],
        area: item.totalFloorArea,
        features: [item.badge === 'new' ? '新築' : '築浅'],
        nearestStation: item.access[0] || '',
        image: `/assets/invest/${item.slug}/01.jpg`,
        published: item.published,
        catch: item.catch[locale],
      })),
    [locale]
  )

  // 賃貸物件を統一形式に変換
  const rentItems = useMemo<UnifiedProperty[]>(
    () =>
      rentProperties.map((item) => ({
        id: item.id,
        kind: 'rent' as PropertyKind,
        title: item.title,
        location: item.location,
        price: item.price,
        priceDisplay: `¥${item.price.toLocaleString()}`,
        rooms: item.rooms,
        area: `${item.area}㎡`,
        features: item.features,
        nearestStation: item.nearestStation,
        image: item.image,
      })),
    []
  )

  // 売買物件を統一形式に変換
  const saleItems = useMemo<UnifiedProperty[]>(
    () =>
      saleProperties.map((item) => ({
        id: item.id,
        kind: 'sale' as PropertyKind,
        title: item.title,
        location: item.location,
        price: parseInt(item.price.replace(/,/g, ''), 10),
        priceDisplay: `¥${item.price}`,
        area: item.area,
        features: item.features,
        nearestStation: item.nearestStation,
        image: item.image,
      })),
    []
  )

  const allProperties = useMemo(
    () => [...rentItems, ...saleItems, ...investProperties],
    [rentItems, saleItems, investProperties]
  )

  const filteredProperties = useMemo(() => {
    let result = allProperties

    if (activeTab !== 'all') {
      result = result.filter((item) => item.kind === activeTab)
    }

    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase()
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(kw) ||
          item.location.toLowerCase().includes(kw) ||
          item.nearestStation.toLowerCase().includes(kw)
      )
    }

    if (selectedArea) {
      const areaMap: Record<string, string[]> = {
        tokyo23: ['東京都'],
        shibuya: ['渋谷区'],
        minato: ['港区'],
        shinjuku: ['新宿区'],
        setagaya: ['世田谷区'],
        meguro: ['目黒区'],
        kanagawa: ['神奈川県'],
        chiba: ['千葉県'],
        saitama: ['埼玉県'],
      }
      const targets = areaMap[selectedArea] || [selectedArea]
      result = result.filter((item) =>
        targets.some((target) => item.location.includes(target))
      )
    }

    if (minPrice) {
      const min = parseInt(minPrice, 10)
      result = result.filter((item) => item.price >= min)
    }
    if (maxPrice) {
      const max = parseInt(maxPrice, 10)
      result = result.filter((item) => item.price <= max)
    }

    return result
  }, [allProperties, activeTab, searchKeyword, selectedArea, minPrice, maxPrice])

  const subNavItems: { key: PropertyKind; label: string; href: string }[] = [
    { key: 'invest', label: p.invest, href: '/invest' },
    { key: 'rent', label: p.rent, href: '/rent' },
    { key: 'sale', label: p.sale, href: '/sale' },
  ]

  const tabs: { key: PropertyKind; label: string }[] = [
    { key: 'invest', label: p.invest },
    { key: 'rent', label: p.rent },
    { key: 'sale', label: p.sale },
  ]

  const badgeText = {
    rent: p.rentBadge,
    sale: p.saleBadge,
    invest: p.investBadge,
  }

  const badgeColor = {
    rent: 'bg-emerald-700/90',
    sale: 'bg-gold-700/90',
    invest: 'bg-ink/90',
  }

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label={p.label}
        title={p.title}
        subtitle={p.subtitle}
        image="concreteColumns"
        alt="光と影が織りなす建築空間"
      />

      {/* 検索フォーム */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal>
            <div className="border hairline bg-gold-50/60 p-7 md:p-12">
              <p className="section-label mb-3">Search</p>
              <Heading level={3} className="mb-10 text-ink">
                {p.searchTitle}
              </Heading>

              <div className="space-y-8">
                {/* キーワード検索 */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {t.common?.search || '検索'}
                  </label>
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder={p.searchPlaceholder}
                    className={inputClass}
                  />
                </div>

                {/* エリア選択 */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {p.areaLabel}
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">{p.selectWard}</option>
                    <option value="tokyo23">東京23区</option>
                    <option value="shibuya">渋谷区</option>
                    <option value="minato">港区</option>
                    <option value="shinjuku">新宿区</option>
                    <option value="setagaya">世田谷区</option>
                    <option value="meguro">目黒区</option>
                    <option value="kanagawa">神奈川県</option>
                    <option value="chiba">千葉県</option>
                    <option value="saitama">埼玉県</option>
                  </select>
                </div>

                {/* 価格範囲 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                      {p.minPrice}
                    </label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder={p.pricePlaceholderMin}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                      {p.maxPrice}
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder={p.pricePlaceholderMax}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* 検索ボタン */}
                <button className="w-full bg-ink text-washi py-4 text-sm tracking-[0.25em] hover:bg-gold-800 transition-colors duration-500">
                  {p.searchButton}
                </button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 物件種別タブ + 一覧 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Properties</p>
            <Heading level={2} className="text-ink">
              {p.recommended}
            </Heading>
          </Reveal>

          {/* 物件種別ナビゲーション（ページ内） */}
          <Reveal className="mb-10">
            <div className="border hairline bg-white/70">
              <div className="flex flex-wrap">
                {subNavItems.map((item) => {
                  const isActive = activeTab === item.key
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveTab(item.key)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`flex-1 min-w-[8rem] py-4 text-sm tracking-widest text-center transition-colors duration-500 border-r hairline last:border-r-0 ${
                        isActive
                          ? 'bg-ink text-washi'
                          : 'bg-white/40 text-ink/70 hover:bg-white/80 hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* 結果件数 */}
          <Reveal className="mb-8">
            <p className="text-ink/50 text-sm">
              {p.totalResults} <span className="text-ink font-medium">{filteredProperties.length}</span>
              {p.resultsCount}
            </p>
          </Reveal>

          {/* 物件カードグリッド */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {filteredProperties.map((property, index) => (
                <Reveal key={property.id} delay={(index % 2) as 0 | 1}>
                  <article className="group border border-ink/10 bg-white/60 hover:border-ink/30 transition-colors duration-500">
                    {/* 画像 */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-gold-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-quiet group-hover:scale-[1.04]"
                        style={{ backgroundImage: `url('${property.image}')` }}
                        role="img"
                        aria-label={property.title}
                      />
                      <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
                      <span
                        className={`absolute top-4 left-4 text-washi text-[11px] tracking-widest px-3 py-1.5 ${
                          badgeColor[property.kind]
                        }`}
                      >
                        {badgeText[property.kind]}
                      </span>

                      {property.kind === 'invest' ? (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent px-5 pt-10 pb-4 flex items-end justify-between">
                          <span className="font-serif text-washi text-xl tracking-wide">
                            {property.priceDisplay}
                          </span>
                          <span className="text-washi/85 text-sm tracking-widest">
                            {p.grossYield} {property.yield?.toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        <p className="absolute bottom-0 left-0 bg-ink/85 text-washi px-5 py-2.5 font-serif text-lg">
                          {property.priceDisplay}
                          {property.kind === 'rent' && (
                            <span className="text-washi/50 text-xs ml-1.5">/ {p.monthlyRent}</span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* 情報 */}
                    <div className="p-6 lg:p-7">
                      <Heading level={4} className="mb-3 text-ink leading-snug">
                        {property.title}
                      </Heading>

                      {'catch' in property && property.catch && (
                        <p className="text-ink/55 text-sm leading-relaxed mb-3">{property.catch}</p>
                      )}

                      <div className="text-ink/55 text-sm leading-relaxed mb-4 space-y-1">
                        <p>{property.location}</p>
                        <p>{property.nearestStation}</p>
                        {'rooms' in property && property.rooms && (
                          <p>
                            {p.layout} {property.rooms} ／ {property.area}
                          </p>
                        )}
                        {'built' in property && property.built && (
                          <p>
                            {p.built} {property.built}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {property.features.slice(0, 4).map((feature, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 border border-ink/15 text-ink/55 text-xs tracking-wide"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 py-2.5 border border-ink/25 text-ink/70 text-sm tracking-widest hover:border-ink hover:text-ink transition-colors duration-500">
                          {p.favorite}
                        </button>
                        {property.kind === 'invest' ? (
                          <Link
                            href={`/invest/${property.id}`}
                            className="flex-1 py-2.5 bg-ink text-washi text-sm tracking-widest hover:bg-gold-800 transition-colors duration-500 text-center"
                          >
                            {p.viewDetails}
                          </Link>
                        ) : (
                          <Link
                            href={`/properties/${property.id}`}
                            className="flex-1 py-2.5 bg-ink text-washi text-sm tracking-widest hover:bg-gold-800 transition-colors duration-500 text-center"
                          >
                            {p.viewDetails}
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="text-center py-20 border hairline bg-white/60">
                <Text size="base" color="light">
                  {p.noResults}
                </Text>
              </div>
            </Reveal>
          )}

          {filteredProperties.length > 0 && (
            <Reveal className="text-center mt-16">
              <button className="inline-flex items-center gap-3 border border-ink/30 text-ink px-10 py-3.5 text-sm tracking-[0.2em] hover:bg-ink hover:text-washi transition-all duration-700">
                {p.loadMore}
              </button>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" spacing="md">
        <Container>
          <Reveal className="text-center">
            <Heading level={3} align="center" className="mb-4 text-washi">
              {t.cta.title}
              <span className="text-gold-300">{t.cta.subtitle}</span>
            </Heading>
            <Text size="base" className="mb-10 max-w-2xl mx-auto !text-washi/60">
              {t.cta.description}
            </Text>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-washi text-ink px-9 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
            >
              {t.nav.contact}
            </Link>
          </Reveal>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
