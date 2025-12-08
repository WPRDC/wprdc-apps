/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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

  redirects: async () => {
    return [
      {
        source: "/news",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;