import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "株式会社KANAEの会社概要。東京都豊島区高田の不動産会社。賃貸・売買・管理・民泊。宅地建物取引業 東京都知事(1)第107157号。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "会社概要 | 株式会社KANAE",
    description: "東京都豊島区高田の不動産会社。賃貸・売買・管理・民泊。",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
