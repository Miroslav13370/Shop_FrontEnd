import { EnumOrderStatus, IPaymentResponse } from '@/src/types/order.interface';

import { api } from '../api';

export interface IOrderItemInput {
  quantity: number;
  price: number;
  productId: string;
  storeId: string;
}

export interface IOrderInput {
  items: IOrderItemInput[];
  status?: EnumOrderStatus;
}

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation<IPaymentResponse, IOrderInput>({
      query: (body) => ({
        url: '/orders/place',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
