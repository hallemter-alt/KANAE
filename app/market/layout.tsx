import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "市場データ — 東京の地価推移と不動産市況",
  description:
    "東京都の公示地価・基準地価の推移、区別の不動産市況データを公開。売買・投資判断の材料に。株式会社KANAE。",
  alternates: { canonical: "/market" },
  openGraph: {
    title: "市場データ — 東京の地価推移と不動産市況 | 株式会社KANAE",
    description: "東京都の地価推移・不動産市況データを公開。",
  },
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
