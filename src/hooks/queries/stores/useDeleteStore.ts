import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useDeleteStoreMutation } from '@/src/api/store/storeApi';
import { PUBLIC_URL } from '@/src/config/url.config';

const useDeleteStore = () => {
  const param = useParams<{ storeId: string }>();
  const [deleteStoreMutate, { isLoading: isLoadingDelete }] = useDeleteStoreMutation();
  const router = useRouter();

  const deleteStore = async () => {
    try {
      await deleteStoreMutate(param.storeId).unwrap();
      router.push(PUBLIC_URL.home());
      toast.success('Успешное удаление магазина');
    } catch {
      toast.error('При удалении магазина произошла ошибка');
    }
  };

  return { deleteStore, isLoadingDelete };
};

export default useDeleteStore;
