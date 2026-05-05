import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/src/config/url.config';
import { IProduct } from '@/src/types/product.interface';
import { formatPrice } from '@/src/utils/string/format-price';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

type Props = {
  product: IProduct;
};
export const ProductCard = ({ product }: Props) => {
  return (
    <div className="min-w-50 max-w-50">
      <Link href={PUBLIC_URL.product(product.id)}>
        <div className="bg-gray-200 p-4 rounded-md">
          <Image
            src={returnImagesUrl(product.images[0])}
            alt={product.title}
            width={1500}
            height={1500}
            className="w-50 h-40 object-cover rounded-md"
            loading="eager"
          />
        </div>
      </Link>
      <h3 className="text-[15px] font-bold mt-3">{product.title}</h3>
      <Link href={PUBLIC_URL.category(product.category?.id)} className="text-sm text-black/60">
        {product.category?.title}
      </Link>
      <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
    </div>
  );
};
