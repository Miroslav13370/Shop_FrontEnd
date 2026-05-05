import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants';

import CreateColor from './CreateColor';

export const metadata: Metadata = {
  title: 'Создание товара',
  ...NO_INDEX_PAGE,
};

export default function CreateProductPage() {
  return (
    <div>
      <CreateColor />
    </div>
  );
}
