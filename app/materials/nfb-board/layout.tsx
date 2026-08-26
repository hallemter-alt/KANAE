import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NALEXIBLE NFB BOARD | KANAE Materials',
  description: 'Natural fibre structural core with lightweight, rigidity and acoustic performance for raised floors, doors and panels.',
};

export default function NfbBoardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
