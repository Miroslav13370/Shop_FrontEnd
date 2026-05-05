import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

import { PUBLIC_URL } from '@/src/config/url.config';
import { IProduct } from '@/src/types/product.interface';
import { formatPrice } from '@/src/utils/string/format-price';
import { formatReviewWord } from '@/src/utils/string/formatReviewWord';

import { AddToCartButton } from './AddToCartButton';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  product: IProduct | undefined;
};
export const ProductInfo = ({ product }: Props) => {
  if (!product) return null;

  const ratingCulcFunc = () => {
    if (product.reviews.length === 0) return 0.0;
    return (
      product.reviews.reduce((acc, i) => {
        return (acc += +i.rating);
      }, 0) / product.reviews.length
    ).toFixed(1);
  };

  return (
    <div>
      <div className="border-b mb-5">
        <h1 className="text-4xl font-bold mb-5">{product.title}</h1>
        <p className="text-2xl mb-5 ">{formatPrice(product.price)}</p>
      </div>
      <div className="border-b pb-5 text-sm text-black/70">{product.description}</div>
      <div className="mt-5 flex flex-col gap-5 border-b pb-5">
        <div className="flex items-center gap-3">
          <p>Цвет:</p>
          <div
            style={{
              backgroundColor: product.color?.value,
            }}
            className="w-5 h-5 rounded-full border-black/50 border"
          />
        </div>
        <div className="flex gap-2 items-center">
          {`Категория: `}
          <Link href={PUBLIC_URL.category(product.category?.id)} className="text-sm text-black/80">
            {product.category?.title}
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <p>Средний рейтинг:</p>
          <div className="flex gap-2 text-sm">
            <div className="flex items-center gap-1">
              <FaStar className="fill-amber-400 " />
              <p>{ratingCulcFunc()}</p>
            </div>
            |<p className="text-sm">{formatReviewWord(product.reviews.length)}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <AddToCartButton product={product} />
        <FavoriteButton product={product} />
      </div>
    </div>
  );
};
