import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { api } from '@/src/api/api';
import { saveTokenStorage } from '@/src/api/auth/auth-token.service';
import { useLoginMutation, useRegisterMutation } from '@/src/api/auth/authApi';
import { DASHBOARD_URL } from '@/src/config/url.config';
import { useAppDispatch } from '@/src/hooks/store/dispath';
import { IAuthForm } from '@/src/types/auth.interface';

export function useAuthForm(isReg: boolean) {
  const router = useRouter();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const form = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    try {
      const response = isReg ? await register(data).unwrap() : await login(data).unwrap();

      saveTokenStorage(response.accessToken);

      dispatch(api.util.resetApiState());

      router.push(DASHBOARD_URL.root());
      router.refresh();

      toast.success('Успешная авторизация');
    } catch (error) {
      console.error('Ошибка авторизации', error);
      toast.error('Ошибка авторизации');
    }
  };

  const isPending = isReg ? isLoadingRegister : isLoadingLogin;

  return { form, onSubmit, isPending };
}
