const IgnorePlugin = require("webpack").IgnorePlugin;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => {
    return [
      {
        source: "/news",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.wprdc.org",
        port: "",
        pathname: "/uploads/**",
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

export default nextConfig;