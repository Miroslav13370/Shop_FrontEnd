'use client';

import { FC } from 'react';

import { useGetProductByIdQuery } from '@/src/api/product/productApi';
import { Catalog } from '@/src/components/ui/catalog/Catalog';
import { IProduct } from '@/src/types/product.interface';

import { ProductInfo } from './Product-Info/ProductInfo';
import { ProductReviews } from './Product-Reviews/ProductReviews';
import { ProductGallery } from './product-gallery/ProductGallery';

type IProps = {
  initialProduct: IProduct;
  similarProducts: IProduct[];
  id?: string;
};

const Product: FC<IProps> = ({ similarProducts, id }) => {
  const { data: product } = useGetProductByIdQuery(id ? id : '');

  return (
    <div className="p-8 md:px-25 ">
      <div className="grid gap-10 mb-8 lg:grid-cols-2 lg:gap-20 ">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <Catalog title="Похожие товары" products={similarProducts} />
      <ProductReviews product={product} />
    </div>
  );
};

export default Product;
