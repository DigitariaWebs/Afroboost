import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // ESLint runs separately via `npm run lint`. Skipping during build
    // avoids picking up the parent Expo project's flat-config eslint
    // setup (eslint v10 + `eslint/config`) which isn't resolvable from /web.
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
