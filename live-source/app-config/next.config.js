/** next.config.js — copie rapatriée du Drive « navlys juin vrac md » le 2026-06-25 (référence).
 *  @type {import('next').NextConfig}
 *  Patché 28/05/2026 — ajout next-intl plugin pour i18n (12 locales). Spec : _I18N_INFRA_NEXTJS_SPEC.md */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: false },
  // Build-safe: do not block prod deploy on an ESLint warning.
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
