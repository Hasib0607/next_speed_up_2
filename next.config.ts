import type { NextConfig } from 'next';

// Define your Next.js configuration
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.ebitans.com',
            },
        ],
    },
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
