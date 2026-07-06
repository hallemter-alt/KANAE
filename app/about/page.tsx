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

export default function AboutPage() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="About Us"
        title={t.about.heroTitle}
        subtitle={t.about.heroSubtitle}
        image="corridor"
        alt="光の差し込む静かな回廊"
      />

      {/* 会社基本情報 — 罫線の表組み */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-12">
            <p className="section-label mb-4">Company</p>
            <Heading level={2} className="text-ink">
              {t.about.companyInfoTitle}
            </Heading>
          </Reveal>
          <Reveal>
            <dl className="border-t hairline">
              <InfoRow label={t.about.companyName} value="株式会社ＫＡＮＡＥ" />
              <InfoRow label={t.about.representative} value="代表取締役 叶維舟" />
              <InfoRow label={t.about.established} value="令和3年7月5日（2021年7月5日）" />
              <InfoRow label={t.about.corporateNumber} value="0111-01-095676" />
              <InfoRow label={t.about.address} value="〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F" />
              <InfoRow label={t.about.phone} value="03-6914-3633 / 080-4363-2780" />
              <InfoRow label={t.about.email} value="info@kanae-tokyo.com" />
              <InfoRow label={t.about.website} value="www.kanae-tokyo.com" />
              <InfoRow label={t.about.businessHours} value={t.about.businessHoursValue} />
              <InfoRow label={t.about.businessContent} value={t.about.businessContentValue} />
              <InfoRow label={t.about.licenseNumber} value={t.about.licenseNumberValue} />
              <InfoRow label={t.about.associations} value={t.about.associationsValue} />
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 当社の強み — 写真を添えて */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Strengths</p>
            <Heading level={2} className="text-ink">
              {t.about.strengthsTitle}
            </Heading>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch">
            <Reveal className="lg:col-span-5" delay={1}>
              <figure className="img-breathe relative overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.windowLight}')` }}
                  role="img"
                  aria-label="窓辺に差す光"
                />
              </figure>
            </Reveal>

            <div className="lg:col-span-7 border-t hairline">
              {[
                { title: t.about.strength1Title, desc: t.about.strength1Description },
                { title: t.about.strength2Title, desc: t.about.strength2Description },
                { title: t.about.strength3Title, desc: t.about.strength3Description },
                { title: t.about.strength4Title, desc: t.about.strength4Description },
              ].map((item, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="py-8 border-b hairline flex items-baseline gap-6">
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

      {/* 事業内容 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-14">
            <p className="section-label mb-4">Business</p>
            <Heading level={2} className="text-ink">
              {t.about.businessContentTitle}
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l hairline">
            {[
              { title: t.about.service1Title, desc: t.about.service1Desc },
              { title: t.about.service2Title, desc: t.about.service2Desc },
              { title: t.about.service3Title, desc: t.about.service3Desc },
              { title: t.about.service4Title, desc: t.about.service4Desc },
            ].map((item, i) => (
              <Reveal
                key={i}
                delay={(i % 3) as 0 | 1 | 2}
                className="border-b border-r hairline p-8 hover:bg-gold-50 transition-colors duration-700"
              >
                <span className="font-serif text-gold-400 text-xs tracking-[0.3em] block mb-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Heading level={5} className="mb-3 text-ink">{item.title}</Heading>
                <Text size="sm" color="light">{item.desc}</Text>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 企業理念へのリンク */}
      <Section background="primary" spacing="md">
        <Container>
          <Reveal className="text-center">
            <p className="section-label !text-gold-400 mb-5">Philosophy</p>
            <Heading level={3} align="center" className="mb-4 text-washi">
              {t.about.ourPhilosophyTitle}
            </Heading>
            <Text size="base" className="mb-10 max-w-2xl mx-auto !text-washi/60">
              {t.about.ourPhilosophySubtitle}
            </Text>
            <a
              href="/philosophy"
              className="inline-flex items-center gap-3 border border-washi/50 text-washi px-9 py-4 text-sm tracking-[0.2em] hover:bg-washi hover:text-ink transition-all duration-700"
            >
              {t.about.ourPhilosophyButton}
            </a>
          </Reveal>
        </Container>
      </Section>

      {/* アクセス */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Reveal className="mb-12">
            <p className="section-label mb-4">Access</p>
            <Heading level={2} className="text-ink">
              {t.about.accessTitle}
            </Heading>
          </Reveal>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
              <div>
                <Heading level={4} className="mb-5 text-ink">
                  {t.about.locationTitle}
                </Heading>
                <address className="not-italic text-ink/70 text-sm leading-loose mb-8">
                  〒171-0033<br />
                  東京都豊島区高田3丁目16番4号<br />
                  Golje Bld. 6F
                </address>
                <Heading level={4} className="mb-5 text-ink">
                  {t.about.accessDetailTitle}
                </Heading>
                <div className="text-ink/70 text-sm leading-loose space-y-3">
                  <p>
                    <span className="font-medium text-ink">{t.about.nearStation1}</span><br />
                    {t.about.nearStation1Time}
                  </p>
                  <p>
                    <span className="font-medium text-ink">{t.about.nearStation2}</span><br />
                    {t.about.nearStation2Time}
                  </p>
                </div>
              </div>
              <div className="h-80 overflow-hidden border hairline">
                <iframe
                  src="https://www.google.com/maps?q=東京都豊島区高田3丁目16番4号&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.85) contrast(0.95)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="株式会社KANAE 所在地 - 東京都豊島区高田3-16-4 Golje Bld. 6F"
                ></iframe>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* お問い合わせ */}
      <Section background="primary" spacing="md">
        <Container>
          <Reveal className="text-center">
            <Heading level={3} align="center" className="mb-4 text-washi">
              {t.about.contactSectionTitle}
            </Heading>
            <Text size="base" className="mb-10 max-w-2xl mx-auto !text-washi/60">
              {t.about.contactSectionDesc}
            </Text>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-washi text-ink px-9 py-4 text-sm tracking-[0.2em] hover:bg-gold-200 transition-colors duration-700"
            >
              {t.about.contactButton}
            </a>
          </Reveal>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-5 border-b hairline">
      <dt className="sm:col-span-4 text-xs tracking-[0.15em] text-ink/45 uppercase pt-1">{label}</dt>
      <dd className="sm:col-span-8 text-ink text-sm md:text-base leading-relaxed">{value}</dd>
    </div>
  )
}
