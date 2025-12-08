
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
};

export default nextConfig;