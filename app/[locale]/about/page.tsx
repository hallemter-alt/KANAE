'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              会社概要
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              物心両面の幸福と利他の心で、世界に通じる価値を創造する
            </Text>
          </div>
        </Container>
      </Section>

      {/* 会社基本情報 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            会社情報
          </Heading>
          <Card padding="lg" className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoItem label="会社名" value="株式会社ＫＡＮＡＥ" />
              <InfoItem label="代表者" value="代表取締役 叶維舟" />
              <InfoItem label="設立" value="令和3年7月5日（2021年7月5日）" />
              <InfoItem label="会社法人等番号" value="0111-01-095676" />
              <InfoItem 
                label="本社所在地" 
                value="〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F" 
              />
              <InfoItem label="電話番号" value="03-6914-3633 / 080-4363-2780" />
              <InfoItem label="メールアドレス" value="info@rut-tokyo.com" />
              <InfoItem label="公式サイト" value="www.rut-tokyo.com" />
              <InfoItem 
                label="営業時間" 
                value="平日 9:00〜18:00 / 土曜 10:00〜17:00（日祝休業）" 
                fullWidth 
              />
              <InfoItem 
                label="事業内容" 
                value="不動産賃貸仲介・売買仲介・賃貸管理・民泊運営・不動産コンサルティング" 
                fullWidth 
              />
              <InfoItem 
                label="許認可番号" 
                value="宅地建物取引業 東京都知事(1)第107157号" 
                fullWidth 
              />
              <InfoItem 
                label="加盟団体" 
                value="公益社団法人 全国宅地建物取引業協会連合会、公益社団法人 東京都宅地建物取引業協会" 
                fullWidth 
              />
            </div>
          </Card>
        </Container>
      </Section>

      {/* 当社の強み */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            当社の強み
          </Heading>
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <Heading level={4} className="mb-3">
                    地域密着型の丁寧なサービス
                  </Heading>
                  <Text>
                    東京23区を中心に、地域の特性を熟知したスタッフが、
                    お客様一人ひとりのニーズに合わせた最適な物件をご提案いたします。
                  </Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🌐</div>
                <div>
                  <Heading level={4} className="mb-3">
                    多言語対応（日本語・中国語・英語）
                  </Heading>
                  <Text>
                    外国籍のお客様も安心してご利用いただけるよう、
                    中国語・英語に対応したスタッフが在籍しております。
                  </Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">💡</div>
                <div>
                  <Heading level={4} className="mb-3">
                    最新テクノロジーの活用
                  </Heading>
                  <Text>
                    AIを活用した物件マッチングシステムや、オンライン内見など、
                    最新技術を導入し、効率的な物件探しをサポートします。
                  </Text>
                </div>
              </div>
            </Card>

            <Card padding="lg" hover>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🤝</div>
                <div>
                  <Heading level={4} className="mb-3">
                    ワンストップサービス
                  </Heading>
                  <Text>
                    賃貸・売買・管理・民泊まで、不動産に関するあらゆるニーズに、
                    一社で対応できる総合力が当社の強みです。
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
          <Heading level={2} align="center" className="mb-12">
            事業内容
          </Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon="🏠"
              title="賃貸事業"
              description="お客様のライフスタイルに合わせた最適な賃貸物件をご提案します。"
            />
            <ServiceCard
              icon="🏢"
              title="売買事業"
              description="不動産の売買仲介から投資用物件のご紹介まで幅広く対応します。"
            />
            <ServiceCard
              icon="🔧"
              title="管理事業"
              description="オーナー様の大切な資産を適切に管理し、安定した収益をサポートします。"
            />
            <ServiceCard
              icon="✈️"
              title="民泊事業"
              description="民泊運営のノウハウを活かし、収益最大化をサポートします。"
            />
          </div>
        </Container>
      </Section>

      {/* 企業理念へのリンク */}
      <Section background="primary" spacing="md">
        <Container>
          <div className="text-center">
            <Heading level={3} align="center" className="mb-4 text-gray-900">
              私たちの理念
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              物心両面の幸福と利他の心で、世界に通じる価値を創造する
            </Text>
            <a
              href="/philosophy"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              企業理念を見る
            </a>
          </div>
        </Container>
      </Section>

      {/* アクセス */}
      <Section background="gray" spacing="lg">
        <Container maxWidth="lg">
          <Heading level={2} align="center" className="mb-12">
            アクセス
          </Heading>
          <Card padding="lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Heading level={4} className="mb-4">
                  所在地
                </Heading>
                <Text className="mb-4">
                  〒171-0033<br />
                  東京都豊島区高田3丁目16番4号<br />
                  Golje Bld. 6F
                </Text>
                <Heading level={4} className="mb-4 mt-6">
                  アクセス
                </Heading>
                <Text>
                  <strong>東京メトロ東西線 高田馬場駅</strong><br />
                  7番出口より徒歩約5分<br />
                  <strong>JR山手線 高田馬場駅</strong><br />
                  早稲田口より徒歩約7分<br />
                  <strong>東京メトロ副都心線 西早稲田駅</strong><br />
                  3番出口より徒歩約6分
                </Text>
              </div>
              <div className="bg-gray-200 rounded-lg h-80 overflow-hidden shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.211!2d139.7063!3d35.7165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQyJzU5LjQiTiAxMznCsDQyJzIyLjciRQ!5e0!3m2!1sja!2sjp!4v1620000000000!5m2!1sja!2sjp&q=35.716500,139.706300"
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
            <Heading level={3} align="center" className="mb-4 text-gray-900">
              お問い合わせ
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              物件に関するご質問や、サービスについてのお問い合わせは、
              お気軽にご連絡ください。
            </Text>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
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

interface InfoItemProps {
  label: string
  value: string
  fullWidth?: boolean
}

function InfoItem({ label, value, fullWidth = false }: InfoItemProps) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <dt className="text-sm font-bold text-gray-500 mb-2">{label}</dt>
      <dd className="text-base text-gray-900">{value}</dd>
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
