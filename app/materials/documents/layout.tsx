import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '資料・知財 | KANAE Materials',
  description: 'Product dossiers, certificates and patent documents for KANAE building materials business.',
};

export default function MaterialsDocumentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
