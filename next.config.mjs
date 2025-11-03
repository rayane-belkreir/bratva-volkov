/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimisations de performance (swcMinify est maintenant par défaut dans Next.js 15)
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

