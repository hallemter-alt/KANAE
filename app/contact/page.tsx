'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/Reveal'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const inputClass =
  'w-full px-4 py-3 bg-white/80 border hairline focus:border-ink/40 transition-colors text-sm text-ink placeholder:text-ink/35'
const labelClass = 'block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3'

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
    <main className="min-h-screen bg-washi">
      <Navbar />

      <PageHero
        label="Contact"
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        image="pondStill"
        alt="静かな水面 — 対話の始まり"
      />

      {/* 連絡先 + フォーム */}
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            {/* 左 — 連絡先情報 */}
            <Reveal className="lg:col-span-4">
              <p className="section-label mb-4">Information</p>
              <Heading level={3} className="mb-10 text-ink">
                {t.contact.formTitle}
              </Heading>

              <dl className="space-y-8">
                <div>
                  <dt className="text-xs tracking-[0.25em] text-ink/45 uppercase mb-2">{t.contact.phone}</dt>
                  <dd>
                    <a href="tel:03-6914-3633" className="font-serif text-xl text-ink hover:text-gold-700 transition-colors duration-500">
                      03-6914-3633
                    </a>
                    <p className="text-ink/50 text-xs mt-1">{t.contact.businessHoursValue}</p>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.25em] text-ink/45 uppercase mb-2">{t.contact.email}</dt>
                  <dd>
                    <a href="mailto:info@kanae-tokyo.com" className="font-serif text-lg text-ink hover:text-gold-700 transition-colors duration-500 break-all">
                      info@kanae-tokyo.com
                    </a>
                    <p className="text-ink/50 text-xs mt-1">{t.contact.onlineNote}</p>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.25em] text-ink/45 uppercase mb-2">{t.contact.address}</dt>
                  <dd className="text-ink/70 text-sm leading-loose">
                    〒171-0033<br />
                    東京都豊島区高田3-16-4<br />
                    Golje Bld. 6F
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* 右 — フォーム */}
            <Reveal delay={1} className="lg:col-span-8">
              <div className="border hairline bg-gold-50/60 p-7 md:p-12">
                <Text size="sm" color="light" className="mb-10">
                  {t.contact.formDescription}
                </Text>

                {submitStatus === 'success' && (
                  <div className="mb-8 p-5 border border-pine/40 bg-pine-pale/15" role="status">
                    <p className="font-serif text-pine-deep mb-1">{t.contact.successTitle}</p>
                    <p className="text-ink/60 text-sm">{t.contact.successMessage}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-8 p-5 border border-red-300 bg-red-50" role="alert">
                    <p className="font-serif text-red-900 mb-1">{t.contact.errorTitle}</p>
                    <p className="text-red-800/80 text-sm">{t.contact.errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        {t.contact.name} <span className="text-gold-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.namePlaceholder}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        {t.contact.emailLabel} <span className="text-gold-700">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.emailPlaceholder}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        {t.contact.phoneLabel}
                        <span className="text-ink/35 normal-case tracking-normal ml-2">({t.contact.phoneOptional})</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contact.phonePlaceholder}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className={labelClass}>
                        {t.contact.inquiryType} <span className="text-gold-700">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="viewing">{t.contact.inquiryTypeViewing}</option>
                        <option value="inquiry">{t.contact.inquiryTypeInquiry}</option>
                        <option value="application">{t.contact.inquiryTypeApplication}</option>
                        <option value="other">{t.contact.inquiryTypeOther}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      {t.contact.message} <span className="text-gold-700">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t.contact.messagePlaceholder}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-ink text-washi py-4 text-sm tracking-[0.25em] hover:bg-gold-800 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t.contact.submitting : t.contact.submit}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
