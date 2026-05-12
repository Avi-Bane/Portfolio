import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name', // Only if not using a custom domain
  images: { unoptimized: true }, // GitHub Pages doesn't support Next.js image optimization
};

export default nextConfig;
