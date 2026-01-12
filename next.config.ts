import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Required for Cloudflare Pages
  },
  // Static export for Cloudflare Pages compatibility
  output: 'export',
  // Enable trailing slash for proper routing on Cloudflare Pages
  trailingSlash: true,
};

export default nextConfig;
