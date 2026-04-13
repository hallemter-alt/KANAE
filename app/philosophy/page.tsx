'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

export default function PhilosophyPage() {
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
              {t.philosophy.heroTitle}
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              {t.philosophy.heroSubtitle}
            </Text>
          </div>
        </Container>
      </Section>

      {/* ミッション・ビジョン */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card padding="lg" hover>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-bold text-sm">
                  {t.philosophy.mission}
                </span>
              </div>
              <Heading level={3} className="mb-4">
                {t.philosophy.missionCardTitle}
              </Heading>
              <Text className="mb-4">
                {t.philosophy.missionCardDesc}
              </Text>
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <Text size="sm">{t.philosophy.missionCheck1}</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <Text size="sm">{t.philosophy.missionCheck2}</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <Text size="sm">{t.philosophy.missionCheck3}</Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-gold-100 text-gold-800 rounded-full font-bold text-sm">
                  {t.philosophy.vision}
                </span>
              </div>
              <Heading level={3} className="mb-4">
                {t.philosophy.visionCardTitle}
              </Heading>
              <Text className="mb-4">
                {t.philosophy.visionCardDesc}
              </Text>
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <span className="text-gold-600 mr-2">✓</span>
                  <Text size="sm">{t.philosophy.visionCheck1}</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-gold-600 mr-2">✓</span>
                  <Text size="sm">{t.philosophy.visionCheck2}</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-gold-600 mr-2">✓</span>
                  <Text size="sm">{t.philosophy.visionCheck3}</Text>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 行動指針 */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            {t.philosophy.guidelinesTitle}
          </Heading>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              number="01"
              title={t.philosophy.guideline1Title}
              description={t.philosophy.guideline1Desc}
              icon="🤝"
            />
            <ValueCard
              number="02"
              title={t.philosophy.guideline2Title}
              description={t.philosophy.guideline2Desc}
              icon="🚀"
            />
            <ValueCard
              number="03"
              title={t.philosophy.guideline3Title}
              description={t.philosophy.guideline3Desc}
              icon="🙏"
            />
          </div>
        </Container>
      </Section>

      {/* 私たちの約束 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            {t.philosophy.promisesTitle}
          </Heading>
          <div className="space-y-6">
            <PromiseCard
              title={t.philosophy.promiseCustomerTitle}
              items={t.philosophy.promiseCustomerItems}
              color="blue"
            />
            <PromiseCard
              title={t.philosophy.promiseSocietyTitle}
              items={t.philosophy.promiseSocietyItems}
              color="green"
            />
            <PromiseCard
              title={t.philosophy.promiseEmployeeTitle}
              items={t.philosophy.promiseEmployeeItems}
              color="gold"
            />
          </div>
        </Container>
      </Section>

      {/* 経営理念の実践 */}
      <Section background="white" spacing="lg" className="bg-gradient-to-br from-primary-50 via-primary-100 to-gold-50">
        <Container maxWidth="lg">
          <div className="text-center">
            <Heading level={2} align="center" className="mb-6 text-gray-900">
              {t.philosophy.practiceTitle}
            </Heading>
            <Text size="lg" className="mb-8 max-w-3xl mx-auto text-gray-800">
              {t.philosophy.practiceDescription}
            </Text>
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard number="100%" label={t.philosophy.practiceStats.satisfaction} />
              <StatCard number="365" label={t.philosophy.practiceStats.support} />
              <StatCard number="3" label={t.philosophy.practiceStats.languages} />
              <StatCard number="∞" label={t.philosophy.practiceStats.growth} />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={2} align="center" className="mb-6 text-white">
              {t.philosophy.ctaTitle}
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto text-white/90">
              {t.philosophy.ctaDescription}
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t.philosophy.ctaContact}
              </a>
              <a
                href="/about"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                {t.philosophy.ctaAbout}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

// ヘルパーコンポーネント
interface ValueCardProps {
  number: string
  title: string
  description: string
  icon: string
}

function ValueCard({ number, title, description, icon }: ValueCardProps) {
  return (
    <Card padding="lg" hover>
      <div className="text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <div className="text-sm font-bold text-gray-500 mb-2">{number}</div>
        <Heading level={4} className="mb-4">
          {title}
        </Heading>
        <Text size="sm" color="light">
          {description}
        </Text>
      </div>
    </Card>
  )
}

interface PromiseCardProps {
  title: string
  items: string[]
  color: 'blue' | 'green' | 'gold'
}

function PromiseCard({ title, items, color }: PromiseCardProps) {
  const colorClasses = {
    blue: 'bg-primary-50 border-primary-200 text-primary-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    gold: 'bg-gold-50 border-gold-200 text-gold-800',
  }

  const iconColorClasses = {
    blue: 'text-primary-600',
    green: 'text-green-600',
    gold: 'text-gold-600',
  }

  return (
    <Card padding="lg" className={`border-2 ${colorClasses[color]}`}>
      <Heading level={4} className="mb-4">
        {title}
      </Heading>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className={`${iconColorClasses[color]} mr-2 mt-1`}>✓</span>
            <Text size="sm">{item}</Text>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary-600 mb-2">{number}</div>
      <Text size="sm" color="gray" className="text-gray-700 font-medium">{label}</Text>
    </div>
  )
}
