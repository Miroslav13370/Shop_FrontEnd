import { IColor, IColorInput } from '@/src/types/color.interface';

import { api } from '../api';

export const colorApi = api.injectEndpoints({
  endpoints: (build) => ({
    getColorById: build.query<IColor, { colorId: string; storeId: string }>({
      query: ({ storeId, colorId }) => ({
        url: `/color/by-id/${colorId}`,
        params: { storeId },
      }),
      providesTags: ['COLOR'],
    }),
    getColorByStoreId: build.query<IColor[], string>({
      query: (storeId) => ({
        url: `/color/by-storeId/${storeId}`,
      }),
      providesTags: ['COLOR'],
    }),
    createColor: build.mutation<IColor, { body: IColorInput; storeId: string }>({
      query: ({ body, storeId }) => ({
        url: '/color',
        method: 'POST',
        body,
        params: { storeId },
      }),
      invalidatesTags: ['COLOR'],
    }),
    updateColor: build.mutation<IColor, { body: IColorInput; storeId: string; colorId: string }>({
      query: ({ body, storeId, colorId }) => ({
        url: `/color/${colorId}`,
        method: 'PUT',
        body,
        params: { storeId },
      }),
      invalidatesTags: ['COLOR'],
    }),
    deleteColor: build.mutation<IColor, { storeId: string; colorId: string }>({
      query: ({ storeId, colorId }) => ({
        url: `/color/${colorId}`,
        method: 'DELETE',
        params: { storeId },
      }),
      invalidatesTags: ['COLOR'],
    }),
  }),
});

export const {
  useGetColorByIdQuery,
  useGetColorByStoreIdQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
