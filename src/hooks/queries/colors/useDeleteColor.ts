import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useDeleteColorMutation } from '@/src/api/color/colorApi';
import { STORE_URL } from '@/src/config/url.config';

const useDeleteColor = () => {
  const { storeId, colorId } = useParams<{ storeId: string; colorId: string }>();
  const router = useRouter();

  const [deleteColorMutate, { isLoading: isLoadingDeleteColor }] = useDeleteColorMutation();

  const deleteColor = async () => {
    try {
      await deleteColorMutate({ colorId, storeId }).unwrap();
      toast.success('Цвет успешно удален');
      router.push(STORE_URL.colors(storeId));
    } catch {
      toast.error('Ошибка при удалении цвета');
    }
  };

  return { deleteColor, isLoadingDeleteColor };
};

export default useDeleteColor;
