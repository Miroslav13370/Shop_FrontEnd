import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/src/constants/seo.constants';

import Colors from './Colors';

export const metadata: Metadata = {
  title: 'Цвета',
  ...NO_INDEX_PAGE,
};

export default function ProductsPage() {
  return (
    <div>
      <Colors />
    </div>
  );
}
