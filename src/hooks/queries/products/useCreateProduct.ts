import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCreateProductMutation } from '@/src/api/product/productApi';
import { STORE_URL } from '@/src/config/url.config';
import { IProductInput } from '@/src/types/product.interface';

const useCreateProduct = () => {
  const params = useParams<{ storeId: string }>();

  const router = useRouter();

  const [createProductMutate, { isLoading: isLoadingCreateProduct }] = useCreateProductMutation();

  const createProduct = async (body: IProductInput) => {
    try {
      await createProductMutate({ body, storeId: params.storeId }).unwrap();
      toast.success('Товар успешно создан');
      router.push(STORE_URL.products(params.storeId));
    } catch {
      toast.error('Ошибка при создании товара');
    }
  };

  return { createProduct, isLoadingCreateProduct };
};

export default useCreateProduct;
