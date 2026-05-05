'use client';

import { LogOut } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { api } from '@/src/api/api';
import { removeFromStorage, saveTokenStorage } from '@/src/api/auth/auth-token.service';
import { useLogoutMutation } from '@/src/api/auth/authApi';
import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { DataTable } from '@/src/components/ui/data-loading/DataTable';
import { useAppDispatch } from '@/src/hooks/store/dispath';

import { orderColumns } from './orderColumn';

const Dashboard = () => {
  const searchParams = useSearchParams();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accessTokenFromUrl = searchParams.get('accessToken');

  useEffect(() => {
    if (!accessTokenFromUrl) return;

    saveTokenStorage(accessTokenFromUrl);

    dispatch(api.util.resetApiState());

    router.replace('/dashboard');

    router.refresh();
  }, [accessTokenFromUrl, dispatch, router]);

  const { data } = useGetProfileQuery(undefined, {
    skip: !!accessTokenFromUrl,
  });
  const clearAuthState = () => {
    removeFromStorage();
    localStorage.removeItem('accessToken');

    dispatch(api.util.resetApiState());

    router.push('/auth');

    router.refresh();
  };

  const logOutFunc = async () => {
    try {
      const data = await logout().unwrap();
      clearAuthState();
      toast.success(data.message);
    } catch {
      clearAuthState();
      toast.error('При выходе из системы произошла ошибка');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <Heading title="Ваши заказы" />
        <div className="flex items-center">
          <Button variant="ghost" onClick={async () => await logOutFunc()}>
            <LogOut size={15} />
            Выйти
          </Button>
        </div>
      </div>
      <DataTable columns={orderColumns} data={data ? data.orders : []} />
    </div>
  );
};

export default Dashboard;
