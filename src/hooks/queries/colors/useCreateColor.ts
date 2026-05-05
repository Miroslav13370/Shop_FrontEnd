import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCreateColorMutation } from '@/src/api/color/colorApi';
import { STORE_URL } from '@/src/config/url.config';
import { IColorInput } from '@/src/types/color.interface';

const useCreateColor = () => {
  const params = useParams<{ storeId: string }>();

  const router = useRouter();

  const [createColorMutate, { isLoading: isLoadingCreateColor }] = useCreateColorMutation();

  const createColor = async (body: IColorInput) => {
    try {
      await createColorMutate({ body, storeId: params.storeId }).unwrap();
      toast.success('Цвет успешно создан');
      router.push(STORE_URL.colors(params.storeId));
    } catch {
      toast.error('Ошибка при создании цвета');
    }
  };

  return { createColor, isLoadingCreateColor };
};

export default useCreateColor;
