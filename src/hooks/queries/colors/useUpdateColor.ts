import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useUpdateColorMutation } from '@/src/api/color/colorApi';
import { IColorInput } from '@/src/types/color.interface';

const useUpdateColor = () => {
  const { storeId, colorId } = useParams<{ storeId: string; colorId: string }>();

  const [updateColorMutate, { isLoading: isLoadingUpdateColor }] = useUpdateColorMutation();

  const updateColor = async (body: IColorInput) => {
    try {
      await updateColorMutate({ body, storeId, colorId }).unwrap();
      toast.success('Цвет успешно обновлен');
    } catch {
      toast.error('Ошибка при обновлении Цвета');
    }
  };

  return { updateColor, isLoadingUpdateColor };
};

export default useUpdateColor;
