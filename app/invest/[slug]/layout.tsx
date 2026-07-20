import type { Metadata } from "next";
import { getInvestProperty, formatOku } from "@/lib/invest";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getInvestProperty(slug);

  if (!property) {
    return {
      title: "投資物件",
    };
  }

  const description = `${property.address}｜${property.access[0]}｜販売価格 ${formatOku(property.price)}｜表面利回り ${property.grossYield}%｜全${property.units}戸`;

  return {
    title: property.name.ja,
    description,
    alternates: { canonical: `/invest/${slug}` },
    openGraph: {
      title: `${property.name.ja} | 株式会社KANAE`,
      description,
    },
  };
}

export default function InvestPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
