/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/tools' : '',
  assetPrefix: isProd ? '/tools/' : '',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;