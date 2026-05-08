
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "株式会社KANAE | 不動産の価値を、光で照らす",
  description: "株式会社KANAEは、不動産賃貸仲介・売買仲介・賃貸管理・民泊運営・不動産コンサルティングを手がける東京都豊島区の不動産会社です。宅地建物取引業 東京都知事(1)第107157号",
  keywords: "不動産,賃貸,売買,投資,民泊,管理,東京,豊島区,KANAE",
  openGraph: {
    title: "株式会社KANAE | 不動産の価値を、光で照らす",
    description: "不動産賃貸仲介・売買仲介・賃貸管理・民泊運営・不動産コンサルティング",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSerifJP.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-washi-white text-charcoal-black font-sans">
        {children}
      </body>
    </html>
  );
}
