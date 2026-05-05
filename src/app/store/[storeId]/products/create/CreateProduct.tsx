'use client';

import useGetCategory from '@/src/hooks/queries/categories/useGetCategories';
import useGetColor from '@/src/hooks/queries/colors/useGetColors';

import { ProductForm } from '../ProductForm';

const CreateProduct = () => {
  const { categoryListData } = useGetCategory();
  const { colorListData } = useGetColor();

  return (
    <div>
      <ProductForm categories={categoryListData || []} colors={colorListData || []} />
    </div>
  );
};

export default CreateProduct;
