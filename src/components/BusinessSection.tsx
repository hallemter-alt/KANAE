"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businesses, pickText, withLocalePath, type Locale } from "@/lib/content";

type BusinessSectionProps = {
  locale?: Locale;
};

export default function BusinessSection({ locale = "ja" }: BusinessSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-concrete-grey/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm text-decay-wood tracking-[0.2em] mb-3 font-sans-jp">OUR BUSINESS</p>
          <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-charcoal-black mb-4">{pickText({ ja: "事業内容", en: "Business Lines", zh: "业务内容" }, locale)}</h2>
          <p className="text-rust-iron max-w-xl mx-auto font-sans-jp">
            {pickText(
              {
                ja: "不動産に関わる全てのサービスを、ワンストップで提供いたします",
                en: "A complete real estate service portfolio delivered through one team.",
                zh: "围绕不动产提供完整的一站式服务组合。",
              },
              locale,
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {businesses.map((business, index) => (
            <motion.div
              key={business.subtitle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-washi-white p-6 md:p-8 rounded border border-charcoal-black/8 hover:border-light-copper transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-4 bg-light-copper/10">
                <business.icon size={24} style={{ color: business.colorHex }} />
              </div>
              <h3 className="font-serif-jp text-xl font-bold text-charcoal-black mb-1 group-hover:text-light-copper transition-colors">{pickText(business.title, locale)}</h3>
              <p className="text-xs tracking-wider text-decay-wood mb-3">{business.subtitle}</p>
              <p className="text-sm text-rust-iron leading-relaxed mb-4 font-sans-jp">{pickText(business.description, locale)}</p>
              <Link href={withLocalePath(locale, "/business")} className="inline-flex items-center text-sm text-light-copper hover:text-brass-gold transition-colors">
                <span>{pickText({ ja: "詳細を見る", en: "View details", zh: "查看详情" }, locale)}</span>
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
