import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants';

import EditCategory from './CreateCategory';

export const metadata: Metadata = {
  title: 'Создание категории',
  ...NO_INDEX_PAGE,
};

export default function CreateProductPage() {
  return (
    <div>
      <EditCategory />
    </div>
  );
}
