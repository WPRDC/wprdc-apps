const IgnorePlugin = require("webpack").IgnorePlugin;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // transpilePackages: ["@wprdc/ui", "@wprdc/types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iasworld.alleghenycounty.us",
        port: "",
        pathname: "/iasworld/iDoc2/Services/**",
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
