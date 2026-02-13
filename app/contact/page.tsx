'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Container, Section, Heading, Text, Card } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

export default function ContactPage() {
  const { locale } = useLanguage()
  const t = translations[locale]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'inquiry',
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          type: 'inquiry',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Section background="gradient" spacing="hero">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              {t.contact.title}
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              {t.contact.subtitle}
            </Text>
          </div>
        </Container>
      </Section>

      {/* Contact Info */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card padding="lg" className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary-50 mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <Heading level={4} className="mb-2">
                {t.contact.phone}
              </Heading>
              <a href="tel:03-6914-3633" className="text-primary-600 hover:text-primary-700 font-semibold text-lg">
                03-6914-3633
              </a>
              <Text size="sm" className="mt-2 text-gray-600">
                {t.contact.businessHoursValue}
              </Text>
            </Card>

            <Card padding="lg" className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary-50 mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <Heading level={4} className="mb-2">
                {t.contact.email}
              </Heading>
              <a href="mailto:info@kanae-tokyo.com" className="text-primary-600 hover:text-primary-700 font-semibold text-lg">
                info@kanae-tokyo.com
              </a>
              <Text size="sm" className="mt-2 text-gray-600">
                {t.contact.onlineNote}
              </Text>
            </Card>

            <Card padding="lg" className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary-50 mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <Heading level={4} className="mb-2">
                {t.contact.address}
              </Heading>
              <Text size="sm" className="text-gray-700">
                〒171-0033<br />
                東京都豊島区高田3-16-4<br />
                Golje Bld. 6F
              </Text>
            </Card>
          </div>

          {/* Contact Form */}
          <Card padding="xl">
            <Heading level={2} align="center" className="mb-4">
              {t.contact.formTitle}
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto text-center">
              {t.contact.formDescription}
            </Text>

            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">{t.contact.successTitle}</h3>
                    <p className="text-green-800">{t.contact.successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-red-900 mb-1">{t.contact.errorTitle}</h3>
                    <p className="text-red-800">{t.contact.errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  {t.contact.name} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  {t.contact.emailLabel} <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                  {t.contact.phoneLabel} <span className="text-gray-500 text-xs ml-2">({t.contact.phoneOptional})</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.contact.phonePlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-bold text-gray-900 mb-2">
                  {t.contact.inquiryType} <span className="text-red-600">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                >
                  <option value="viewing">{t.contact.inquiryTypeViewing}</option>
                  <option value="inquiry">{t.contact.inquiryTypeInquiry}</option>
                  <option value="application">{t.contact.inquiryTypeApplication}</option>
                  <option value="other">{t.contact.inquiryTypeOther}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                  {t.contact.message} <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder:text-gray-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? t.contact.submitting : t.contact.submit}
                </button>
              </div>
            </form>
          </Card>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
