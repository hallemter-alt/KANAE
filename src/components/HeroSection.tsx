"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { pickText, withLocalePath, type Locale } from "@/lib/content";

type HeroSectionProps = {
  locale?: Locale;
};

const stats = [
  { number: "2021", label: { ja: "設立年", en: "Founded", zh: "成立年份" } },
  { number: "7+", label: { ja: "事業分野", en: "Business Lines", zh: "业务板块" } },
  { number: "100+", label: { ja: "管理物件数", en: "Managed Assets", zh: "管理物业数" } },
  { number: "98%", label: { ja: "顧客満足度", en: "Client Satisfaction", zh: "客户满意度" } },
] as const;

export default function HeroSection({ locale = "ja" }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-morning" />

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-light-copper/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brass-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <p className="text-sm md:text-base text-decay-wood tracking-[0.3em] mb-4 font-sans-jp">
            {pickText({ ja: "不動産の価値を、光で照らす", en: "Illuminating the value of real estate", zh: "点亮不动产价值" }, locale)}
          </p>

          <h1 className="font-serif-jp text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal-black mb-6 leading-tight">株式会社<span className="text-light-copper">KANAE</span></h1>

          <p className="text-lg md:text-xl text-rust-iron max-w-2xl mx-auto mb-4 font-sans-jp leading-relaxed">
            {pickText(
              {
                ja: "賃貸・売買・投資・管理・民泊運営。不動産に関わる全てのサービスを、一つの窓口で。",
                en: "Rental, sales, investment, property management and vacation rental operations from one trusted team.",
                zh: "租赁、买卖、投资、管理与民宿运营，一站式不动产服务。",
              },
              locale,
            )}
          </p>

          <p className="text-sm text-decay-wood mb-12 tracking-wider">宅地建物取引業 東京都知事(1)第107157号</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href={withLocalePath(locale, "/business")}
              className="group inline-flex items-center px-8 py-4 bg-charcoal-black text-washi-white font-sans-jp text-sm tracking-wider hover:bg-light-copper transition-all duration-300"
            >
              {pickText({ ja: "事業内容を見る", en: "Explore business lines", zh: "查看业务内容" }, locale)}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={withLocalePath(locale, "/contact")}
              className="inline-flex items-center px-8 py-4 border border-charcoal-black text-charcoal-black font-sans-jp text-sm tracking-wider hover:bg-charcoal-black hover:text-washi-white transition-all duration-300"
            >
              {pickText({ ja: "お問い合わせ", en: "Contact", zh: "联系我们" }, locale)}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.number} className="text-center">
              <p className="font-mono-data text-2xl md:text-3xl font-bold text-light-copper mb-1">{stat.number}</p>
              <p className="text-xs md:text-sm text-rust-iron font-sans-jp">{pickText(stat.label, locale)}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <ChevronDown size={24} className="text-rust-iron" />
      </motion.div>
    </section>
  );
}
