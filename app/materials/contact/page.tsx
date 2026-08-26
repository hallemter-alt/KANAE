'use client';

import { FormEvent, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy, products } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader } from '@/components/materials/MaterialsComponents';

const inputClass = 'w-full px-4 py-3 bg-white/80 border hairline focus:border-ink/50 transition-colors text-sm text-ink placeholder:text-ink/35';
const labelClass = 'block text-xs tracking-[0.2em] text-ink/50 uppercase mb-3';

export default function MaterialsContactPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState<{
    company: string;
    name: string;
    email: string;
    phone: string;
    topic: string;
    product: string;
    message: string;
  }>({
    company: '',
    name: '',
    email: '',
    phone: '',
    topic: copy.contact.topics[0],
    product: 'NALEXIBLE NFB BOARD',
    message: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    if (product) {
      setForm((current) => ({ ...current, product }));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const message = [
      `【建材・国際貿易事業 問い合わせ】`,
      `会社名: ${form.company}`,
      `相談種別: ${form.topic}`,
      `対象製品: ${form.product}`,
      '',
      form.message,
    ].join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: 'inquiry',
          message,
        }),
      });

      if (!response.ok) throw new Error('failed');
      setStatus('success');
      setForm((current) => ({ ...current, company: '', name: '', email: '', phone: '', message: '' }));
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.contact.title} subtitle={copy.contact.subtitle} image="/assets/site/engawa.webp" eyebrow="Materials / Contact" />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader label="B2B Inquiry" title={copy.contact.formTitle} text="建材採用は用途・下地・施工条件・性能要求によって確認事項が変わります。下記情報をいただけると、初回回答がスムーズです。" />
            <div className="border hairline bg-white/40 p-7 space-y-4 text-sm text-ink/62 leading-loose">
              <p>・用途（床 / 壁 / 建具 / 外装 / OEM）</p>
              <p>・案件段階（情報収集 / 設計検討 / 試作 / 見積）</p>
              <p>・必要資料（製品資料 / 試験データ / 特許 / サンプル）</p>
              <p>・希望納期、数量、施工エリア</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 border hairline bg-white/55 p-7 md:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{copy.contact.fields.company}</label>
                <input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>{copy.contact.fields.name} *</label>
                <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>{copy.contact.fields.email} *</label>
                <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>{copy.contact.fields.phone}</label>
                <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>{copy.contact.fields.topic}</label>
                <select className={inputClass} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  {copy.contact.topics.map((topic) => <option key={topic}>{topic}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>{copy.contact.fields.product}</label>
                <select className={inputClass} value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
                  {products.map((product) => <option key={product.name}>{product.name}</option>)}
                  <option>Other / 未定</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>{copy.contact.fields.message} *</label>
              <textarea required rows={8} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <button disabled={status === 'sending'} className="w-full bg-ink text-washi py-4 text-sm tracking-[0.25em] hover:bg-gold-800 disabled:opacity-60 transition-colors">
              {status === 'sending' ? 'Sending...' : copy.contact.fields.submit}
            </button>

            {status === 'success' && <p className="text-sm text-ink/70 bg-washi p-4 border hairline">{copy.contact.success}</p>}
            {status === 'error' && <p className="text-sm text-ink/70 bg-washi p-4 border hairline">{copy.contact.fallback}</p>}
          </form>
        </div>
      </MaterialsSection>
      <Footer />
    </main>
  );
}
