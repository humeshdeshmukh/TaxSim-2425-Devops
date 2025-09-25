/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ bypass TypeScript errors at build time
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ bypass ESLint errors at build time
  },
};

module.exports = nextConfig;
