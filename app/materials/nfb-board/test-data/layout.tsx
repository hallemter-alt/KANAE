import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NFB BOARD Test Data | KANAE Materials',
  description: 'Acoustic and concentrated load data summary for NALEXIBLE NFB BOARD.',
};

export default function NfbTestDataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
