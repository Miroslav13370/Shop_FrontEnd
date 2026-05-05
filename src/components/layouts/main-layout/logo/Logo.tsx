import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/images/logo.svg';
import { PUBLIC_URL } from '@/src/config/url.config';
import { SITE_NAME } from '@/src/constants/seo.constants';

const Logo = () => {
  return (
    <Link
      href={PUBLIC_URL.home()}
      className="flex items-center gap-2 text-[30px]  text-blue-500 font-bold hover:opacity-75 transition-opacity"
    >
      <Image src={logo} width={39} height={39} alt={SITE_NAME} />
      {SITE_NAME}
    </Link>
  );
};

export default Logo;
