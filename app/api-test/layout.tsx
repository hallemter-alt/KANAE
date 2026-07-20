import type { Metadata } from "next";

// 開発用テストページ — 検索エンジンにインデックスさせない
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApiTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
