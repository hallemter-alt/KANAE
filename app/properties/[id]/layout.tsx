import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "物件詳細",
  description: "物件詳細情報。株式会社KANAEの取り扱い物件をご覧いただけます。",
};

export default function PropertyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
