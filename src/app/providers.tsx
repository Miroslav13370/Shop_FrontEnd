'use client';

import { FC, ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from '../components/ui/sonner';
import { AppStore, makeStore } from '../store/store';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [store] = useState<AppStore>(() => makeStore());
  const [persistor] = useState(() => persistStore(store));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster position="top-center" />
      </PersistGate>
    </Provider>
  );
};

export default Providers;
