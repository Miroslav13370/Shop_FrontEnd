import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from './card.types';

const initialState: ICartInitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExists = state.items.some((item) => item.product.id === action.payload.product.id);

      if (!isExists) state.items.push({ ...action.payload, id: crypto.randomUUID() });
    },

    removeCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { id, type } = action.payload;

      state.items = state.items.map((item) => {
        if (item.id !== id) return item;

        return type === 'plus'
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item, quantity: item.quantity - 1 };
      });
    },

    reset: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
