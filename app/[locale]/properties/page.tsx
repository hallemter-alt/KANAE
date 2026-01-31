import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertySearchPage from '@/components/properties/PropertySearchPage';

export const metadata: Metadata = {
  title: '投資収益物件検索 | 株式会社KANAE',
  description: '東京都内の投資収益物件を検索。エリア、路線、駅、価格、利回りなど様々な条件で物件を探せます。株式会社KANAEは不動産投資、賃貸、売買、管理、民泊事業を展開しています。',
  keywords: ['投資物件', '収益物件', '一棟マンション', '一棟ビル', '不動産投資', '東京', '利回り', 'KANAE', '株式会社KANAE'],
};

export default function PropertiesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PropertySearchPage />
      <Footer />
    </main>
  );
}
