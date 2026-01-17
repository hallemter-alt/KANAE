'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'
import { COMPANY_INFO } from '@/lib/constants'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="md">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-4 text-white">
              プライバシーポリシー
            </Heading>
            <Text size="lg" className="text-white/90">
              個人情報保護方針
            </Text>
          </div>
        </Container>
      </Section>

      {/* プライバシーポリシー本文 */}
      <Section background="white" spacing="lg">
        <Container maxWidth="full">
          <div className="prose prose-lg max-w-none">
            
            {/* 前文 */}
            <div className="mb-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                {COMPANY_INFO.name.ja}（以下「当社」といいます）は、不動産業務を通じてお客様からお預かりする個人情報の重要性を認識し、
                個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守し、以下の方針に基づき個人情報を適切に取り扱います。
              </p>
            </div>

            {/* 1. 個人情報の定義 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                1. 個人情報の定義
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項に定義される、
                生存する個人に関する情報であって、次のいずれかに該当するものをいいます。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>氏名、生年月日、住所、電話番号、メールアドレス等により特定の個人を識別できる情報</li>
                <li>個人識別符号が含まれる情報</li>
              </ul>
            </div>

            {/* 2. 個人情報の収集 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                2. 個人情報の収集
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、以下の方法により個人情報を収集することがあります。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>お問い合わせフォーム、電話、メール等によるお客様からの直接提供</li>
                <li>物件の内見申込、賃貸借契約、売買契約等の際の書面による提供</li>
                <li>Webサイトでのアクセス情報（Cookie、IPアドレス等）</li>
                <li>その他適法な手段による収集</li>
              </ul>
            </div>

            {/* 3. 収集する個人情報の項目 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                3. 収集する個人情報の項目
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社が収集する個人情報は、以下の項目を含みます。
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">■ 基本情報</h4>
                  <p className="text-gray-700 ml-4">
                    氏名、生年月日、性別、住所、電話番号、メールアドレス、職業、勤務先情報
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">■ 契約関連情報</h4>
                  <p className="text-gray-700 ml-4">
                    年収、家族構成、緊急連絡先、保証人情報、銀行口座情報
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">■ その他の情報</h4>
                  <p className="text-gray-700 ml-4">
                    お問い合わせ内容、物件の閲覧履歴、サービスの利用履歴
                  </p>
                </div>
              </div>
            </div>

            {/* 4. 個人情報の利用目的 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                4. 個人情報の利用目的
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、収集した個人情報を以下の目的で利用します。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>不動産の賃貸借・売買仲介サービスの提供</li>
                <li>物件情報のご案内、内見のご案内</li>
                <li>賃貸借契約、売買契約等の締結および履行</li>
                <li>物件管理業務の遂行</li>
                <li>民泊運営サービスの提供</li>
                <li>お問い合わせへの対応</li>
                <li>当社サービスに関する情報提供、ご案内</li>
                <li>アフターサービス、満足度調査の実施</li>
                <li>統計データの作成（個人を特定できない形式）</li>
                <li>法令に基づく対応</li>
              </ul>
            </div>

            {/* 5. 個人情報の第三者提供 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                5. 個人情報の第三者提供
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>国の機関等への協力が必要な場合</li>
                <li>契約履行のため必要な業務委託先（保証会社、管理会社等）への提供</li>
              </ul>
            </div>

            {/* 6. 個人情報の管理 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                6. 個人情報の管理
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、個人情報の漏洩、滅失、毀損等を防止するため、以下の安全管理措置を講じます。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>個人情報へのアクセス制限</li>
                <li>個人情報を取り扱う従業員への適切な監督</li>
                <li>外部からの不正アクセス防止措置</li>
                <li>個人情報の持ち出し制限</li>
              </ul>
            </div>

            {/* 7. 個人情報の開示・訂正・削除 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                7. 個人情報の開示・訂正・削除
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                お客様は、当社が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止、
                消去または第三者提供の停止を請求することができます。
              </p>
              <p className="text-gray-700 leading-relaxed">
                ご請求の際は、下記の個人情報お問い合わせ窓口までご連絡ください。
                ご本人確認の上、合理的な期間内に対応いたします。
              </p>
            </div>

            {/* 8. Cookie等の利用 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                8. Cookie（クッキー）等の利用
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社のWebサイトでは、サービスの利便性向上のため、Cookieを使用する場合があります。
                Cookieとは、Webサイトがお客様のコンピュータを識別する業界標準の技術です。
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cookieの受け入れを希望されない場合は、ブラウザの設定により拒否することが可能ですが、
                一部のサービスが正常に機能しない場合があります。
              </p>
            </div>

            {/* 9. お子様の個人情報 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                9. お子様の個人情報
              </Heading>
              <p className="text-gray-700 leading-relaxed">
                当社のサービスは、原則として18歳以上の方を対象としております。
                18歳未満の方が個人情報を提供される場合は、保護者の同意を得た上で行ってください。
              </p>
            </div>

            {/* 10. プライバシーポリシーの変更 */}
            <div className="mb-10">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-600">
                10. プライバシーポリシーの変更
              </Heading>
              <p className="text-gray-700 leading-relaxed">
                当社は、法令の変更や事業内容の変更等に伴い、本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当社Webサイトに掲載した時点から効力を生じるものとします。
              </p>
            </div>

            {/* お問い合わせ窓口 */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary-50 to-gold-50 rounded-lg border border-primary-200">
              <Heading level={2} className="text-2xl font-bold text-gray-900 mb-6">
                個人情報に関するお問い合わせ窓口
              </Heading>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">事業者名</p>
                  <p className="text-lg text-gray-900">{COMPANY_INFO.legalName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">代表者</p>
                  <p className="text-lg text-gray-900">{COMPANY_INFO.representative}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">所在地</p>
                  <p className="text-lg text-gray-900">{COMPANY_INFO.address.full}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">電話番号</p>
                  <p className="text-lg text-gray-900">
                    TEL: {COMPANY_INFO.contact.phone} / FAX: {COMPANY_INFO.contact.fax}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">メールアドレス</p>
                  <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-lg text-primary-600 hover:text-primary-700 underline">
                    {COMPANY_INFO.contact.email}
                  </a>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">受付時間</p>
                  <p className="text-lg text-gray-900">
                    {COMPANY_INFO.businessHours.hours}<br />
                    <span className="text-sm text-gray-600">
                      定休日: {COMPANY_INFO.businessHours.closedDays.ja}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* 制定日・改定日 */}
            <div className="mt-8 text-right text-sm text-gray-600">
              <p>制定日: 2021年7月5日</p>
              <p>最終改定日: 2026年1月17日</p>
            </div>

          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
