import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Vercel自動優化圖片，不需要unoptimized
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Vercel優化設置
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
