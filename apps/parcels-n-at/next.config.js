const IgnorePlugin = require("webpack").IgnorePlugin;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // transpilePackages: ["@wprdc/ui", "@wprdc/types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iasworld.alleghenycounty.us",
        port: "",
        pathname: "/iasworld/iDoc2/Services/**",
      },
      {
        protocol: "https",
        hostname: "iasworld.alleghenycounty.us",
        port: "",
        pathname: "/iasworld/maintain/services/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new IgnorePlugin({
          resourceRegExp: /original-fs/,
          contextRegExp: /adm-zip/,
        }),
      );
    }
    return config;
  },
};
