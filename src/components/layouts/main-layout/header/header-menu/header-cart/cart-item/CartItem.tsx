import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/src/config/url.config';
import { ICartItem } from '@/src/types/card.interface';
import { formatPrice } from '@/src/utils/string/format-price';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

import { CartActions } from './CartActions';

type Props = {
  item: ICartItem;
  onCloseFunc: () => void;
};
export const CartItem = ({ item, onCloseFunc }: Props) => {
  return (
    <div className="flex gap-4 flex-col xs:flex-row ">
      <Link href={PUBLIC_URL.product(item.product.id)} onClick={() => onCloseFunc()}>
        <div className="bg-gray-200 p-2 rounded-md w-30 h-30">
          <Image
            src={returnImagesUrl(item.product.images[0])}
            alt={item.product.title}
            width={1000}
            height={1000}
            className="object-cover rounded-md w-26 h-26"
          />
        </div>
      </Link>
      <div className="flex gap-2 flex-col justify-center">
        <p className="text-xl">{item.product.title}</p>
        <p className="text-black/70">{formatPrice(item.product.price)}</p>
        <CartActions item={item} />
      </div>
    </div>
  );
};
