import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Vercel automatic image optimization
    unoptimized: false,
  },
  // Vercel deployment configuration
  output: 'standalone',
};

export default nextConfig;
