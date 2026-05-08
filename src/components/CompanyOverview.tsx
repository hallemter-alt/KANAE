"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Calendar, Building2, Hash } from "lucide-react";
import { pickText, type Locale } from "@/lib/content";

type CompanyOverviewProps = {
  locale?: Locale;
};

const companyInfo = [
  { label: { ja: "会社名", en: "Company", zh: "公司名称" }, value: { ja: "株式会社KANAE", en: "KABUSHIKI KAISHA KANAE", zh: "株式会社KANAE" }, icon: Building2 },
  { label: { ja: "代表者", en: "Representative", zh: "代表" }, value: { ja: "代表取締役 叶維舟", en: "CEO Yizhou Ye", zh: "代表董事 叶维舟" }, icon: null },
  { label: { ja: "設立", en: "Founded", zh: "成立" }, value: { ja: "令和3年7月5日（2021年7月5日）", en: "July 5, 2021", zh: "2021年7月5日" }, icon: Calendar },
  { label: { ja: "法人番号", en: "Corporate No.", zh: "法人编号" }, value: { ja: "0111-01-095676", en: "0111-01-095676", zh: "0111-01-095676" }, icon: Hash },
  { label: { ja: "所在地", en: "Address", zh: "地址" }, value: { ja: "〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F", en: "Golje Bld. 6F, 3-16-4 Takada, Toshima-ku, Tokyo", zh: "东京都丰岛区高田3丁目16番4号 Golje Bld. 6F" }, icon: MapPin },
  { label: { ja: "電話番号", en: "Phone", zh: "电话" }, value: { ja: "03-6914-3633 / 080-4363-2780", en: "+81-3-6914-3633 / +81-80-4363-2780", zh: "03-6914-3633 / 080-4363-2780" }, icon: Phone },
  { label: { ja: "メール", en: "Email", zh: "邮箱" }, value: { ja: "info@kanae-tokyo.com", en: "info@kanae-tokyo.com", zh: "info@kanae-tokyo.com" }, icon: Mail },
  { label: { ja: "営業時間", en: "Business Hours", zh: "营业时间" }, value: { ja: "平日 9:00～18:00 / 土曜 10:00～17:00（日祝休業）", en: "Mon-Fri 9:00-18:00 / Sat 10:00-17:00", zh: "工作日 9:00-18:00 / 周六 10:00-17:00" }, icon: Clock },
] as const;

export default function CompanyOverview({ locale = "ja" }: CompanyOverviewProps) {
  return (
    <section className="py-20 md:py-32 bg-washi-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm text-decay-wood tracking-[0.2em] mb-3 font-sans-jp">COMPANY PROFILE</p>
          <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-charcoal-black mb-4">{pickText({ ja: "会社概要", en: "Company Overview", zh: "公司概览" }, locale)}</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-brick-white rounded shadow-building overflow-hidden">
            {companyInfo.map((item, index) => (
              <motion.div
                key={item.label.ja}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex items-start p-4 md:p-6 ${index !== companyInfo.length - 1 ? "border-b border-concrete-grey" : ""}`}
              >
                <div className="w-8 flex-shrink-0 mt-0.5">{item.icon && <item.icon size={18} className="text-light-copper" />}</div>
                <div className="flex-1 ml-2">
                  <p className="text-xs text-rust-iron mb-1 font-sans-jp">{pickText(item.label, locale)}</p>
                  <p className="text-sm md:text-base text-charcoal-black font-sans-jp">{pickText(item.value, locale)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 p-6 bg-concrete-grey/30 rounded border-l-4 border-light-copper"
          >
            <h3 className="font-serif-jp text-lg font-bold text-charcoal-black mb-3">{pickText({ ja: "許認可・加盟団体", en: "Licenses & Membership", zh: "资质与协会" }, locale)}</h3>
            <ul className="space-y-2 text-sm text-rust-iron font-sans-jp">
              <li>宅地建物取引業 東京都知事(1)第107157号</li>
              <li>公益社団法人 全国宅地建物取引業協会連合会</li>
              <li>公益社団法人 東京都宅地建物取引業協会</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
