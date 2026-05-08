import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BusinessSection from "@/components/BusinessSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import { isLocale, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Header locale={locale as Locale} />
      <main className="flex-1">
        <HeroSection locale={locale as Locale} />
        <BusinessSection locale={locale as Locale} />
        <FeaturesSection locale={locale as Locale} />
        <CTASection locale={locale as Locale} />
      </main>
      <Footer locale={locale as Locale} />
    </>
  );
}
