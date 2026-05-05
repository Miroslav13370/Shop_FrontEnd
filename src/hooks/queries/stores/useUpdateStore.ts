import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useGetStoreByIdQuery, useUpdateStoreMutation } from '@/src/api/store/storeApi';
import { IStoreEdit } from '@/src/types/store.interface';

const useUpdateStore = () => {
  const param = useParams<{ storeId: string }>();
  const { data: store } = useGetStoreByIdQuery(param.storeId);
  const [updateStoreMutate, { isLoading: isLoadingUpdate }] = useUpdateStoreMutation();

  const updateStore = async (body: IStoreEdit) => {
    try {
      await updateStoreMutate({ storeId: param.storeId, body }).unwrap();
      toast.success('Успешное обновление магазина');
    } catch {
      toast.error('Ошибка при обновлении магазина');
    }
  };
  return { store, updateStore, isLoadingUpdate };
};

export default useUpdateStore;
