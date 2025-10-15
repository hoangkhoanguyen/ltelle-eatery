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
      {
        protocol: "https",
        hostname: "ltelle-upload.erosnguyen.com",
        port: "",
      },
    ],
    qualities: [85],
  },
  output: "standalone",
};

export default nextConfig;
