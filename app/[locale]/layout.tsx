import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SavedSearchesProvider } from "@/contexts/SavedSearchesContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { translations } from "@/lib/translations";
import { generateOrganizationSchema } from "@/lib/seo-schema";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  variable: '--font-noto-sans',
  weight: ['400', '500', '700', '900'],
});

// 支援的語言列表
export const locales = ['ja', 'zh', 'en'] as const;
export type Locale = typeof locales[number];

// 動態生成 metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (locale || 'ja') as Locale;
  const t = translations[currentLocale];
  
  const titles = {
    ja: "KANAE - 物心両面の幸福と利他の心で、世界に通じる価値を創造する",
    zh: "KANAE - 追求物质与精神的双重幸福，以利他之心创造通往世界的价值",
    en: "KANAE - Creating World-Class Value with Pursuit of Material and Spiritual Happiness"
  };
  
  const descriptions = {
    ja: "株式会社KANAE - 不動産事業（賃貸・売買・管理・民泊）を通じて、お客様と社会の幸福を実現します。",
    zh: "株式会社KANAE - 通过房地产业务（租赁、买卖、管理、民宿）实现客户与社会的幸福。",
    en: "KANAE Co., Ltd. - Realizing customer and social happiness through real estate business (rental, sales, management, vacation rental)."
  };

  return {
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    keywords: currentLocale === 'ja' 
      ? ["不動産", "賃貸", "売買", "民泊", "管理", "東京", "豊島区"]
      : currentLocale === 'zh'
      ? ["房地产", "租赁", "买卖", "民宿", "管理", "东京", "丰岛区"]
      : ["real estate", "rental", "sales", "vacation rental", "management", "Tokyo", "Toshima"],
    openGraph: {
      title: titles[currentLocale],
      description: descriptions[currentLocale],
      type: "website",
      locale: currentLocale === 'ja' ? 'ja_JP' : currentLocale === 'zh' ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `https://www.kanae-tokyo.com/${currentLocale}`,
      languages: {
        'ja': '/ja',
        'zh': '/zh',
        'en': '/en',
      },
    },
  };
}

// 靜態生成所有語言版本
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale || 'ja') as Locale;
  
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <html lang={currentLocale} className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-noto antialiased">
        <LanguageProvider initialLocale={currentLocale}>
          <SavedSearchesProvider>
            <FavoritesProvider>
              <ComparisonProvider>
                {children}
              </ComparisonProvider>
            </FavoritesProvider>
          </SavedSearchesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
