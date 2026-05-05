import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useDeleteCategoryMutation } from '@/src/api/category/categoryApi';
import { STORE_URL } from '@/src/config/url.config';

const useDeleteCategory = () => {
  const { storeId, categoryId } = useParams<{ storeId: string; categoryId: string }>();
  const router = useRouter();

  const [deleteCategoryMutate, { isLoading: isLoadingDeleteCategory }] =
    useDeleteCategoryMutation();

  const deleteCategory = async () => {
    try {
      await deleteCategoryMutate({ categoryId, storeId }).unwrap();
      toast.success('Категория успешно удалена');
      router.push(STORE_URL.categories(storeId));
    } catch {
      toast.error('Ошибка при удалении Категории');
    }
  };

  return { deleteCategory, isLoadingDeleteCategory };
};

export default useDeleteCategory;
