import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	
	env: {
		SERVER
	}
	
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.yandex.net' },
      { protocol: 'http', hostname: 'localhost' },
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
