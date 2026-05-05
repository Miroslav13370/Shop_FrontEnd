import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useDeleteProductMutation } from '@/src/api/product/productApi';
import { STORE_URL } from '@/src/config/url.config';

const useDeleteProduct = () => {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const router = useRouter();

  const [deleteProductMutate, { isLoading: isLoadingDeleteProduct }] = useDeleteProductMutation();

  const deleteProduct = async () => {
    try {
      await deleteProductMutate({ productId, storeId }).unwrap();
      toast.success('Товар успешно удален');
      router.push(STORE_URL.products(storeId));
    } catch {
      toast.error('Ошибка при удалении товара');
    }
  };

  return { deleteProduct, isLoadingDeleteProduct };
};

export default useDeleteProduct;
