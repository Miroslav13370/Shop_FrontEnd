import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { PUBLIC_URL } from '@/src/config/url.config';
import { useCart } from '@/src/hooks/store/useCart';
import { formatPrice } from '@/src/utils/string/format-price';

import { CartItem } from './cart-item/CartItem';
import { useCheckout } from './cart-item/useCheckout';

const HeaderCart = () => {
  const { items, total } = useCart();
  const [open, setIsOpen] = useState(false);
  const router = useRouter();

  const { createPayment, isLoading } = useCheckout();

  const { data: user } = useGetProfileQuery();

  const handleClick = () => {
    if (user) {
      createPayment();
      return;
    }
    router.push(PUBLIC_URL.auth());
  };

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">Корзина</Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetTitle>
          <Heading title="Корзина товаров" />
        </SheetTitle>
        <SheetDescription hidden></SheetDescription>
        <div className="flex flex-col gap-3 overflow-auto">
          {items.length ? (
            items.map((item) => (
              <CartItem item={item} key={item.id} onCloseFunc={() => setIsOpen(false)} />
            ))
          ) : (
            <div>Корзина пуста!</div>
          )}
        </div>
        {items.length ? (
          <div className="mt-auto flex flex-col gap-3">
            <p className="text-lg">Итого к оплате: {formatPrice(total)}</p>
            <Button
              variant="primary"
              className="w-full h-9"
              onClick={handleClick}
              disabled={isLoading}
            >
              Перейти к оплате
            </Button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default HeaderCart;
