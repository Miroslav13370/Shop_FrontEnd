import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useUpdateProductMutation } from '@/src/api/product/productApi';
import { IProductInput } from '@/src/types/product.interface';

const useUpdateProduct = () => {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();

  const [updateProductMutate, { isLoading: isLoadingUpdateProduct }] = useUpdateProductMutation();

  const updateProduct = async (body: IProductInput) => {
    try {
      await updateProductMutate({ body, storeId, productId }).unwrap();
      toast.success('Товар успешно обновлен');
    } catch {
      toast.error('Ошибка при обновлении товара');
    }
  };

  return { updateProduct, isLoadingUpdateProduct };
};

export default useUpdateProduct;
