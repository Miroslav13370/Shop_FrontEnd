import type { Metadata } from 'next';

import Explorer from './Explorer';

export const metadata: Metadata = {
  title: 'Каталог товаров',
};

export default function Page() {
  return (
    <div>
      <Explorer />
    </div>
  );
}
