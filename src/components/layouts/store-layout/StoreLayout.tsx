import { PropsWithChildren } from 'react';

import style from './StoreLayout.module.css';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const StoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={style.wrapper}>
      <div className={style.layout}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>
        <div className={style.header}>
          <Header />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default StoreLayout;
