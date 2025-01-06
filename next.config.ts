import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // Çift rendera neden oluyor
  cacheMaxMemorySize: 0,
  // output: 'standalone',
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**'
      }
    ],
  },
};

export default nextConfig;
