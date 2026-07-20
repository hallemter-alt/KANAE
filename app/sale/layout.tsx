import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "売買物件 — 東京のマンション・戸建・土地",
  description:
    "東京の売買物件検索。マンション・戸建・土地の購入相談から売却査定まで、株式会社KANAEにお任せください。",
  alternates: { canonical: "/sale" },
  openGraph: {
    title: "売買物件 — 東京のマンション・戸建・土地 | 株式会社KANAE",
    description:
      "東京の売買物件検索。購入相談から売却査定まで対応します。",
  },
};

export default function SaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
