import { useParams } from 'next/navigation';

import { useGetProductByIdQuery } from '@/src/api/product/productApi';

const useGetProduct = () => {
  const { productId } = useParams<{ storeId: string; productId: string }>();
  const { data: productData, isLoading: isLoadingProduct } = useGetProductByIdQuery(productId);

  return { productData, isLoadingProduct };
};

export default useGetProduct;
