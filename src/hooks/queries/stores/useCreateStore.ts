import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCreateStoreMutation } from '@/src/api/store/storeApi';
import { STORE_URL } from '@/src/config/url.config';

const useCreateStore = () => {
  const [create, { isLoading: isLoadingCreate }] = useCreateStoreMutation();
  const router = useRouter();

  const createStore = async (data: { title: string }) => {
    try {
      const createData = await create(data).unwrap();
      toast.success('Успешное создание магазина');
      router.push(STORE_URL.home(createData.id));
    } catch (error) {
      console.log('Ошибка создания магазина', error);
      toast.error('Ошибка создания магазина');
    }
  };

  return { createStore, isLoadingCreate };
};

export default useCreateStore;
