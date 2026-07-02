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

export const metadata: Metadata = {
  title: "株式会社KANAE | 東京・不動産 — 住まいと時間に、静かな価値を",
  description: "株式会社KANAE - 賃貸・売買・管理・民泊。建築と自然、光と素材に寄り添う不動産サービスを東京から。",
  keywords: ["不動産", "賃貸", "売買", "民泊", "管理", "東京", "豊島区"],
  openGraph: {
    title: "株式会社KANAE | 住まいと時間に、静かな価値を",
    description: "賃貸・売買・管理・民泊。建築と自然に寄り添う不動産サービス。",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#21201f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable} ${cormorant.variable}`}>
      <body className="font-noto antialiased bg-washi text-ink">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
