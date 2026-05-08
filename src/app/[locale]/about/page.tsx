import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyOverview from "@/components/CompanyOverview";
import { isLocale, pickText, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
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
            <p className="text-sm text-decay-wood tracking-[0.2em] mb-3 font-sans-jp">ABOUT US</p>
            <h1 className="font-serif-jp text-3xl md:text-5xl font-bold text-charcoal-black mb-4">
              {pickText({ ja: "会社概要", en: "About Us", zh: "公司简介" }, typedLocale)}
            </h1>
            <p className="text-rust-iron max-w-xl mx-auto font-sans-jp">
              {pickText(
                {
                  ja: "株式会社KANAEの会社情報をご案内いたします",
                  en: "Discover KANAE's corporate profile, licensing and team overview.",
                  zh: "了解 KANAE 的公司信息、资质与团队概况。",
                },
                typedLocale,
              )}
            </p>
          </div>
        </section>
        <CompanyOverview locale={typedLocale} />
      </main>
      <Footer locale={typedLocale} />
    </>
  );
}
