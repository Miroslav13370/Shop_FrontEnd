import { IStore, IStoreCreate, IStoreEdit } from '@/src/types/store.interface';

import { api } from '../api';

export const storeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStoreByOwner: build.query<IStore[], void>({
      query: () => ({
        url: `/stores/store-By-Owner`,
      }),
      providesTags: ['STORE'],
    }),
    getStoreById: build.query<IStore, string>({
      query: (storeId) => ({
        url: `/stores/by-id/${storeId}`,
      }),
      providesTags: ['STORE'],
    }),

    getAllStores: build.query<IStore[], void>({
      query: () => ({
        url: '/stores/all',
      }),
      providesTags: ['STORE'],
    }),

    createStore: build.mutation<IStore, IStoreCreate>({
      query: (body) => ({
        url: '/stores',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['STORE'],
    }),

    updateStore: build.mutation<IStore, { storeId: string; body: IStoreEdit }>({
      query: ({ storeId, body }) => ({
        url: `/stores/${storeId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['STORE'],
    }),

    deleteStore: build.mutation<IStore, string>({
      query: (storeId) => ({
        url: `/stores/${storeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['STORE'],
    }),
  }),
});

export const {
  useGetStoreByIdQuery,
  useGetAllStoresQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
  useGetStoreByOwnerQuery,
} = storeApi;
