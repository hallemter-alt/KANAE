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

export default function ManagementPage() {
  const { locale } = useLanguage()
  const t = translations[locale]
  const [activeTab, setActiveTab] = useState<'owner' | 'tenant'>('owner')

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="Property Management"
        title={t.management.title}
        subtitle={t.management.subtitle}
        image="concreteShadow"
        alt="時を経たコンクリートに落ちる木の影"
      />

      {/* タブ切り替え */}
      <Section background="white" spacing="sm">
        <Container>
          <div className="flex justify-center border-b hairline" role="tablist">
            {[
              { key: 'owner' as const, label: t.management.forOwners },
              { key: 'tenant' as const, label: t.management.forTenants },
            ].map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 sm:px-12 py-4 font-serif text-base sm:text-lg tracking-widest transition-colors duration-500 border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink/40 hover:text-ink/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* オーナー様向け */}
      {activeTab === 'owner' && (
        <>
          <Section background="white" spacing="lg">
            <Container maxWidth="lg">
              <Reveal className="mb-14">
                <p className="section-label mb-4">For Owners</p>
                <Heading level={2} className="text-ink">
                  {t.management.ownerServices}
                </Heading>
              </Reveal>

              {/* 三つの特徴 */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l hairline mb-20">
                {[
                  { title: t.management.feature1, desc: t.management.feature1Desc },
                  { title: t.management.feature2, desc: t.management.feature2Desc },
                  { title: t.management.feature3, desc: t.management.feature3Desc },
                ].map((item, i) => (
                  <Reveal key={i} delay={(i % 3) as 0 | 1 | 2} className="border-b border-r hairline p-8 md:p-10">
                    <span className="font-serif text-gold-400 text-xs tracking-[0.3em] block mb-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Heading level={4} className="mb-3 text-ink">{item.title}</Heading>
                    <Text size="sm" color="light">{item.desc}</Text>
                  </Reveal>
                ))}
              </div>

              {/* 詳細サービス */}
              <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
                <ServiceList
                  title={t.management.rentManagement}
                  items={['家賃の集金代行・振込管理', '滞納家賃の督促・回収', '入出金明細の定期報告', '収支レポートの作成', '確定申告用の資料作成サポート']}
                />
                <ServiceList
                  title={t.management.buildingManagement}
                  items={['定期清掃・巡回点検', '共用部分の維持管理', '設備の保守・修繕手配', '24時間緊急対応', '大規模修繕の計画・実施']}
                />
                <ServiceList
                  title={t.management.tenantManagement}
                  items={['入居者募集・内見対応', '入居審査・契約手続き', '契約更新・退去手続き', '入居者からの問い合わせ対応', 'クレーム・トラブル対応']}
                />
                <ServiceList
                  title={t.management.otherServices}
                  items={['リノベーション・リフォーム提案', '空室対策・家賃改定のアドバイス', '火災保険・損害保険の手配', '相続・売却時のサポート', '節税対策のご提案']}
                />
              </div>
            </Container>
          </Section>

          {/* 管理手数料 */}
          <Section background="gray" spacing="lg">
            <Container maxWidth="lg">
              <Reveal className="mb-14">
                <p className="section-label mb-4">Pricing</p>
                <Heading level={2} className="text-ink">
                  {t.management.managementFees}
                </Heading>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-px bg-ink/10 border hairline">
                <PricingCol
                  title={t.management.basicPlan}
                  price="家賃の5%"
                  features={['家賃集金代行', '入出金管理', '入居者対応', '月次報告書']}
                />
                <PricingCol
                  title={t.management.fullPlan}
                  price="家賃の8%"
                  features={['基本管理プラン内容', '建物巡回点検（月1回）', '設備トラブル対応', '24時間緊急対応', '修繕手配・立会い']}
                  recommended={t.management.recommended}
                />
                <PricingCol
                  title={t.management.premiumPlan}
                  price="家賃の10%"
                  features={['フル管理プラン内容', '空室保証', 'リフォーム提案', '収益最大化コンサル', '税務相談サポート']}
                />
              </div>
              <Reveal>
                <Text size="xs" color="light" className="mt-6">
                  ※上記は標準料金です。物件の規模や条件により異なる場合がございます。
                </Text>
              </Reveal>
            </Container>
          </Section>

          {/* 管理実績 */}
          <Section background="white" spacing="lg">
            <Container maxWidth="lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <Reveal className="lg:col-span-5">
                  <figure className="img-breathe relative overflow-hidden aspect-[4/3]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${IMAGES.corridor}')` }}
                      role="img"
                      aria-label="丁寧に維持された建物の廊下"
                    />
                  </figure>
                </Reveal>
                <div className="lg:col-span-7">
                  <Reveal className="mb-10">
                    <p className="section-label mb-4">Results</p>
                    <Heading level={2} className="text-ink">
                      {t.management.managementStats}
                    </Heading>
                  </Reveal>
                  <div className="grid grid-cols-2 divide-x divide-ink/10 border-t border-b hairline">
                    <StatCell number="250+" label={t.management.properties} />
                    <StatCell number="1,500+" label={t.management.units} />
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-ink/10 border-b hairline">
                    <StatCell number="98%" label={t.management.occupancyRate} />
                    <StatCell number="15年" label={t.management.avgYears} />
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* 入居者様向け */}
      {activeTab === 'tenant' && (
        <>
          <Section background="white" spacing="lg">
            <Container maxWidth="lg">
              <Reveal className="mb-14">
                <p className="section-label mb-4">For Tenants</p>
                <Heading level={2} className="text-ink">
                  {t.management.tenantServices}
                </Heading>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-px bg-ink/10 border hairline mb-20">
                <Reveal className="bg-washi p-8 md:p-10">
                  <Heading level={4} className="mb-4 text-ink">
                    {t.management.comfortableSupport}
                  </Heading>
                  <Text size="sm" className="mb-6">
                    {t.management.supportDesc}
                  </Text>
                  <ul className="space-y-3">
                    {['24時間緊急対応', '設備トラブル対応', '各種手続きサポート'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-ink/60 text-sm">
                        <span className="mt-2.5 block w-3 h-px bg-gold-500 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={1} className="bg-washi p-8 md:p-10">
                  <Heading level={4} className="mb-6 text-ink">
                    {t.management.contactWindow}
                  </Heading>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ink/45 uppercase mb-2">{t.management.businessHours}</p>
                      <p className="text-ink/70 text-sm leading-loose">
                        平日 9:00〜18:00<br />
                        土曜 10:00〜17:00<br />
                        <span className="text-ink/45">日祝：休業</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] text-ink/45 uppercase mb-2">{t.management.emergencyContact}</p>
                      <a href="tel:03-6914-3633" className="font-serif text-lg text-ink hover:text-gold-700 transition-colors">
                        03-6914-3633
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* FAQ */}
              <Reveal className="mb-10">
                <Heading level={3} className="text-ink">
                  {t.management.faq}
                </Heading>
              </Reveal>
              <div className="border-t hairline">
                <FAQItem
                  question="家賃の支払い方法は？"
                  answer="銀行振込、口座振替、クレジットカード決済に対応しております。詳しくは契約時にご説明いたします。"
                />
                <FAQItem
                  question="設備が故障した場合は？"
                  answer="管理会社までご連絡ください。緊急の場合は24時間対応の緊急連絡先にお電話ください。"
                />
                <FAQItem
                  question="契約更新の手続きは？"
                  answer="契約満了の3ヶ月前に更新のご案内をお送りいたします。更新される場合は必要書類のご提出をお願いいたします。"
                />
                <FAQItem
                  question="退去時の手続きは？"
                  answer="退去希望日の1ヶ月前までに書面にてご連絡ください。退去立会い日を調整させていただきます。"
                />
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* CTA */}
      <Section background="primary" spacing="lg">
        <Container>
          <Reveal className="text-center">
            <Heading level={2} align="center" className="mb-6 text-washi">
              {t.management.ctaTitle}
            </Heading>
            <Text size="base" className="mb-12 max-w-2xl mx-auto !text-washi/60">
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

// ヘルパー
function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal>
      <Heading level={4} className="mb-5 text-ink pb-4 border-b hairline">{title}</Heading>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-ink/60 text-sm leading-relaxed">
            <span className="mt-2.5 block w-3 h-px bg-gold-500 shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function PricingCol({ title, price, features, recommended }: { title: string; price: string; features: string[]; recommended?: string }) {
  return (
    <div className={`p-8 md:p-10 ${recommended ? 'bg-ink text-washi' : 'bg-washi'}`}>
      {recommended && (
        <p className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-4">{recommended}</p>
      )}
      <p className={`font-serif text-lg mb-2 ${recommended ? 'text-washi' : 'text-ink'}`}>{title}</p>
      <p className={`font-serif text-2xl md:text-3xl mb-7 ${recommended ? 'text-gold-300' : 'text-gold-700'}`}>{price}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-start gap-3 text-sm leading-relaxed ${recommended ? 'text-washi/70' : 'text-ink/60'}`}>
            <span className={`mt-2.5 block w-3 h-px shrink-0 ${recommended ? 'bg-gold-400' : 'bg-gold-500'}`} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatCell({ number, label }: { number: string; label: string }) {
  return (
    <div className="py-9 px-4 text-center">
      <div className="font-serif text-3xl md:text-4xl text-ink mb-2">{number}</div>
      <p className="text-ink/50 text-xs md:text-sm">{label}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b hairline">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full text-left flex justify-between items-center gap-6 py-6"
      >
        <span className="font-serif text-base md:text-lg text-ink">{question}</span>
        <span
          className={`shrink-0 relative w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-0 w-full h-px bg-ink/60" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-ink/60" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}
      >
        <p className="text-ink/60 text-sm leading-loose max-w-3xl">{answer}</p>
      </div>
    </div>
  )
}
