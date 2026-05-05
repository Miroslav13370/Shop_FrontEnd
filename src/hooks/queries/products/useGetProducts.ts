import { useParams } from 'next/navigation';

import { useGetProductByStoreIdQuery } from '@/src/api/product/productApi';

const useGetProducts = () => {
  const params = useParams<{ storeId: string }>();
  const { data: productsListData, isLoading: isLoadingProducts } = useGetProductByStoreIdQuery(
    params.storeId,
  );

  return { productsListData, isLoadingProducts };
};

export default useGetProducts;
