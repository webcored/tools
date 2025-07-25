/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd && isGitHubPages ? '/tools' : '',
  assetPrefix: isProd && isGitHubPages ? '/tools/' : '',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;