import { useParams } from 'next/navigation';

import { useGetCategoryByStoreIdQuery } from '@/src/api/category/categoryApi';

const useGetCategories = () => {
  const params = useParams<{ storeId: string }>();
  const { data: categoryListData, isLoading: isLoadingCategory } = useGetCategoryByStoreIdQuery(
    params.storeId,
  );

  console.log(categoryListData);

  return { categoryListData, isLoadingCategory };
};

export default useGetCategories;
