"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, Award } from "lucide-react";
import { pickText, type Locale } from "@/lib/content";

const features = [
  {
    icon: Shield,
    title: { ja: "安心のライセンス", en: "Licensed and compliant", zh: "持证合规" },
    description: {
      ja: "宅地建物取引業 東京都知事(1)第107157号。公益社団法人東京都宅地建物取引業協会に加盟。",
      en: "Tokyo-licensed brokerage with active industry association membership.",
      zh: "拥有东京都不动产执照，并加入专业行业协会。",
    },
  },
  {
    icon: Zap,
    title: { ja: "スピーディな対応", en: "Fast response", zh: "快速响应" },
    description: {
      ja: "お問い合わせから24時間以内にご返答。急なご相談も柔軟に対応いたします。",
      en: "Initial response within 24 hours and flexible handling for urgent requests.",
      zh: "咨询后 24 小时内响应，并支持紧急需求快速处理。",
    },
  },
  {
    icon: Users,
    title: { ja: "専門スタッフ", en: "Specialized teams", zh: "专业团队" },
    description: {
      ja: "各分野のプロフェッショナルが在籍。投資・管理・民泊など専門知識でサポート。",
      en: "Dedicated professionals across investment, management and short-stay operations.",
      zh: "覆盖投资、管理与民宿运营的专业人才团队。",
    },
  },
  {
    icon: Award,
    title: { ja: "実績と信頼", en: "Proven track record", zh: "口碑与业绩" },
    description: {
      ja: "設立以来、多くのお客様にご愛顧いただいております。リピート率98%を達成。",
      en: "Trusted by returning clients with a 98% repeat engagement rate.",
      zh: "长期获得客户信赖，复购与持续合作率达到 98%。",
    },
  },
] as const;

type FeaturesSectionProps = {
  locale?: Locale;
};

export default function FeaturesSection({ locale = "ja" }: FeaturesSectionProps) {
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
          <p className="text-sm text-decay-wood tracking-[0.2em] mb-3 font-sans-jp">WHY CHOOSE US</p>
          <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-charcoal-black mb-4">{pickText({ ja: "KANAEが選ばれる理由", en: "Why clients choose KANAE", zh: "选择 KANAE 的理由" }, locale)}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title.ja}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-concrete-grey/50 flex items-center justify-center">
                <feature.icon size={28} className="text-light-copper" />
              </div>
              <h3 className="font-serif-jp text-lg font-bold text-charcoal-black mb-3">{pickText(feature.title, locale)}</h3>
              <p className="text-sm text-rust-iron leading-relaxed font-sans-jp">{pickText(feature.description, locale)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
