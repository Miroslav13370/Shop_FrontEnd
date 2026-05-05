'use client';

import { Button } from '@/src/components/ui/button';
import { useActions } from '@/src/hooks/store/useActions';
import { useTypedSelector } from '@/src/hooks/store/useTypedSelector';
import { IProduct } from '@/src/types/product.interface';

type Props = {
  product: IProduct;
};
export const AddToCartButton = ({ product }: Props) => {
  const items = useTypedSelector((store) => store.cart.items);
  const isShopping = items.find((item) => item.product.id === product.id);
  const { addToCart, removeCart } = useActions();

  return (
    <div className="flex-1">
      {!isShopping ? (
        <Button
          variant="primary"
          className="w-full h-10"
          onClick={() => addToCart({ product, quantity: 1, price: product.price })}
        >
          Добавить в корзину
        </Button>
      ) : (
        <Button
          variant="primary"
          className="w-full h-10 bg-gray-500 hover:bg-gray-400 "
          onClick={() => removeCart({ id: isShopping.id })}
        >
          Удалить из корзины
        </Button>
      )}
    </div>
  );
};
