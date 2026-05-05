import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { IMenuItem } from './menu.interface';

interface MenuItemProps {
  item: IMenuItem;
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.link}
      className={`flex items-center gap-3 rounded-[6px] p-2 text-[18px] hover:opacity-75 transition-all hover:drop-shadow-[2px] hover:bg-blue-100/50 hover:text-blue-600 ${
        pathName === item.link ? 'bg-blue-100/40 text-blue-500' : 'text-gray-500'
      }`}
    >
      <item.icon size={19} />
      <p>{item.value}</p>
    </Link>
  );
};

export default MenuItem;
