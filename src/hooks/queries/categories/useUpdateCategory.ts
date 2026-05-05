import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useUpdateCategoryMutation } from '@/src/api/category/categoryApi';
import { ICategoryInput } from '@/src/types/category.interface';

const useUpdateCategory = () => {
  const { storeId, categoryId } = useParams<{ storeId: string; categoryId: string }>();

  const [updateCategoryMutate, { isLoading: isLoadingUpdateCategory }] =
    useUpdateCategoryMutation();

  const updateCategory = async (body: ICategoryInput) => {
    try {
      await updateCategoryMutate({ body, storeId, categoryId }).unwrap();
      toast.success('Категория успешно обновлена');
    } catch {
      toast.error('Ошибка при обновлении Категории');
    }
  };

  return { updateCategory, isLoadingUpdateCategory };
};

export default useUpdateCategory;
