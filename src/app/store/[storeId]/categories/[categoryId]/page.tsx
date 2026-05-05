import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants';

import EditCategory from './EditCategory';

export const metadata: Metadata = {
  title: 'Редактирование цвета',
  ...NO_INDEX_PAGE,
};

export default function EditColorPage() {
  return (
    <div>
      <EditCategory />
    </div>
  );
}
