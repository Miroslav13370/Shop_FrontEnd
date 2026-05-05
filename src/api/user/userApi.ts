import { IUser } from '@/src/types/user.interface';

import { api } from '../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<IUser, void>({
      query: () => ({
        url: '/user/profile',
      }),
      providesTags: ['FAVORITE'],
    }),

    toggleFavorite: build.mutation<boolean, string>({
      query: (productId) => ({
        url: `/user/profile/favorites/${productId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['FAVORITE'],
    }),
  }),
});

export const { useGetProfileQuery, useToggleFavoriteMutation } = userApi;
