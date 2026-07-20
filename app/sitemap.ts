import type { MetadataRoute } from "next";
import { INVEST_PROPERTIES } from "@/lib/invest";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanae-tau.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/rent",
    "/sale",
    "/invest",
    "/management",
    "/minpaku",
    "/market",
    "/about",
    "/philosophy",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 公開中の投資物件のみサイトマップに含める
  const investEntries: MetadataRoute.Sitemap = INVEST_PROPERTIES.filter(
    (p) => p.published
  ).map((p) => ({
    url: `${siteUrl}/invest/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...investEntries];
}
