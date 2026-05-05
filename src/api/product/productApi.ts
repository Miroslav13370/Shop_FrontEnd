import { IProduct, IProductInput } from '@/src/types/product.interface';

import { api } from '../api';

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<IProduct[], string | void>({
      query: (searchTerm) => ({
        url: '/product',
        params: searchTerm ? { searchTerm } : undefined,
      }),
      providesTags: ['PRODUCT'],
    }),

    getProductByStoreId: build.query<IProduct[], string>({
      query: (storeId) => ({
        url: `/product/by-storeId/${storeId}`,
      }),
      providesTags: ['PRODUCT'],
    }),

    getProductByCategoryId: build.query<IProduct[], string>({
      query: (categoryId) => ({
        url: `/product/by-categoryId/${categoryId}`,
      }),
      providesTags: ['PRODUCT'],
    }),

    getProductById: build.query<IProduct, string>({
      query: (productId) => ({
        url: `/product/by-id/${productId}`,
      }),
      providesTags: ['PRODUCT'],
    }),

    getMostPopularProducts: build.query<IProduct[], void>({
      query: () => ({
        url: '/product/most-popular',
      }),
      providesTags: ['PRODUCT'],
    }),

    getSimilarProducts: build.query<IProduct[], string>({
      query: (productId) => ({
        url: `/product/similar/${productId}`,
      }),
      providesTags: ['PRODUCT'],
    }),

    createProduct: build.mutation<IProduct, { body: IProductInput; storeId: string }>({
      query: ({ body, storeId }) => ({
        url: `/product/${storeId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    updateProduct: build.mutation<
      IProduct,
      { body: IProductInput; productId: string; storeId: string }
    >({
      query: ({ body, productId, storeId }) => ({
        url: `/product/${productId}`,
        method: 'PUT',
        body,
        params: { storeId },
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    deleteProduct: build.mutation<IProduct, { productId: string; storeId: string }>({
      query: ({ productId, storeId }) => ({
        url: `/product/${productId}`,
        method: 'DELETE',
        params: { storeId },
      }),
      invalidatesTags: ['PRODUCT'],
    }),
    deleteImage: build.mutation<IProduct, { productId: string; storeId: string; imageId: string }>({
      query: ({ productId, storeId, imageId }) => ({
        url: `/product/${productId}`,
        method: 'PATCH',
        params: { storeId, imageId },
      }),
      invalidatesTags: ['PRODUCT'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByStoreIdQuery,
  useGetProductByCategoryIdQuery,
  useGetProductByIdQuery,
  useGetMostPopularProductsQuery,
  useGetSimilarProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteImageMutation,
} = productApi;
