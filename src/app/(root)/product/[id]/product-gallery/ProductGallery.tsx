import Image from 'next/image';
import { useState } from 'react';

import { IProduct } from '@/src/types/product.interface';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

type Props = {
  product: IProduct | undefined;
};
export const ProductGallery = ({ product }: Props) => {
  const [imageIndex, setImageIndex] = useState(0);

  if (!product) return null;

  return (
    <div className="flex flex-col gap-5 ">
      <div className="bg-gray-200 p-5 rounded-md flex h-140 ">
        <Image
          src={returnImagesUrl(product.images[imageIndex])}
          alt={product.title}
          width={1000}
          height={1000}
          className="object-cover rounded-md "
        />
      </div>
      <div className="flex gap-5">
        {product.images.map((url, index) => (
          <button
            key={url}
            onClick={() => setImageIndex(index)}
            className={`${index === imageIndex ? 'border-black border' : ''} rounded-xl overflow-hidden`}
          >
            <div className="bg-gray-200 p-2 rounded-md w-30 h-30 ">
              <Image
                src={returnImagesUrl(url)}
                alt={product.title}
                width={1000}
                height={1000}
                className="object-cover rounded-md w-26 h-26"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
