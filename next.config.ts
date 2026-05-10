import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    preloadEntriesOnStart: false,
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
