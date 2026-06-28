import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'dattisdev.ir'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    const apiOrigin =
      process.env.INTERNAL_API_URL ||
      (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api').replace(/\/api\/?$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
  // Disable static optimization for admin routes
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default withNextIntl(nextConfig);
