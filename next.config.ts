import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    { protocol: 'https', hostname: 'avatars.yandex.net' },
    { protocol: 'http', hostname: 'localhost' },
    { protocol: 'http', hostname: '136.234.124.13', pathname: '/uploads/**' },
  ],
  contentDispositionType: 'inline',
  dangerouslyAllowLocalIP: true,
},

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.SERVER_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
