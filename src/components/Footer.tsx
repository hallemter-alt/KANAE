import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { businesses, navItems, pickText, withLocalePath, type Locale } from "@/lib/content";

type FooterProps = {
  locale?: Locale;
};

const footerTagline = {
  ja: "不動産の価値を、光で照らす。",
  en: "Illuminating property value with clarity.",
  zh: "以专业之光点亮不动产价值。",
};

export default function Footer({ locale = "ja" }: FooterProps) {
  return (
    <footer className="bg-charcoal-black text-washi-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-washi-white flex items-center justify-center">
                <span className="text-charcoal-black font-serif-jp text-lg font-bold">K</span>
              </div>
              <span className="font-serif-jp text-lg font-bold">株式会社KANAE</span>
            </div>
            <p className="text-sm text-concrete-grey leading-relaxed mb-4">
              {footerTagline[locale]}
              <br />
              {pickText(
                {
                  ja: "賃貸・売買・投資・管理・民泊運営まで、不動産に関わる全てのサービスを提供いたします。",
                  en: "Rental, sales, investment, management and vacation rental operations in one team.",
                  zh: "从租赁、买卖、投资到管理与民宿运营，提供一站式不动产服务。",
                },
                locale,
              )}
            </p>
            <p className="text-xs text-rust-iron">宅地建物取引業 東京都知事(1)第107157号</p>
          </div>

          <div>
            <h3 className="font-serif-jp text-lg font-semibold mb-6 text-light-copper">{pickText({ ja: "サイトマップ", en: "Sitemap", zh: "网站地图" }, locale)}</h3>
            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={withLocalePath(locale, link.href)}
                    className="text-sm text-concrete-grey hover:text-light-copper transition-colors duration-300 flex items-center"
                    title={`${pickText(link.label, "en")} / ${pickText(link.label, "zh")}`}
                  >
                    <ExternalLink size={12} className="mr-2" />
                    {pickText(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif-jp text-lg font-semibold mb-6 text-light-copper">{pickText({ ja: "事業内容", en: "Business Lines", zh: "业务板块" }, locale)}</h3>
            <ul className="space-y-3">
              {businesses.slice(0, 5).map((item) => (
                <li key={item.subtitle} className="text-sm text-concrete-grey">
                  {pickText(item.title, locale)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif-jp text-lg font-semibold mb-6 text-light-copper">{pickText({ ja: "お問い合わせ", en: "Contact", zh: "联系我们" }, locale)}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-light-copper mt-0.5 flex-shrink-0" />
                <span className="text-sm text-concrete-grey">〒171-0033<br />東京都豊島区高田3丁目16番4号<br />Golje Bld. 6F</span>
              </li>
              <li className="flex items-center space-x-3"><Phone size={18} className="text-light-copper flex-shrink-0" /><span className="text-sm text-concrete-grey">03-6914-3633 / 080-4363-2780</span></li>
              <li className="flex items-center space-x-3"><Mail size={18} className="text-light-copper flex-shrink-0" /><span className="text-sm text-concrete-grey">info@kanae-tokyo.com</span></li>
              <li className="flex items-start space-x-3"><Clock size={18} className="text-light-copper mt-0.5 flex-shrink-0" /><span className="text-sm text-concrete-grey">平日 9:00～18:00 / 土曜 10:00～17:00</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-rust-iron/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-xs text-rust-iron">&copy; {new Date().getFullYear()} 株式会社KANAE. All rights reserved.</p>
            <p className="text-xs text-rust-iron">令和3年7月5日設立 | 法人番号: 0111-01-095676</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
