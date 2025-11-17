import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ltelle-upload.erosnguyen.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "upload.ltelleeatery.com",
        port: "",
      },
    ],
    qualities: [85],
  },
  output: "standalone",
};

export default nextConfig;
