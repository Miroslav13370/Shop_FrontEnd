import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import { IUser } from '../types/user.interface';
import { removeFromStorage, saveTokenStorage } from './auth/auth-token.service';

type RefreshResponse = {
  accessToken: string;
  user: IUser;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/login/access-token',
        method: 'POST',
      },
      api,
      extraOptions,
    );
    console.log(refreshResult);

    if (refreshResult.data) {
      result = await rawBaseQuery(args, api, extraOptions);
      const refreshData = refreshResult.data as RefreshResponse;

      saveTokenStorage(refreshData.accessToken);
    } else {
      await rawBaseQuery(
        {
          url: '/auth/logout',
          method: 'POST',
        },
        api,
        extraOptions,
      );
      removeFromStorage();
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['STORE', 'PRODUCT', 'COLOR', 'CATEGORY', 'AUTH', 'FAVORITE', 'REVIEW'],
  endpoints: () => ({}),
});
