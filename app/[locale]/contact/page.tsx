'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'
import { COMPANY_INFO } from '@/lib/constants'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: formData.inquiryType,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'general',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* ヒーローセクション */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              お問い合わせ
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              お気軽にご相談ください。専門スタッフが丁寧に対応いたします。
            </Text>
          </div>
        </Container>
      </Section>

      {/* お問い合わせフォーム */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 左側: お問い合わせフォーム */}
            <Card padding="lg">
              <Heading level={3} className="mb-6">
                お問い合わせフォーム
              </Heading>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-900">送信完了</p>
                      <p className="text-sm text-green-800 mt-1">
                        お問い合わせありがとうございます。<br />
                        3営業日以内に担当者よりご連絡いたします。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-red-900">送信エラー</p>
                      <p className="text-sm text-red-800 mt-1">
                        送信に失敗しました。お手数ですが、もう一度お試しいただくか、お電話でお問い合わせください。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* お名前 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                    placeholder="山田 太郎"
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                    placeholder="example@email.com"
                  />
                </div>

                {/* 電話番号 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    電話番号 <span className="text-gray-500 text-xs">(任意)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                    placeholder="090-1234-5678"
                  />
                </div>

                {/* お問い合わせ種別 */}
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                    お問い合わせ種別
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                  >
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="viewing">内見予約</option>
                    <option value="rent">賃貸物件について</option>
                    <option value="sale">売買物件について</option>
                    <option value="management">管理について</option>
                    <option value="minpaku">民泊について</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                {/* お問い合わせ内容 */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none text-gray-900 bg-white"
                    placeholder="お問い合わせ内容をご記入ください。&#10;例：&#10;- 物件の詳細について知りたい&#10;- 内見の予約をしたい&#10;- 初期費用について相談したい"
                  />
                </div>

                {/* プライバシーポリシー同意 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600">
                    お問い合わせいただいた内容は、
                    <a href="/ja/privacy" className="text-primary-600 hover:text-primary-700 underline">
                      プライバシーポリシー
                    </a>
                    に基づき適切に管理いたします。
                  </p>
                </div>

                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      送信中...
                    </span>
                  ) : (
                    '送信する'
                  )}
                </button>
              </form>
            </Card>

            {/* 右側: お問い合わせ先情報 */}
            <div className="space-y-6">
              <Card padding="lg">
                <Heading level={4} className="mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  お電話でのお問い合わせ
                </Heading>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">TEL</p>
                    <a href={`tel:${COMPANY_INFO.contact.phone}`} className="text-2xl font-bold text-primary-600 hover:text-primary-700">
                      {COMPANY_INFO.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">FAX</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {COMPANY_INFO.contact.fax}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">{COMPANY_INFO.businessHours.hours}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      定休日: {COMPANY_INFO.businessHours.closedDays.ja}
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <Heading level={4} className="mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  メールでのお問い合わせ
                </Heading>
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-lg text-primary-600 hover:text-primary-700 underline break-all">
                  {COMPANY_INFO.contact.email}
                </a>
                <p className="text-sm text-gray-600 mt-3">
                  ※メールでのお問い合わせは24時間受付しております。<br />
                  3営業日以内にご返信いたします。
                </p>
              </Card>

              <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-gold-50">
                <Heading level={4} className="mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  アクセス
                </Heading>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">{COMPANY_INFO.address.full}</p>
                  {COMPANY_INFO.access.map((access, index) => (
                    <p key={index} className="text-gray-700">
                      <span className="font-medium">{access.station}</span><br />
                      {access.exit} {access.walkTime}
                    </p>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
