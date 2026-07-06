'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/Reveal'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'
import { IMAGES } from '@/lib/images'

export default function PhilosophyPage() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="Philosophy"
        title={t.philosophy.heroTitle}
        subtitle={t.philosophy.heroSubtitle}
        image="mossPost"
        alt="苔むした石 — 静かに積み重なる時間"
      />

      {/* ミッション・ビジョン */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-2 gap-px bg-ink/10 border hairline">
            <Reveal className="bg-washi p-8 md:p-12">
              <p className="section-label mb-6">Mission</p>
              <Heading level={3} className="mb-5 text-ink">
                {t.philosophy.missionCardTitle}
              </Heading>
              <Text size="sm" className="mb-8">
                {t.philosophy.missionCardDesc}
              </Text>
              <ul className="space-y-3.5">
                {[t.philosophy.missionCheck1, t.philosophy.missionCheck2, t.philosophy.missionCheck3].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/60 text-sm">
                    <span className="mt-2.5 block w-3 h-px bg-gold-500 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={1} className="bg-washi p-8 md:p-12">
              <p className="section-label mb-6">Vision</p>
              <Heading level={3} className="mb-5 text-ink">
                {t.philosophy.visionCardTitle}
              </Heading>
              <Text size="sm" className="mb-8">
                {t.philosophy.visionCardDesc}
              </Text>
              <ul className="space-y-3.5">
                {[t.philosophy.visionCheck1, t.philosophy.visionCheck2, t.philosophy.visionCheck3].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/60 text-sm">
                    <span className="mt-2.5 block w-3 h-px bg-gold-500 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 行動指針 — 写真を背に */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Guidelines</p>
            <Heading level={2} className="text-ink">
              {t.philosophy.guidelinesTitle}
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch">
            <Reveal className="lg:col-span-5" delay={1}>
              <figure className="img-breathe relative overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.forestLight}')` }}
                  role="img"
                  aria-label="木々の間から差す光"
                />
              </figure>
            </Reveal>
            <div className="lg:col-span-7 border-t hairline">
              {[
                { title: t.philosophy.guideline1Title, desc: t.philosophy.guideline1Desc },
                { title: t.philosophy.guideline2Title, desc: t.philosophy.guideline2Desc },
                { title: t.philosophy.guideline3Title, desc: t.philosophy.guideline3Desc },
              ].map((item, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="py-9 border-b hairline flex items-baseline gap-6">
                    <span className="font-serif text-gold-500 text-sm tracking-[0.3em] shrink-0 w-9">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <Heading level={4} className="mb-3 text-ink">{item.title}</Heading>
                      <Text size="sm">{item.desc}</Text>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 私たちの約束 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Promises</p>
            <Heading level={2} className="text-ink">
              {t.philosophy.promisesTitle}
            </Heading>
          </Reveal>
          <div className="space-y-10">
            <PromiseBlock title={t.philosophy.promiseCustomerTitle} items={t.philosophy.promiseCustomerItems} />
            <PromiseBlock title={t.philosophy.promiseSocietyTitle} items={t.philosophy.promiseSocietyItems} />
            <PromiseBlock title={t.philosophy.promiseEmployeeTitle} items={t.philosophy.promiseEmployeeItems} />
          </div>
        </Container>
      </Section>

      {/* 経営理念の実践 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="text-center">
            <p className="section-label mb-4">Practice</p>
            <Heading level={2} align="center" className="mb-6 text-ink">
              {t.philosophy.practiceTitle}
            </Heading>
            <Text size="base" className="mb-14 max-w-3xl mx-auto">
              {t.philosophy.practiceDescription}
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10 border-t border-b hairline">
              <StatCell number="100%" label={t.philosophy.practiceStats.satisfaction} />
              <StatCell number="365" label={t.philosophy.practiceStats.support} />
              <StatCell number="3" label={t.philosophy.practiceStats.languages} />
              <StatCell number="∞" label={t.philosophy.practiceStats.growth} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="primary" spacing="lg">
        <Container>
          <Reveal className="text-center">
            <Heading level={2} align="center" className="mb-6 text-washi">
              {t.philosophy.ctaTitle}
            </Heading>
            <Text size="base" className="mb-12 max-w-2xl mx-auto !text-washi/60">
              {t.philosophy.ctaDescription}
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-washi text-ink px-9 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
              >
                {t.philosophy.ctaContact}
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center border border-washi/40 text-washi px-9 py-4 text-sm tracking-[0.2em] hover:bg-washi/10 transition-colors duration-700"
              >
                {t.philosophy.ctaAbout}
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

function PromiseBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 border-t hairline">
        <Heading level={4} className="md:col-span-4 text-ink">{title}</Heading>
        <ul className="md:col-span-8 space-y-3.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-ink/60 text-sm leading-relaxed">
              <span className="mt-2.5 block w-3 h-px bg-gold-500 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

function StatCell({ number, label }: { number: string; label: string }) {
  return (
    <div className="py-10 px-4 text-center">
      <div className="font-serif text-3xl md:text-4xl text-ink mb-2">{number}</div>
      <p className="text-ink/50 text-xs md:text-sm">{label}</p>
    </div>
  )
}
