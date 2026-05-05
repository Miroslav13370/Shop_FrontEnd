import { FC, ReactNode } from 'react';

import StoreLayout from '@/src/components/layouts/store-layout/StoreLayout';

type IProps = {
  children: ReactNode;
};

const Layout: FC<IProps> = ({ children }) => {
  return <StoreLayout>{children}</StoreLayout>;
};

export default Layout;
