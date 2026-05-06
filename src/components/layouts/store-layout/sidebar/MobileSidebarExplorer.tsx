'use client';
import { Heart, LogOut, Menu, ShoppingBag, ShoppingCart, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Button } from '@/src/components/ui/button';
import CreateStoreModal from '@/src/components/ui/modals/CreateStoreModal';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { Spinner } from '@/src/components/ui/spinner';
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/src/config/url.config';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

import HeaderCart from '../../main-layout/header/header-menu/header-cart/HeaderCart';

const MobileSidebarExplorer = () => {
  const { data: user, isLoading } = useGetProfileQuery();
  const [open, setIsOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="mt-1" />
      </SheetTrigger>
      <SheetContent
        side="left"
        style={{
          width: '230px',
        }}
      >
        <SheetHeader hidden>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col-reverse p-5 gap-10 ">
          <div className="flex items-center gap-2  text-black/70">
            <ShoppingCart />

            <div className="text-xl font-medium flex items-center gap-2 text-black/70 ml-[-11px]">
              <HeaderCart />
            </div>
          </div>
          <Link
            href={PUBLIC_URL.explorer()}
            className="text-xl font-medium flex items-center gap-2 text-black/70  
						"
            onClick={() => setIsOpen(false)}
          >
            <Store />
            Каталог
          </Link>
          {isLoading ? (
            <Spinner className="size-5" />
          ) : user ? (
            <>
              <Link
                href={DASHBOARD_URL.favorites()}
                className="text-xl font-medium flex items-center gap-2 text-black/70  "
                onClick={() => setIsOpen(false)}
              >
                <Heart />
                Избранное
              </Link>
              {user.stores.length ? (
                <Link
                  onClick={() => setIsOpen(false)}
                  href={STORE_URL.home(user.stores[0].id)}
                  className="text-xl font-medium flex items-center gap-2 text-black/70  "
                >
                  <ShoppingBag /> Мой магазин
                </Link>
              ) : (
                <div
                  className="text-xl font-medium flex items-center gap-2 text-black/70  "
                  onClick={() => setIsOpen(false)}
                >
                  <CreateStoreModal>Создать магазин</CreateStoreModal>
                </div>
              )}
              <div className="flex mx-auto mb-[-10px]" onClick={() => setIsOpen(false)}>
                <Link href={DASHBOARD_URL.home()}>
                  <Image
                    src={returnImagesUrl(user.picture!)}
                    alt={user.name}
                    width={35}
                    height={35}
                    className="rounded-full min-w-8 w-20"
                  />
                </Link>
              </div>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebarExplorer;
