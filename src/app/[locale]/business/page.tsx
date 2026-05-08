import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import { businesses, isLocale, pickText, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import BusinessLineShowcase from "@/components/business/BusinessLineShowcase";

type BusinessPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BusinessPage({ params }: BusinessPageProps) {
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
            <p className="text-sm text-decay-wood tracking-[0.2em] mb-3 font-sans-jp">OUR BUSINESS</p>
            <h1 className="font-serif-jp text-3xl md:text-5xl font-bold text-charcoal-black mb-4">{pickText({ ja: "事業内容", en: "Business", zh: "业务内容" }, typedLocale)}</h1>
            <p className="text-rust-iron max-w-xl mx-auto font-sans-jp">
              {pickText({ ja: "不動産に関わる全てのサービスを、一つの窓口で提供いたします", en: "All real estate related services through one integrated team.", zh: "不动产相关服务由一支团队统一提供。" }, typedLocale)}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-washi-white">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16">
            <div className="space-y-12">
              {businesses.map((business) => (
                <article key={business.subtitle} className="flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10 rounded border border-charcoal-black/10 bg-brick-white hover:shadow-card-hover transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center bg-light-copper/10">
                      <business.icon size={32} style={{ color: business.colorHex }} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-xs tracking-wider mb-1 font-sans-jp text-decay-wood">{business.subtitle}</p>
                      <h2 className="font-serif-jp text-2xl md:text-3xl font-bold text-charcoal-black mb-1">{pickText(business.title, typedLocale)}</h2>
                    </div>

                    <p className="text-rust-iron leading-relaxed mb-6 font-sans-jp">{pickText(business.description, typedLocale)}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {business.features.map((feature) => (
                        <li key={feature.ja} className="flex items-start text-sm text-charcoal-black font-sans-jp">
                          <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0" style={{ color: business.colorHex }} />
                          <p>{pickText(feature, typedLocale)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BusinessLineShowcase locale={typedLocale} />
      </main>
      <Footer locale={typedLocale} />
    </>
  );
}
