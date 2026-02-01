import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Cloudflare Pages compatibility
    unoptimized: process.env.NEXT_PUBLIC_CLOUDFLARE === 'true',
  },
  // Support both Vercel and Cloudflare deployments
  output: process.env.NEXT_PUBLIC_CLOUDFLARE === 'true' ? undefined : 'standalone',
};

export default nextConfig;
