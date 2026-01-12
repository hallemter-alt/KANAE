import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Cloudflare Pages requires this
  },
  // Cloudflare Pages compatibility
  output: 'standalone',
};

export default nextConfig;
