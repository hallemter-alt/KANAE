import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/content";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <div lang={locale as Locale}>{children}</div>;
}

export function generateStaticParams() {
  return [{ locale: "ja" }, { locale: "en" }, { locale: "zh" }];
}
