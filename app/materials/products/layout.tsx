import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '製品群 | KANAE Materials',
  description: 'KANAE building materials product portfolio including NFB BOARD, ultra-thin stone sheet and acoustic panels.',
};

export default function MaterialsProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
