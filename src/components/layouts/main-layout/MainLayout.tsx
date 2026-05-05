import { ReactNode } from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';

type Props = {
  children: ReactNode;
};
export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
