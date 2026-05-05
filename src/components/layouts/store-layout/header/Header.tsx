'use client';

import Image from 'next/image';

import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Spinner } from '@/src/components/ui/spinner';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

import MobileSidebar from '../sidebar/MobileSidebar';
import StoreSwitcher from './StoreSwitcher';

const Header = () => {
  const { data, isLoading } = useGetProfileQuery();

  return (
    <div className="flex justify-between h-full bg-white">
      <MobileSidebar />
      <div className="my-auto mr-5">
        {data?.picture && !isLoading ? (
          <div className="flex gap-4 items-center">
            <StoreSwitcher />
            <Image
              src={returnImagesUrl(data?.picture)}
              alt="Лого"
              width={35}
              height={35}
              unoptimized
              loading="eager"
              className="rounded-full"
            />
          </div>
        ) : (
          <Spinner className="size-9" />
        )}
      </div>
    </div>
  );
};

export default Header;
