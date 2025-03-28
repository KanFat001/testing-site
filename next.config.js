/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa');

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const { hostname } = new URL(baseUrl);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${hostname}`]
  },
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: !isServer,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true
          }
        }
      }
    };
    return config;
  },
  experimental: {
    esmExternals: 'loose',
    optimizeCss: true
  }
}

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  maximumFileSizeToCacheInBytes: 3000000
};

const nextConfigWithPwa = withPWA(pwaConfig)(nextConfig);
module.exports = process.env.NEXT_PWA_STATUS === '1' ? nextConfigWithPwa : nextConfig;
