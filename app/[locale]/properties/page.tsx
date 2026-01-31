import { Metadata } from 'next';
import PropertySearchPage from '@/components/properties/PropertySearchPage';

export const metadata: Metadata = {
  title: '投資収益物件検索 | RUT Tokyo',
  description: '東京都内の投資収益物件を検索。エリア、路線、駅、価格、利回りなど様々な条件で物件を探せます。',
  keywords: ['投資物件', '収益物件', '一棟マンション', '一棟ビル', '不動産投資', '東京', '利回り'],
};

export default function PropertiesPage() {
  return <PropertySearchPage />;
}
