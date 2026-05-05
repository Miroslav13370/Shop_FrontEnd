import { IAuthForm, IAuthResponse } from '@/src/types/auth.interface';
import { IUser } from '@/src/types/user.interface';

import { api } from '../api';

interface ILogoutResponse {
  message: string;
}

interface IRefreshResponse {
  accessToken: string;
  user: IUser;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IAuthResponse, IAuthForm>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    register: build.mutation<IAuthResponse, IAuthForm>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    refreshAccessToken: build.mutation<IRefreshResponse, void>({
      query: () => ({
        url: '/auth/login/access-token',
        method: 'POST',
      }),
    }),

    logout: build.mutation<ILogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshAccessTokenMutation,
  useLogoutMutation,
} = authApi;
