import { ICategory, ICategoryInput } from '@/src/types/category.interface';

import { api } from '../api';

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategoryById: build.query<ICategory, { id: string; storeId: string }>({
      query: ({ id, storeId }) => ({
        url: `/categories/by-id/${id}`,
        params: { storeId },
      }),
      providesTags: ['CATEGORY'],
    }),
    getCategoryByStoreId: build.query<ICategory[], string>({
      query: (storeId) => ({
        url: `/categories/by-storeId/${storeId}`,
      }),
      providesTags: ['CATEGORY'],
    }),
    createCategory: build.mutation<ICategory, { body: ICategoryInput; storeId: string }>({
      query: ({ body, storeId }) => ({
        url: `/categories/create/${storeId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CATEGORY'],
    }),
    updateCategory: build.mutation<
      ICategory,
      { body: ICategoryInput; storeId: string; categoryId: string }
    >({
      query: ({ body, categoryId, storeId }) => ({
        url: `/categories/${categoryId}`,
        method: 'PUT',
        params: { storeId },
        body,
      }),
      invalidatesTags: ['CATEGORY'],
    }),
    deleteCategory: build.mutation<ICategory, { storeId: string; categoryId: string }>({
      query: ({ categoryId, storeId }) => ({
        url: `/categories/${categoryId}`,
        method: 'DELETE',
        params: { storeId },
      }),
      invalidatesTags: ['CATEGORY'],
    }),
  }),
});

export const {
  useGetCategoryByIdQuery,
  useGetCategoryByStoreIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
