/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Isso permite builds mesmo com erros de tipos
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
