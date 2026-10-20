'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/Reveal'
import { Container, Section, Heading, Text } from '@/components/ui/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'
import {
  businesses,
  CONTACT_EMAIL,
  contactCopy,
  validateInquiry,
} from '@/lib/contact'

const inputClass =
  'w-full min-w-0 px-4 py-3 bg-white/80 border hairline focus:border-ink/40 transition-colors text-sm text-ink placeholder:text-ink/35'
const labelClass = 'block text-xs tracking-[0.12em] text-ink/65 mb-3'
const emptyContact = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: '',
}
type Status = 'idle' | 'success' | 'stored' | 'error' | 'invalid'

function ContactContent() {
  const { locale } = useLanguage()
  const t = translations[locale].contact
  const query = useSearchParams().toString()
  const [formData, setFormData] = useState(emptyContact)
  const [business, setBusiness] = useState('')
  const [topic, setTopic] = useState('')
  const [details, setDetails] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<string[]>([])
  const submitting = useRef(false)
  const feedback = useRef<HTMLDivElement>(null)
  const config = businesses.find((item) => item.value === business)

  useEffect(() => {
    const params = new URLSearchParams(query)
    const selected = businesses.find(
      (item) =>
        item.value ===
        (params.get('business') || (params.has('product') ? 'materials' : ''))
    )
    const selectedTopic = selected?.topics.find(
      (item) => item.value === params.get('topic')
    )
    const product = params.get('product')
    const knownProduct = selected?.fields
      .find((field) => field.key === 'product')
      ?.options?.some((item) => item.value === product)
    setBusiness(selected?.value ?? '')
    setTopic(selectedTopic?.value ?? selected?.topics[0].value ?? '')
    setDetails(knownProduct && product ? { product } : {})
    setErrors([])
    setStatus('idle')
  }, [query])

  useEffect(() => {
    if (status !== 'idle') feedback.current?.focus()
  }, [status])

  const clearFeedback = () => {
    setStatus('idle')
    setErrors([])
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({ ...current, [e.target.name]: e.target.value }))
    clearFeedback()
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting.current) return
    const payload = { ...formData, business, topic, details, locale }
    const validation = validateInquiry(payload)
    if (validation.errors) {
      setErrors(validation.errors)
      setStatus('invalid')
      return
    }
    submitting.current = true
    setIsSubmitting(true)
    clearFeedback()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || data.success !== true) {
        if (response.status === 400 && Array.isArray(data.fields)) {
          setErrors(data.fields)
          setStatus('invalid')
        } else setStatus('error')
        return
      }
      if (!['email_accepted', 'stored_only'].includes(data.delivery)) {
        setStatus('error')
        return
      }
      setStatus(data.delivery === 'stored_only' ? 'stored' : 'success')
      setFormData(emptyContact)
      setBusiness('')
      setTopic('')
      setDetails({})
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <PageHero
        label="Contact"
        title={t.title}
        subtitle={contactCopy.subtitle[locale]}
        image="pondStill"
        alt="静かな水面 — 対話の始まり"
      />
      <Section background="white" spacing="lg">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <p className="section-label mb-4">Information</p>
              <Heading level={3} className="mb-10 text-ink">
                {t.formTitle}
              </Heading>
              <dl className="space-y-8">
                <div>
                  <dt className="text-xs tracking-[0.2em] text-ink/60 mb-2">
                    {t.phone}
                  </dt>
                  <dd>
                    <a
                      href="tel:03-6914-3633"
                      className="font-serif text-xl text-ink hover:text-gold-700"
                    >
                      03-6914-3633
                    </a>
                    <p className="text-ink/60 text-xs mt-1">
                      {t.businessHoursValue}
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.2em] text-ink/60 mb-2">
                    {t.email}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-serif text-lg text-ink hover:text-gold-700 break-all"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <p className="text-ink/60 text-xs mt-1">{t.onlineNote}</p>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.2em] text-ink/60 mb-2">
                    {t.address}
                  </dt>
                  <dd className="text-ink/70 text-sm leading-loose">
                    〒171-0033
                    <br />
                    東京都豊島区高田3-16-4
                    <br />
                    Golje Bld. 6F
                  </dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-8 min-w-0">
              <div className="border hairline bg-gold-50/60 p-6 md:p-10">
                <Text size="sm" color="light" className="mb-4">
                  {t.formDescription}
                </Text>
                <p
                  id="contact-hint"
                  className="text-xs text-ink/65 leading-loose mb-8"
                >
                  {contactCopy.hint[locale]}
                </p>
                {status !== 'idle' && (
                  <div
                    ref={feedback}
                    tabIndex={-1}
                    id="contact-feedback"
                    role={
                      status === 'error' || status === 'invalid'
                        ? 'alert'
                        : 'status'
                    }
                    className={`mb-8 p-5 border outline-offset-4 ${status === 'error' || status === 'invalid' ? 'border-red-300 bg-red-50 text-red-900' : status === 'stored' ? 'border-amber-300 bg-amber-50 text-amber-950' : 'border-pine/40 bg-pine-pale/15 text-pine-deep'}`}
                  >
                    <p className="font-serif mb-2">
                      {status === 'success'
                        ? t.successTitle
                        : status === 'stored'
                          ? contactCopy.storedTitle[locale]
                          : t.errorTitle}
                    </p>
                    <p className="text-sm leading-loose">
                      {status === 'success'
                        ? t.successMessage
                        : status === 'stored'
                          ? contactCopy.storedMessage[locale]
                          : status === 'invalid'
                            ? contactCopy.validation[locale]
                            : t.errorMessage}
                    </p>
                    {(status === 'stored' || status === 'error') && (
                      <a
                        className="underline break-all text-sm"
                        href={`mailto:${CONTACT_EMAIL}`}
                      >
                        {CONTACT_EMAIL}
                      </a>
                    )}
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  aria-describedby="contact-hint"
                  aria-busy={isSubmitting}
                >
                  <fieldset
                    disabled={isSubmitting}
                    className="space-y-7 min-w-0 disabled:opacity-70"
                  >
                    <div>
                      <label htmlFor="business" className={labelClass}>
                        {contactCopy.business[locale]} *
                      </label>
                      <select
                        id="business"
                        name="business"
                        required
                        value={business}
                        aria-invalid={errors.includes('business')}
                        className={inputClass}
                        onChange={(e) => {
                          const selected = businesses.find(
                            (item) => item.value === e.target.value
                          )
                          setBusiness(e.target.value)
                          setTopic(selected?.topics[0].value ?? '')
                          setDetails({})
                          clearFeedback()
                        }}
                      >
                        <option value="">{contactCopy.select[locale]}</option>
                        {businesses.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label[locale]}
                          </option>
                        ))}
                      </select>
                    </div>
                    {config && (
                      <fieldset className="border hairline p-4 md:p-6 min-w-0 space-y-6">
                        <legend className="px-2 text-sm font-serif text-ink">
                          {config.label[locale]} — {contactCopy.details[locale]}
                        </legend>
                        <div>
                          <label htmlFor="topic" className={labelClass}>
                            {contactCopy.topic[locale]} *
                          </label>
                          <select
                            id="topic"
                            name="topic"
                            required
                            value={topic}
                            aria-invalid={errors.includes('topic')}
                            className={inputClass}
                            onChange={(e) => {
                              setTopic(e.target.value)
                              clearFeedback()
                            }}
                          >
                            {config.topics.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label[locale]}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {config.fields.map((field) => (
                            <div
                              key={`${business}-${field.key}`}
                              className="min-w-0"
                            >
                              <label
                                htmlFor={`detail-${field.key}`}
                                className={labelClass}
                              >
                                {field.label[locale]}{' '}
                                {field.required ? '*' : `(${t.phoneOptional})`}
                              </label>
                              {field.options ? (
                                <select
                                  id={`detail-${field.key}`}
                                  name={`details.${field.key}`}
                                  className={inputClass}
                                  required={field.required}
                                  value={details[field.key] ?? ''}
                                  aria-invalid={errors.includes(
                                    `details.${field.key}`
                                  )}
                                  onChange={(e) => {
                                    setDetails((current) => ({
                                      ...current,
                                      [field.key]: e.target.value,
                                    }))
                                    clearFeedback()
                                  }}
                                >
                                  <option value="">
                                    {contactCopy.select[locale]}
                                  </option>
                                  {field.options.map((item) => (
                                    <option key={item.value} value={item.value}>
                                      {item.label[locale]}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  id={`detail-${field.key}`}
                                  name={`details.${field.key}`}
                                  className={inputClass}
                                  required={field.required}
                                  maxLength={500}
                                  value={details[field.key] ?? ''}
                                  placeholder={field.placeholder?.[locale]}
                                  aria-invalid={errors.includes(
                                    `details.${field.key}`
                                  )}
                                  onChange={(e) => {
                                    setDetails((current) => ({
                                      ...current,
                                      [field.key]: e.target.value,
                                    }))
                                    clearFeedback()
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          {t.name} *
                        </label>
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          required
                          maxLength={100}
                          value={formData.name}
                          onChange={handleChange}
                          aria-invalid={errors.includes('name')}
                          placeholder={t.namePlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          {t.emailLabel} *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={errors.includes('email')}
                          placeholder={t.emailPlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          {t.phoneLabel} ({t.phoneOptional})
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          maxLength={50}
                          value={formData.phone}
                          onChange={handleChange}
                          aria-invalid={errors.includes('phone')}
                          placeholder={t.phonePlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className={labelClass}>
                          {contactCopy.company[locale]}
                        </label>
                        <input
                          id="company"
                          name="company"
                          autoComplete="organization"
                          maxLength={200}
                          value={formData.company}
                          onChange={handleChange}
                          aria-invalid={errors.includes('company')}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        {t.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        maxLength={5000}
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={errors.includes('message')}
                        placeholder={t.messagePlaceholder}
                        className={`${inputClass} resize-y`}
                      />
                    </div>
                    <div hidden aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-ink text-washi py-4 text-sm tracking-[0.2em] hover:bg-gold-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t.submitting : t.submit}
                    </button>
                  </fieldset>
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

export default function ContactPage() {
  return (
    <Suspense
      fallback={<main className="min-h-screen bg-washi" aria-busy="true" />}
    >
      <ContactContent />
    </Suspense>
  )
}
