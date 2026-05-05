'use client';

import { Album, BarChart, FolderKanban, PaintBucket, Settings, Star } from 'lucide-react';
import { useParams } from 'next/navigation';

import { STORE_URL } from '@/src/config/url.config';

import MenuItem from './MenuItem';
import { IMenuItem } from './menu.interface';

const Navigation = () => {
  const params = useParams<{ storeId: string }>();

  const router: IMenuItem[] = [
    {
      icon: BarChart,
      link: STORE_URL.home(params.storeId),
      value: 'Статистика',
    },
    {
      icon: FolderKanban,
      link: STORE_URL.products(params.storeId),
      value: 'Товары',
    },
    {
      icon: Album,
      link: STORE_URL.categories(params.storeId),
      value: 'Категории',
    },
    {
      icon: PaintBucket,
      link: STORE_URL.colors(params.storeId),
      value: 'Цвета',
    },
    {
      icon: Star,
      link: STORE_URL.reviews(params.storeId),
      value: 'Отзывы',
    },
    {
      icon: Settings,
      link: STORE_URL.settings(params.storeId),
      value: 'Настройки магазина',
    },
  ];

  return (
    <div>
      <div className="flex flex-col mt-5 gap-2">
        {router.map((item) => (
          <MenuItem key={item.value} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
