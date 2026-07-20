import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SpeedInsights } from '@vercel/speed-insights/next';

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '700'],
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: '--font-noto-serif',
  weight: ['400', '500', '600'],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
});

// 正式ドメイン確定後は Vercel 環境変数 NEXT_PUBLIC_SITE_URL を設定してください
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanae-tau.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "株式会社KANAE | 東京・不動産 — 住まいと時間に、静かな価値を",
    template: "%s | 株式会社KANAE",
  },
  description: "株式会社KANAE - 賃貸・売買・管理・民泊。建築と自然、光と素材に寄り添う不動産サービスを東京から。",
  keywords: ["不動産", "賃貸", "売買", "民泊", "管理", "東京", "豊島区"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "株式会社KANAE | 住まいと時間に、静かな価値を",
    description: "賃貸・売買・管理・民泊。建築と自然に寄り添う不動産サービス。",
    type: "website",
    url: "/",
    siteName: "株式会社KANAE",
    locale: "ja_JP",
    images: [
      {
        url: "/assets/site/corridor.webp",
        alt: "光の差し込む静かな回廊 — 株式会社KANAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社KANAE | 住まいと時間に、静かな価値を",
    description: "賃貸・売買・管理・民泊。建築と自然に寄り添う不動産サービス。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#21201f',
};

// 構造化データ（JSON-LD）— RealEstateAgent
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "株式会社KANAE",
  url: siteUrl,
  email: "info@kanae-tokyo.com",
  telephone: "+81-3-6914-3633",
  address: {
    "@type": "PostalAddress",
    postalCode: "171-0033",
    addressRegion: "東京都",
    addressLocality: "豊島区",
    streetAddress: "高田3丁目16番4号 Golje Bld. 6F",
    addressCountry: "JP",
  },
  areaServed: "東京都",
  knowsAbout: ["賃貸仲介", "売買仲介", "賃貸管理", "民泊運営", "不動産投資"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable} ${cormorant.variable}`}>
      <body className="font-noto antialiased bg-washi text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
