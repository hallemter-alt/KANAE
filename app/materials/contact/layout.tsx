import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '技術相談・資料請求 | KANAE Materials',
  description: 'B2B technical consultation, samples and document requests for KANAE building materials.',
};

export default function MaterialsContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
