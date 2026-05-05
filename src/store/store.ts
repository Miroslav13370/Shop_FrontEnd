import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { api } from '../api/api';
import cartReducer from './card/cart.slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

export const makeStore = () => {
  const isClient = typeof window !== 'undefined';

  const reducer = isClient ? persistReducer(persistConfig, rootReducer) : rootReducer;

  return configureStore({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducer: reducer as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
