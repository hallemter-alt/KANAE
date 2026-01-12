import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Required for Cloudflare Pages
  },
  // Static export for Cloudflare Pages compatibility
  output: 'export',
  // Disable trailing slash to match Cloudflare routing
  trailingSlash: false,
};

export default nextConfig;
