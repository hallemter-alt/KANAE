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
              企業理念
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              物心両面の幸福と利他の心で、世界に通じる価値を創造する
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
                  ミッション
                </span>
              </div>
              <Heading level={3} className="mb-4">
                物心両面の幸福を追求
              </Heading>
              <Text className="mb-4">
                お客様と従業員、そして社会全体の物質的・精神的な豊かさを実現し、
                すべてのステークホルダーの幸福に貢献します。
              </Text>
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <Text size="sm">お客様の満足と幸福を最優先</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <Text size="sm">従業員の成長と働きがいの実現</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <Text size="sm">社会への貢献と価値提供</Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-gold-100 text-gold-800 rounded-full font-bold text-sm">
                  ビジョン
                </span>
              </div>
              <Heading level={3} className="mb-4">
                利他の心で価値創造
              </Heading>
              <Text className="mb-4">
                利他の心を持って、世界に通じる価値を創造し、
                不動産業界のリーディングカンパニーを目指します。
              </Text>
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <span className="text-gold-600 mr-2">✓</span>
                  <Text size="sm">他者を思いやる心を大切に</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-gold-600 mr-2">✓</span>
                  <Text size="sm">革新的なサービスの提供</Text>
                </div>
                <div className="flex items-start">
                  <span className="text-gold-600 mr-2">✓</span>
                  <Text size="sm">業界のスタンダードを創造</Text>
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
            行動指針
          </Heading>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              number="01"
              title="誠実さ"
              description="すべての行動において、誠実であることを第一とします。お客様、取引先、社会に対して正直で透明性のある対応を心がけます。"
              icon="🤝"
            />
            <ValueCard
              number="02"
              title="挑戦"
              description="現状に満足せず、常に新しい価値の創造に挑戦します。失敗を恐れず、学び続ける姿勢を大切にします。"
              icon="🚀"
            />
            <ValueCard
              number="03"
              title="感謝"
              description="すべての出会いとご縁に感謝の気持ちを持ちます。お客様、仲間、社会への感謝を忘れません。"
              icon="🙏"
            />
          </div>
        </Container>
      </Section>

      {/* 私たちの約束 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            私たちの約束
          </Heading>
          <div className="space-y-6">
            <PromiseCard
              title="お客様への約束"
              items={[
                '最高のサービスと満足を提供します',
                'お客様の立場に立った提案を行います',
                '迅速かつ丁寧な対応を心がけます',
                '長期的な関係構築を大切にします',
              ]}
              color="blue"
            />
            <PromiseCard
              title="社会への約束"
              items={[
                '法令遵守と倫理的な経営を実践します',
                '環境に配慮した事業活動を推進します',
                '地域社会の発展に貢献します',
                '持続可能な社会の実現に取り組みます',
              ]}
              color="green"
            />
            <PromiseCard
              title="従業員への約束"
              items={[
                '働きがいのある職場環境を提供します',
                '公正な評価と成長機会を用意します',
                'ワークライフバランスを尊重します',
                '多様性を認め、個性を活かします',
              ]}
              color="gold"
            />
          </div>
        </Container>
      </Section>

      {/* 経営理念の実践 */}
      <Section background="primary" spacing="lg">
        <Container maxWidth="lg">
          <div className="text-center">
            <Heading level={2} align="center" className="mb-6 text-gray-900">
              経営理念の実践
            </Heading>
            <Text size="lg" className="mb-8 max-w-3xl mx-auto">
              私たちは、この理念を日々の業務の中で実践し、
              お客様、社会、従業員すべての幸福を追求します。
            </Text>
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard number="100%" label="顧客満足度目標" />
              <StatCard number="365日" label="サポート体制" />
              <StatCard number="3言語" label="対応可能" />
              <StatCard number="∞" label="成長の可能性" />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={2} align="center" className="mb-6">
              私たちと一緒に働きませんか
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              KANAEの理念に共感し、一緒に価値を創造していただける方を募集しています。
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                お問い合わせ
              </a>
              <a
                href="/about"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                会社概要を見る
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
      <Text size="sm" color="light">{label}</Text>
    </div>
  )
}
