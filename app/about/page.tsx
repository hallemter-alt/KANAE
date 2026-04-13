'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

export default function AboutPage() {
  const { locale } = useLanguage()
  const t = translations[locale]
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="hero">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              {t.about.heroTitle}
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              {t.about.heroSubtitle}
            </Text>
          </div>
        </Container>
      </Section>

      {/* 会社基本情報 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12 text-gray-900">
            {t.about.companyInfoTitle}
          </Heading>
          <Card padding="lg" className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoItem label={t.about.companyName} value="株式会社ＫＡＮＡＥ" />
              <InfoItem label={t.about.representative} value="代表取締役 叶維舟" />
              <InfoItem label={t.about.established} value="令和3年7月5日（2021年7月5日）" />
              <InfoItem label={t.about.corporateNumber} value="0111-01-095676" />
              <InfoItem 
                label={t.about.address} 
                value="〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F" 
              />
              <InfoItem label={t.about.phone} value="03-6914-3633 / 080-4363-2780" />
              <InfoItem label={t.about.email} value="info@kanae-tokyo.com" />
              <InfoItem label={t.about.website} value="www.kanae-tokyo.com" />
              <InfoItem 
                label={t.about.businessHours} 
                value={t.about.businessHoursValue}
                fullWidth 
              />
              <InfoItem 
                label={t.about.businessContent} 
                value={t.about.businessContentValue}
                fullWidth 
              />
              <InfoItem 
                label={t.about.licenseNumber} 
                value={t.about.licenseNumberValue}
                fullWidth 
              />
              <InfoItem 
                label={t.about.associations} 
                value={t.about.associationsValue}
                fullWidth 
              />
            </div>
          </Card>
        </Container>
      </Section>

      {/* 当社の強み */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12 text-gray-900">
            {t.about.strengthsTitle}
          </Heading>
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <Heading level={4} className="mb-3">
                    {t.about.strength1Title}
                  </Heading>
                  <Text>
                    {t.about.strength1Description}
                  </Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🌐</div>
                <div>
                  <Heading level={4} className="mb-3">
                    {t.about.strength2Title}
                  </Heading>
                  <Text>
                    {t.about.strength2Description}
                  </Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">💡</div>
                <div>
                  <Heading level={4} className="mb-3">
                    {t.about.strength3Title}
                  </Heading>
                  <Text>
                    {t.about.strength3Description}
                  </Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🤝</div>
                <div>
                  <Heading level={4} className="mb-3">
                    {t.about.strength4Title}
                  </Heading>
                  <Text>
                    {t.about.strength4Description}
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 事業内容 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12 text-gray-900">
            {t.about.businessContentTitle}
          </Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon="🏠"
              title={t.about.service1Title}
              description={t.about.service1Desc}
            />
            <ServiceCard
              icon="🏢"
              title={t.about.service2Title}
              description={t.about.service2Desc}
            />
            <ServiceCard
              icon="🔧"
              title={t.about.service3Title}
              description={t.about.service3Desc}
            />
            <ServiceCard
              icon="✈️"
              title={t.about.service4Title}
              description={t.about.service4Desc}
            />
          </div>
        </Container>
      </Section>

      {/* 企業理念へのリンク */}
      <Section background="primary" spacing="md">
        <Container>
          <div className="text-center">
            <Heading level={3} align="center" className="mb-4 text-white">
              {t.about.ourPhilosophyTitle}
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto text-white/90">
              {t.about.ourPhilosophySubtitle}
            </Text>
            <a
              href="/philosophy"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t.about.ourPhilosophyButton}
            </a>
          </div>
        </Container>
      </Section>

      {/* アクセス */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12 text-gray-900">
            {t.about.accessTitle}
          </Heading>
          <Card padding="lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Heading level={4} className="mb-4">
                  {t.about.locationTitle}
                </Heading>
                <Text className="mb-4">
                  〒171-0033<br />
                  東京都豊島区高田3丁目16番4号<br />
                  Golje Bld. 6F
                </Text>
                <Heading level={4} className="mb-4 mt-6">
                  {t.about.accessDetailTitle}
                </Heading>
                <Text>
                  <strong>{t.about.nearStation1}</strong><br />
                  {t.about.nearStation1Time}<br />
                  <strong>{t.about.nearStation2}</strong><br />
                  {t.about.nearStation2Time}
                </Text>
              </div>
              <div className="bg-gray-200 rounded-lg h-80 overflow-hidden shadow-inner">
                <iframe
                  src="https://www.google.com/maps?q=東京都豊島区高田3丁目16番4号&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="株式会社KANAE 所在地 - 東京都豊島区高田3-16-4 Golje Bld. 6F"
                ></iframe>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* お問い合わせ */}
      <Section background="primary" spacing="md">
        <Container>
          <div className="text-center">
            <Heading level={3} align="center" className="mb-4 text-white">
              {t.about.contactSectionTitle}
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto text-white/90">
              {t.about.contactSectionDesc}
            </Text>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t.about.contactButton}
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

interface InfoItemProps {
  label: string
  value: string
  fullWidth?: boolean
}

function InfoItem({ label, value, fullWidth = false }: InfoItemProps) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <dt className="text-sm font-bold text-gray-600 mb-2">{label}</dt>
      <dd className="text-base text-gray-900 font-medium">{value}</dd>
    </div>
  )
}

interface ServiceCardProps {
  icon: string
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card padding="md" hover className="text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <Heading level={5} className="mb-3">
        {title}
      </Heading>
      <Text size="sm">
        {description}
      </Text>
    </Card>
  )
}
