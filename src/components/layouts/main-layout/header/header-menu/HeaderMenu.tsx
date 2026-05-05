'use client';

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Button } from '@/src/components/ui/button';
import CreateStoreModal from '@/src/components/ui/modals/CreateStoreModal';
import { Spinner } from '@/src/components/ui/spinner';
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/src/config/url.config';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

import HeaderCart from './header-cart/HeaderCart';

const HeaderMenu = () => {
  const { data: user, isLoading } = useGetProfileQuery();

  return (
    <div className="flex items-center">
      <HeaderCart />
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="ghost">Каталог</Button>
      </Link>
      {isLoading ? (
        <Spinner className="size-5" />
      ) : user ? (
        <>
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant="ghost">Избранное</Button>
          </Link>
          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="ghost">Мой магазин</Button>
            </Link>
          ) : (
            <div>
              <CreateStoreModal>
                <Button variant="ghost">Создать магазин</Button>
              </CreateStoreModal>
            </div>
          )}
          <Link href={DASHBOARD_URL.home()}>
            <Image
              src={returnImagesUrl(user.picture!)}
              alt={user.name}
              width={35}
              height={35}
              className="rounded-full"
            />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button variant="primary" className="p-4">
            <LogOut />
            Войти
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeaderMenu;
