import { FC, ReactNode } from 'react';

import { MainLayout } from '@/src/components/layouts/main-layout/MainLayout';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
