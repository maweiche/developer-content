// @ts-check
/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");
const redirectsJson = require("./redirects.json");

module.exports = withContentlayer({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  // webpack5: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // common solana docs
      ...redirectFormatter("https://solana.com/", redirectsJson["common-docs"]),
      ...redirectFormatter(
        "https://docs.solanalabs.com/",
        redirectsJson["solana-client"],
      ),
    ];
  },
});

/**
 * Format the NextJS redirects
 */
function redirectFormatter(basePath, redirects, permanent = true) {
  return redirects.map(item => {
    item.basePath = false;
    item.permanent = item.permanent ?? permanent;
    item.destination = `${basePath}${item.destination}`;
    return item;
  });
}
