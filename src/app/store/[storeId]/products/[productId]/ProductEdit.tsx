'use client';

import useGetCategory from '@/src/hooks/queries/categories/useGetCategories';
import useGetColor from '@/src/hooks/queries/colors/useGetColors';
import useGetProduct from '@/src/hooks/queries/products/useGetProduct';

import { ProductForm } from '../ProductForm';

const ProductEdit = () => {
  const { productData } = useGetProduct();
  const { categoryListData } = useGetCategory();
  const { colorListData } = useGetColor();

  return (
    <div>
      {categoryListData && colorListData && productData && (
        <ProductForm categories={categoryListData} colors={colorListData} product={productData} />
      )}
    </div>
  );
};

export default ProductEdit;
