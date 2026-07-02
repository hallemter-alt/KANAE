'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/Reveal'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'
import { IMAGES } from '@/lib/images'
import LineSelector from '@/components/search/LineSelector'

// サンプル物件データ
const sampleProperties = [
  {
    id: 1,
    title: 'モダンな1LDKマンション',
    rent: 85000,
    location: '東京都渋谷区',
    rooms: '1LDK',
    area: 35,
    features: ['駅近', 'ペット可', '南向き', 'オートロック'],
    nearestStation: '渋谷駅 徒歩5分',
    image: IMAGES.windowLight,
  },
  {
    id: 2,
    title: 'ファミリー向け2LDK',
    rent: 120000,
    location: '東京都世田谷区',
    rooms: '2LDK',
    area: 55,
    features: ['駐車場あり', 'リノベーション済み', '角部屋'],
    nearestStation: '三軒茶屋駅 徒歩8分',
    image: IMAGES.biophilic,
  },
  {
    id: 3,
    title: '都心の好立地1K',
    rent: 75000,
    location: '東京都港区',
    rooms: '1K',
    area: 25,
    features: ['駅近', '築浅', 'セキュリティ充実'],
    nearestStation: '六本木駅 徒歩3分',
    image: IMAGES.corridor,
  },
  {
    id: 4,
    title: '広々としたデザイナーズ',
    rent: 150000,
    location: '東京都目黒区',
    rooms: '2LDK',
    area: 60,
    features: ['デザイナーズ', 'ルーフバルコニー', '最上階'],
    nearestStation: '中目黒駅 徒歩7分',
    image: IMAGES.geometric,
  },
]

const inputClass =
  'w-full px-4 py-3 bg-white/80 border hairline focus:border-ink/40 transition-colors text-sm text-ink placeholder:text-ink/35'

export default function RentPage() {
  const { locale } = useLanguage()
  const t = translations[locale]
  const [selectedArea, setSelectedArea] = useState('')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [selectedLines, setSelectedLines] = useState<string[]>([])

  const handleRoomToggle = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    )
  }

  const steps = [
    { title: t.rent.step1, desc: t.rent.step1Desc },
    { title: t.rent.step2, desc: t.rent.step2Desc },
    { title: t.rent.step3, desc: t.rent.step3Desc },
    { title: t.rent.step4, desc: t.rent.step4Desc },
    { title: t.rent.step5, desc: t.rent.step5Desc },
  ]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="For Rent"
        title={t.rent.title}
        subtitle={t.rent.subtitle}
        image="biophilic"
        alt="緑と光に包まれた住まい"
      />

      {/* 検索フォーム */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal>
            <div className="border hairline bg-gold-50/60 p-7 md:p-12">
              <p className="section-label mb-3">Search</p>
              <Heading level={3} className="mb-10 text-ink">{t.rent.searchTitle}</Heading>

              <div className="space-y-8">
                {/* エリア選択 */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {t.rent.area}
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">{t.rent.areaPlaceholder}</option>
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

                {/* 沿線選択 */}
                <LineSelector locale={locale} selected={selectedLines} onChange={setSelectedLines} />

                {/* 賃料範囲 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                      {t.rent.minRent}
                    </label>
                    <input
                      type="number"
                      value={minRent}
                      onChange={(e) => setMinRent(e.target.value)}
                      placeholder="50,000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                      {t.rent.maxRent}
                    </label>
                    <input
                      type="number"
                      value={maxRent}
                      onChange={(e) => setMaxRent(e.target.value)}
                      placeholder="200,000"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* 間取り選択 */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {t.rent.layout}
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleRoomToggle(type)}
                        aria-pressed={selectedRooms.includes(type)}
                        className={`py-2.5 text-sm border transition-colors duration-300 ${
                          selectedRooms.includes(type)
                            ? 'bg-ink text-washi border-ink'
                            : 'bg-white/80 border-ink/15 text-ink/70 hover:border-ink/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* こだわり条件 */}
                <div>
                  <label className="block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
                    {t.rent.features}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {['駅近（徒歩5分以内）', 'ペット可', 'バス・トイレ別', 'オートロック', '築浅（5年以内）', '駐車場あり'].map((condition) => (
                      <label
                        key={condition}
                        className="flex items-center gap-3 py-2.5 px-4 bg-white/80 border border-ink/15 hover:border-ink/40 cursor-pointer transition-colors duration-300 text-sm text-ink/70"
                      >
                        <input type="checkbox" className="accent-ink" />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 検索ボタン */}
                <button className="w-full bg-ink text-washi py-4 text-sm tracking-[0.25em] hover:bg-gold-800 transition-colors duration-500">
                  {t.rent.searchButton}
                </button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* おすすめ物件 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Pick Up</p>
            <Heading level={2} className="text-ink">{t.rent.recommended}</Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {sampleProperties.map((property, index) => (
              <Reveal key={property.id} delay={(index % 2) as 0 | 1}>
                <article className="group">
                  <div className="img-breathe relative overflow-hidden aspect-[4/3] mb-5 bg-gold-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${property.image}')` }}
                      role="img"
                      aria-label={property.title}
                    />
                    <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
                    <p className="absolute bottom-0 left-0 bg-ink/85 text-washi px-5 py-2.5 font-serif text-lg">
                      ¥{property.rent.toLocaleString()}
                      <span className="text-washi/50 text-xs ml-1.5">{t.rent.perMonth}</span>
                    </p>
                  </div>

                  <Heading level={4} className="mb-3 text-ink">
                    {property.title}
                  </Heading>

                  <div className="text-ink/55 text-sm leading-relaxed mb-4 space-y-1">
                    <p>{property.location} ｜ {property.nearestStation}</p>
                    <p>{property.rooms} ／ {property.area}㎡</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.features.map((feature, i) => (
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
                      {t.rent.favorite}
                    </button>
                    <button className="flex-1 py-2.5 bg-ink text-washi text-sm tracking-widest hover:bg-gold-800 transition-colors duration-500">
                      {t.rent.viewDetails}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-16">
            <button className="inline-flex items-center gap-3 border border-ink/30 text-ink px-10 py-3.5 text-sm tracking-[0.2em] hover:bg-ink hover:text-washi transition-all duration-700">
              {t.rent.loadMore}
            </button>
          </Reveal>
        </Container>
      </Section>

      {/* 賃貸の流れ */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Flow</p>
            <Heading level={2} className="text-ink">
              {t.rent.rentalProcess}
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-l hairline">
            {steps.map((step, i) => (
              <Reveal key={i} delay={(i % 3) as 0 | 1 | 2} className="border-b border-r hairline p-7">
                <span className="font-serif text-gold-400 text-xs tracking-[0.3em] block mb-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Heading level={5} className="mb-2.5 text-ink">{step.title}</Heading>
                <Text size="sm" color="light">{step.desc}</Text>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" spacing="md">
        <Container>
          <Reveal className="text-center">
            <Heading level={3} align="center" className="mb-4 text-washi">
              {t.management.ctaTitle}
            </Heading>
            <Text size="base" className="mb-10 max-w-2xl mx-auto !text-washi/60">
              {t.management.ctaDescription}
            </Text>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-washi text-ink px-9 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
            >
              {t.management.ctaButton}
            </a>
          </Reveal>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
