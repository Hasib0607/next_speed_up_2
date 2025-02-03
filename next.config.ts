import type { NextConfig } from 'next';

// Define your Next.js configuration
const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
      // memoryManagement: true,
      // appDir: true,
      // reactMode: "concurrent",
      turbo: {
        resolveExtensions: [
          '.mdx',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.mjs',
          '.json',
        ],
      },
    },
};

export default nextConfig;
