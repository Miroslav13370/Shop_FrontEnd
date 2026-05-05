'use client';

import useGetCategory from '@/src/hooks/queries/categories/useGetCategory';

import { CategoryForm } from '../CategoriesForm';

const EditCategory = () => {
  const { categoryData } = useGetCategory();

  return (
    <div>
      <CategoryForm category={categoryData} />
    </div>
  );
};

export default EditCategory;
