/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Images are delivered through our own <picture> element with the WebP
  // variants the API already generated at 360/768/1024/1920, so the
  // built-in optimiser is not in the path and no remote-pattern allow-list
  // is needed.
  images: { unoptimized: true },

  async headers() {
    return [
      {
        // The back office must never be indexed, whatever robots.txt says.
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
