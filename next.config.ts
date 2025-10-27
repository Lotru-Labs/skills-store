import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dv.alextac.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;
