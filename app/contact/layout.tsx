import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "株式会社KANAEへのお問い合わせ。賃貸・売買・管理・民泊・投資物件のご相談は、お電話（03-6914-3633）またはお問い合わせフォームより。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ | 株式会社KANAE",
    description: "賃貸・売買・管理・民泊・投資物件のご相談はこちら。",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
