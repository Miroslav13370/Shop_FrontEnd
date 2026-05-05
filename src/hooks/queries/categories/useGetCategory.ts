import { useParams } from 'next/navigation';

import { useGetCategoryByIdQuery } from '@/src/api/category/categoryApi';

const useGetCategory = () => {
  const { storeId, categoryId } = useParams<{ storeId: string; categoryId: string }>();
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategoryByIdQuery({
    id: categoryId,
    storeId,
  });

  return { categoryData, isLoadingCategory };
};

export default useGetCategory;
