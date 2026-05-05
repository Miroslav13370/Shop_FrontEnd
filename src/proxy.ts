import { NextRequest, NextResponse } from 'next/server';

import { PUBLIC_URL } from './config/url.config';

const proxy = (request: NextRequest) => {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthUrl = request.url.includes(PUBLIC_URL.auth());

  if (isAuthUrl) {
    if (refreshToken) {
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url));
    }
    return NextResponse.next();
  }

  if (refreshToken === undefined) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/auth/:path*', '/store/:path*', '/dashboard/:path*'],
};

export default proxy;
