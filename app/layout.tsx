import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  variable: '--font-noto-sans',
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: "KANAE - 物心両面の幸福と利他の心で、世界に通じる価値を創造する",
  description: "株式会社KANAE - 不動産事業（賃貸・売買・管理・民泊）を通じて、お客様と社会の幸福を実現します。",
  keywords: ["不動産", "賃貸", "売買", "民泊", "管理", "東京", "豊島区"],
  openGraph: {
    title: "KANAE - 物心両面の幸福と利他の心で、世界に通じる価値を創造する",
    description: "株式会社KANAE - 不動産事業（賃貸・売買・管理・民泊）",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-noto antialiased">
        {children}
      </body>
    </html>
  );
}
