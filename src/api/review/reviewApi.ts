import { IReview, IReviewInput } from '@/src/types/review.interface';

import { api } from '../api';

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviewByStoreId: build.query<IReview[], string>({
      query: (storeId) => ({
        url: `/review/by-storeId/${storeId}`,
      }),
      providesTags: ['REVIEW', 'PRODUCT'],
    }),

    getReviewById: build.query<IReview, string>({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
      }),
      providesTags: ['REVIEW', 'PRODUCT'],
    }),

    createReview: build.mutation<
      IReview,
      { body: IReviewInput; productId: string; storeId: string }
    >({
      query: ({ body, productId, storeId }) => ({
        url: `/review/${productId}/${storeId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['REVIEW', 'PRODUCT'],
    }),

    deleteReview: build.mutation<IReview, string>({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['REVIEW', 'PRODUCT'],
    }),
  }),
});

export const {
  useGetReviewByStoreIdQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
