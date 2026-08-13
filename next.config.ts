import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Tells Next.js to generate a static HTML build
  images: {
    unoptimized: true, // Required because Next.js default image optimization needs a server
  },
  basePath: '/lol-client',
};

export default nextConfig;
