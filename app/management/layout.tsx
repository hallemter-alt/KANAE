import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "賃貸管理 — 入居者対応・集金・修繕を一括代行",
  description:
    "賃貸管理業務を一括代行。入居者募集、家賃集金、クレーム対応、修繕手配までオーナー様をサポート。株式会社KANAE。",
  alternates: { canonical: "/management" },
  openGraph: {
    title: "賃貸管理 — 入居者対応・集金・修繕を一括代行 | 株式会社KANAE",
    description:
      "入居者募集、家賃集金、修繕手配までオーナー様をサポート。",
  },
};

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
