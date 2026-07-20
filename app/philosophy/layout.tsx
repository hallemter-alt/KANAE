import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企業理念",
  description:
    "住まいと時間に、静かな価値を。株式会社KANAEの企業理念・経営哲学をご紹介します。",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    title: "企業理念 | 株式会社KANAE",
    description: "住まいと時間に、静かな価値を。KANAEの理念。",
  },
};

export default function PhilosophyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
