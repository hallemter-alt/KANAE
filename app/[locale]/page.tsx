'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Philosophy from '@/components/Philosophy';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Philosophy />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
