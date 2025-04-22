/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tech0gen8step4himstorage.blob.core.windows.net',
        pathname: '/image/**',
      },
    ],
  },
  // 静的ファイルの処理を改善
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // assetPrefixを追加（重要）
  // assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  // CSSモジュールのサポートを明示的に有効化
  transpilePackages: ['tailwindcss', 'daisyui']
};
module.exports = nextConfig;
