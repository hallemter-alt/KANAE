'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<'owner' | 'tenant'>('owner')

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6">
              賃貸管理サービス
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto">
              オーナー様と入居者様、双方にとって最適な賃貸管理をご提供します
            </Text>
          </div>
        </Container>
      </Section>

      {/* タブ切り替え */}
      <Section background="white" spacing="md">
        <Container>
          <div className="flex justify-center space-x-4 mb-12">
            <button
              onClick={() => setActiveTab('owner')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'owner'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-primary-300'
              }`}
            >
              オーナー様向け
            </button>
            <button
              onClick={() => setActiveTab('tenant')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'tenant'
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gold-300'
              }`}
            >
              入居者様向け
            </button>
          </div>
        </Container>
      </Section>

      {/* オーナー様向けコンテンツ */}
      {activeTab === 'owner' && (
        <>
          {/* 管理サービスの特徴 */}
          <Section background="white" spacing="lg">
            <Container maxWidth="lg">
              <Heading level={2} align="center" className="mb-12">
                オーナー様向け管理サービス
              </Heading>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <ServiceFeature
                  icon="💰"
                  title="安定した収益管理"
                  description="家賃の集金代行から滞納対応まで、収益を確実に確保します。"
                />
                <ServiceFeature
                  icon="🛠️"
                  title="建物・設備管理"
                  description="定期点検からトラブル対応まで、物件の価値を維持します。"
                />
                <ServiceFeature
                  icon="👥"
                  title="入居者管理"
                  description="入居者募集から契約更新まで、総合的にサポートします。"
                />
              </div>

              {/* 詳細サービス */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card padding="lg" hover>
                  <Heading level={4} className="mb-4 text-primary-600">
                    賃料管理サービス
                  </Heading>
                  <ul className="space-y-3 text-gray-700">
                    <ListItem>家賃の集金代行・振込管理</ListItem>
                    <ListItem>滞納家賃の督促・回収</ListItem>
                    <ListItem>入出金明細の定期報告</ListItem>
                    <ListItem>収支レポートの作成</ListItem>
                    <ListItem>確定申告用の資料作成サポート</ListItem>
                  </ul>
                </Card>

                <Card padding="lg" hover>
                  <Heading level={4} className="mb-4 text-primary-600">
                    建物管理サービス
                  </Heading>
                  <ul className="space-y-3 text-gray-700">
                    <ListItem>定期清掃・巡回点検</ListItem>
                    <ListItem>共用部分の維持管理</ListItem>
                    <ListItem>設備の保守・修繕手配</ListItem>
                    <ListItem>24時間緊急対応</ListItem>
                    <ListItem>大規模修繕の計画・実施</ListItem>
                  </ul>
                </Card>

                <Card padding="lg" hover>
                  <Heading level={4} className="mb-4 text-primary-600">
                    入居者管理サービス
                  </Heading>
                  <ul className="space-y-3 text-gray-700">
                    <ListItem>入居者募集・内見対応</ListItem>
                    <ListItem>入居審査・契約手続き</ListItem>
                    <ListItem>契約更新・退去手続き</ListItem>
                    <ListItem>入居者からの問い合わせ対応</ListItem>
                    <ListItem>クレーム・トラブル対応</ListItem>
                  </ul>
                </Card>

                <Card padding="lg" hover>
                  <Heading level={4} className="mb-4 text-primary-600">
                    その他サービス
                  </Heading>
                  <ul className="space-y-3 text-gray-700">
                    <ListItem>リノベーション・リフォーム提案</ListItem>
                    <ListItem>空室対策・家賃改定のアドバイス</ListItem>
                    <ListItem>火災保険・損害保険の手配</ListItem>
                    <ListItem>相続・売却時のサポート</ListItem>
                    <ListItem>節税対策のご提案</ListItem>
                  </ul>
                </Card>
              </div>
            </Container>
          </Section>

          {/* 管理手数料 */}
          <Section background="gray" spacing="lg">
            <Container maxWidth="lg">
              <Heading level={2} align="center" className="mb-12">
                管理手数料
              </Heading>
              <div className="grid md:grid-cols-3 gap-8">
                <PricingCard
                  title="基本管理プラン"
                  price="家賃の5%"
                  features={[
                    '家賃集金代行',
                    '入出金管理',
                    '入居者対応',
                    '月次報告書',
                  ]}
                  recommended={false}
                />
                <PricingCard
                  title="フル管理プラン"
                  price="家賃の8%"
                  features={[
                    '基本管理プラン内容',
                    '建物巡回点検（月1回）',
                    '設備トラブル対応',
                    '24時間緊急対応',
                    '修繕手配・立会い',
                  ]}
                  recommended={true}
                />
                <PricingCard
                  title="プレミアムプラン"
                  price="家賃の10%"
                  features={[
                    'フル管理プラン内容',
                    '空室保証',
                    'リフォーム提案',
                    '収益最大化コンサル',
                    '税務相談サポート',
                  ]}
                  recommended={false}
                />
              </div>
              <Text size="sm" className="text-center mt-8 text-gray-600">
                ※上記は標準料金です。物件の規模や条件により異なる場合がございます。
              </Text>
            </Container>
          </Section>

          {/* 管理実績 */}
          <Section background="white" spacing="lg">
            <Container maxWidth="lg">
              <Heading level={2} align="center" className="mb-12">
                管理実績
              </Heading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCard number="250+" label="管理物件数" />
                <StatCard number="1,500+" label="管理戸数" />
                <StatCard number="98%" label="入居率" />
                <StatCard number="15年" label="平均管理年数" />
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* 入居者様向けコンテンツ */}
      {activeTab === 'tenant' && (
        <>
          <Section background="white" spacing="lg">
            <Container maxWidth="lg">
              <Heading level={2} align="center" className="mb-12">
                入居者様向けサービス
              </Heading>
              <div className="grid md:grid-cols-2 gap-8">
                <Card padding="lg" hover>
                  <div className="text-4xl mb-4">🏠</div>
                  <Heading level={4} className="mb-4">
                    快適な住環境のサポート
                  </Heading>
                  <Text className="mb-4">
                    入居中のお困りごとから退去時の手続きまで、安心してお住まいいただけるよう全力でサポートいたします。
                  </Text>
                  <ul className="space-y-2 text-gray-700">
                    <ListItem>24時間緊急対応</ListItem>
                    <ListItem>設備トラブル対応</ListItem>
                    <ListItem>各種手続きサポート</ListItem>
                  </ul>
                </Card>

                <Card padding="lg" hover>
                  <div className="text-4xl mb-4">📞</div>
                  <Heading level={4} className="mb-4">
                    お問い合わせ窓口
                  </Heading>
                  <div className="space-y-4">
                    <div>
                      <Text weight="bold" className="mb-2">営業時間</Text>
                      <Text>平日 9:00〜18:00</Text>
                      <Text>土曜 10:00〜17:00</Text>
                      <Text color="light">日祝：休業</Text>
                    </div>
                    <div>
                      <Text weight="bold" className="mb-2">緊急連絡先（24時間）</Text>
                      <Text>TEL: 03-XXXX-XXXX</Text>
                    </div>
                  </div>
                </Card>
              </div>

              {/* よくあるご質問 */}
              <div className="mt-16">
                <Heading level={3} align="center" className="mb-8">
                  よくあるご質問
                </Heading>
                <div className="space-y-4">
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
              </div>
            </Container>
          </Section>

          {/* 入居者マイページ（将来実装） */}
          <Section background="primary" spacing="md">
            <Container>
              <div className="text-center">
                <Heading level={3} align="center" className="mb-4 text-gray-900">
                  入居者マイページ（準備中）
                </Heading>
                <Text size="lg" className="mb-8 max-w-2xl mx-auto">
                  家賃の支払い履歴確認や修繕依頼など、便利な機能をご用意予定です。
                </Text>
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* CTA */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={2} align="center" className="mb-6">
              管理のご相談はお気軽に
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              物件管理に関するご相談は無料です。お気軽にお問い合わせください。
            </Text>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              お問い合わせはこちら
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}

// ヘルパーコンポーネント
function ServiceFeature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <Heading level={5} className="mb-3">
        {title}
      </Heading>
      <Text size="sm" color="light">
        {description}
      </Text>
    </div>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <span className="text-primary-600 mr-2">✓</span>
      <span>{children}</span>
    </li>
  )
}

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  recommended: boolean
}

function PricingCard({ title, price, features, recommended }: PricingCardProps) {
  return (
    <Card 
      padding="lg" 
      hover 
      className={`relative ${recommended ? 'ring-2 ring-primary-600 shadow-xl' : ''}`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-1 rounded-full text-sm font-bold">
            おすすめ
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <Heading level={4} className="mb-2">
          {title}
        </Heading>
        <div className="text-3xl font-bold text-primary-600">
          {price}
        </div>
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm">
            <span className="text-primary-600 mr-2">✓</span>
            <span>{feature}</span>
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

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card padding="md" hover>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center"
      >
        <Heading level={5}>{question}</Heading>
        <span className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <Text className="mt-4 pt-4 border-t border-gray-200">
          {answer}
        </Text>
      )}
    </Card>
  )
}
