import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "民泊運営代行 — 許可申請から運用まで一括サポート",
  description:
    "民泊の許可申請、リスティング作成、ゲスト対応、清掃手配まで一括代行。収支シミュレーションもご用意。株式会社KANAE。",
  alternates: { canonical: "/minpaku" },
  openGraph: {
    title: "民泊運営代行 — 許可申請から運用まで一括サポート | 株式会社KANAE",
    description:
      "民泊の許可申請からゲスト対応、清掃手配まで一括代行。",
  },
};

export default function MinpakuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
