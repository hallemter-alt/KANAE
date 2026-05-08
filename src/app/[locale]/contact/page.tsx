import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { isLocale, pickText, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <>
      <Header locale={typedLocale} />
      <main className="flex-1 pt-16 md:pt-20">
        <section className="py-16 md:py-24 bg-concrete-grey/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16 text-center">
            <p className="text-sm text-decay-wood tracking-[0.2em] mb-3 font-sans-jp">CONTACT US</p>
            <h1 className="font-serif-jp text-3xl md:text-5xl font-bold text-charcoal-black mb-4">{pickText({ ja: "お問い合わせ", en: "Contact", zh: "联系我们" }, typedLocale)}</h1>
            <p className="text-rust-iron max-w-xl mx-auto font-sans-jp">{pickText({ ja: "不動産に関するご相談・お見積り・物件のご紹介など、お気軽にお問い合わせください", en: "For consultation, quotation and listing requests, please contact us.", zh: "欢迎咨询不动产相关需求、报价及房源介绍。" }, typedLocale)}</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-washi-white">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="font-serif-jp text-2xl font-bold text-charcoal-black mb-8">{pickText({ ja: "連絡先情報", en: "Contact Information", zh: "联系方式" }, typedLocale)}</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-brick-white rounded"><MapPin size={24} className="text-light-copper flex-shrink-0 mt-0.5" /><div><p className="font-sans-jp font-bold text-charcoal-black mb-1">{pickText({ ja: "所在地", en: "Address", zh: "地址" }, typedLocale)}</p><p className="text-sm text-rust-iron font-sans-jp">〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F</p></div></div>
                  <div className="flex items-start space-x-4 p-4 bg-brick-white rounded"><Phone size={24} className="text-light-copper flex-shrink-0 mt-0.5" /><div><p className="font-sans-jp font-bold text-charcoal-black mb-1">{pickText({ ja: "電話番号", en: "Phone", zh: "电话" }, typedLocale)}</p><p className="text-sm text-rust-iron font-sans-jp">03-6914-3633 / 080-4363-2780</p></div></div>
                  <div className="flex items-start space-x-4 p-4 bg-brick-white rounded"><Mail size={24} className="text-light-copper flex-shrink-0 mt-0.5" /><div><p className="font-sans-jp font-bold text-charcoal-black mb-1">{pickText({ ja: "メールアドレス", en: "Email", zh: "邮箱" }, typedLocale)}</p><p className="text-sm text-rust-iron font-sans-jp">info@kanae-tokyo.com</p></div></div>
                  <div className="flex items-start space-x-4 p-4 bg-brick-white rounded"><Clock size={24} className="text-light-copper flex-shrink-0 mt-0.5" /><div><p className="font-sans-jp font-bold text-charcoal-black mb-1">{pickText({ ja: "営業時間", en: "Business Hours", zh: "营业时间" }, typedLocale)}</p><p className="text-sm text-rust-iron font-sans-jp">平日 9:00～18:00 / 土曜 10:00～17:00</p></div></div>
                </div>
              </div>

              <div>
                <h2 className="font-serif-jp text-2xl font-bold text-charcoal-black mb-8">{pickText({ ja: "お問い合わせフォーム", en: "Contact Form", zh: "联系表单" }, typedLocale)}</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-sans-jp font-bold text-charcoal-black mb-2">{pickText({ ja: "お名前", en: "Name", zh: "姓名" }, typedLocale)}</label>
                    <input type="text" required className="w-full px-4 py-3 bg-brick-white border border-charcoal-black/10 text-charcoal-black placeholder-rust-iron/50 focus:border-light-copper focus:outline-none transition-colors font-sans-jp" />
                  </div>
                  <div>
                    <label className="block text-sm font-sans-jp font-bold text-charcoal-black mb-2">{pickText({ ja: "メールアドレス", en: "Email", zh: "邮箱" }, typedLocale)}</label>
                    <input type="email" required className="w-full px-4 py-3 bg-brick-white border border-charcoal-black/10 text-charcoal-black placeholder-rust-iron/50 focus:border-light-copper focus:outline-none transition-colors font-sans-jp" />
                  </div>
                  <div>
                    <label className="block text-sm font-sans-jp font-bold text-charcoal-black mb-2">{pickText({ ja: "お問い合わせ内容", en: "Message", zh: "咨询内容" }, typedLocale)}</label>
                    <textarea required rows={6} className="w-full px-4 py-3 bg-brick-white border border-charcoal-black/10 text-charcoal-black placeholder-rust-iron/50 focus:border-light-copper focus:outline-none transition-colors resize-y font-sans-jp" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center px-8 py-4 bg-charcoal-black text-washi-white font-sans-jp font-bold text-sm tracking-wider hover:bg-light-copper transition-all duration-300"><Send size={16} className="mr-2" />{pickText({ ja: "送信する", en: "Submit", zh: "提交" }, typedLocale)}</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={typedLocale} />
    </>
  );
}
