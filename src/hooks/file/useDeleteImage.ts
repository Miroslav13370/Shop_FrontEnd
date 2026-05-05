import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useDeleteImageMutation } from '@/src/api/product/productApi';

const useDeleteImage = () => {
  const { storeId, productId } = useParams<{ productId: string; storeId: string }>();
  const [deleteImageMutate, { isLoading: isLoadingDeleteImage }] = useDeleteImageMutation();

  const deleteImage = async (imageId: string) => {
    try {
      await deleteImageMutate({ storeId, productId, imageId }).unwrap();
      toast.success('Успешное удаление картинки');
    } catch {
      toast.error('При удалении картинки произошла ошибка');
    }
  };

  return { deleteImage, isLoadingDeleteImage };
};

export default useDeleteImage;
