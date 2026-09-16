import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://foody-dlm7.onrender.com/api/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foody-dlm7.onrender.com",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;