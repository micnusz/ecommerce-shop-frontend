import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com", "cdn.dummyjson.com"],
  },
};

export default nextConfig;
