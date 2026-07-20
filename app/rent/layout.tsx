import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "賃貸物件検索 — 東京23区の賃貸マンション・アパート",
  description:
    "東京23区を中心とした賃貸物件検索。エリア・沿線・家賃条件から理想の住まいを。仲介から入居後サポートまで株式会社KANAEが対応します。",
  alternates: { canonical: "/rent" },
  openGraph: {
    title: "賃貸物件検索 — 東京23区の賃貸マンション・アパート | 株式会社KANAE",
    description:
      "東京23区を中心とした賃貸物件検索。エリア・沿線・家賃条件から理想の住まいを。",
  },
};

export default function RentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
