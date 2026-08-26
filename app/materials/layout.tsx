import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '建材・国際貿易事業 | KANAE',
  description: 'KANAE Building Materials & Global Trade introduces NFB BOARD, technical documents and B2B consultation for adoption in Japan.',
};

export default function MaterialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
