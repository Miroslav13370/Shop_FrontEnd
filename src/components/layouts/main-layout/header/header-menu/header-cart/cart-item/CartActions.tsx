import { Minus, Plus, TrashIcon } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { useActions } from '@/src/hooks/store/useActions';
import { ICartItem } from '@/src/types/card.interface';

type Props = {
  item: ICartItem;
};
export const CartActions = ({ item }: Props) => {
  const { changeQuantity, removeCart } = useActions();

  return (
    <div className="flex items-center gap-2 ">
      <Button
        variant="ghost"
        onClick={() => changeQuantity({ type: 'minus', id: item.id })}
        disabled={item.quantity <= 1}
      >
        <Minus />
      </Button>

      {item.quantity}
      <Button variant="ghost" onClick={() => changeQuantity({ type: 'plus', id: item.id })}>
        <Plus />
      </Button>
      <Button variant="ghost" className="ml-10" onClick={() => removeCart({ id: item.id })}>
        <TrashIcon />
      </Button>
    </div>
  );
};
