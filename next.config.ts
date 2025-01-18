import type { NextConfig } from 'next';

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true", // Set ANALYZE=true in your environment to enable the analyzer
});

// Define your Next.js configuration
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // memoryManagement: true,
    // appDir: true,
    // reactMode: "concurrent",
  },
};

// Export the wrapped configuration using withBundleAnalyzer
export default withBundleAnalyzer(nextConfig);