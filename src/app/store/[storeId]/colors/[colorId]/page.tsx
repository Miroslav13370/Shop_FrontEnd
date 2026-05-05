import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants';

import EditColor from './EditColor';

export const metadata: Metadata = {
  title: 'Редактирование цвета',
  ...NO_INDEX_PAGE,
};

export default function EditColorPage() {
  return (
    <div>
      <EditColor />
    </div>
  );
}
