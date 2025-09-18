import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photo.znews.vn",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hoanghamobile.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
