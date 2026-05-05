import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCreateCategoryMutation } from '@/src/api/category/categoryApi';
import { STORE_URL } from '@/src/config/url.config';
import { ICategoryInput } from '@/src/types/category.interface';

const useCreateCategory = () => {
  const params = useParams<{ storeId: string }>();

  const router = useRouter();

  const [createCategoryMutate, { isLoading: isLoadingCreateCategory }] =
    useCreateCategoryMutation();

  const createCategory = async (body: ICategoryInput) => {
    try {
      await createCategoryMutate({ body, storeId: params.storeId }).unwrap();
      toast.success('Категория успешно создана');
      router.push(STORE_URL.categories(params.storeId));
    } catch {
      toast.error('Ошибка при создании Категории');
    }
  };

  return { createCategory, isLoadingCreateCategory };
};

export default useCreateCategory;
