/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "**",
      },
    ],
  },
  // images: {
  //   domains: ["media.rawg.io"],
  // },
  env: {
    RAWG_API_KEY: process.env.RAWG_API_KEY,
  },
};

module.exports = nextConfig;
