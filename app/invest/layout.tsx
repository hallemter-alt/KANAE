import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "投資物件 — 東京23区の一棟収益マンション",
  description:
    "東京23区を中心とした新築・築浅の一棟収益マンション。販売価格・表面利回り・収支シミュレーションを公開。株式会社KANAE。",
  alternates: { canonical: "/invest" },
  openGraph: {
    title: "投資物件 — 東京23区の一棟収益マンション | 株式会社KANAE",
    description:
      "東京23区を中心とした新築・築浅の一棟収益マンション。価格・利回りを公開。",
  },
};

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
