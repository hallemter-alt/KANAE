"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { pickText, withLocalePath, type Locale } from "@/lib/content";

type CTASectionProps = {
  locale?: Locale;
};

export default function CTASection({ locale = "ja" }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 bg-charcoal-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-light-copper/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brass-gold/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-light-copper tracking-[0.2em] mb-4 font-sans-jp">CONTACT US</p>
          <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-washi-white mb-4">{pickText({ ja: "まずはお気軽にご相談ください", en: "Let’s discuss your needs", zh: "欢迎随时咨询" }, locale)}</h2>
          <p className="text-rust-iron max-w-xl mx-auto mb-8 font-sans-jp">{pickText({ ja: "不動産に関するご相談、お見積り、物件のご紹介など、お気軽にお問い合わせください。", en: "Reach out for property consultation, quotations and curated listings.", zh: "可就不动产咨询、报价与房源推荐与我们联系。" }, locale)}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={withLocalePath(locale, "/contact")}
              className="group inline-flex items-center px-8 py-4 bg-light-copper text-charcoal-black font-sans-jp text-sm font-bold tracking-wider hover:bg-brass-gold transition-all duration-300"
            >
              {pickText({ ja: "お問い合わせフォーム", en: "Contact form", zh: "联系表单" }, locale)}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:03-6914-3633" className="inline-flex items-center px-8 py-4 border border-washi-white/30 text-washi-white font-sans-jp text-sm tracking-wider hover:bg-washi-white/10 transition-all duration-300">
              <Phone size={16} className="mr-2" />
              03-6914-3633
            </a>
          </div>

          <p className="text-xs text-rust-iron mt-6">平日 9:00～18:00 / 土曜 10:00～17:00（日祝休業）</p>
        </motion.div>
      </div>
    </section>
  );
}
