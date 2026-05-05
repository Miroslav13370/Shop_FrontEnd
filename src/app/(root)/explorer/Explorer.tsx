'use client';

import { useSearchParams } from 'next/navigation';

import { useGetAllProductsQuery } from '@/src/api/product/productApi';
import { Catalog } from '@/src/components/ui/catalog/Catalog';

const Explorer = () => {
  const searchParam = useSearchParams();

  const searchTerm = searchParam.get('searchTerm');

  const { data } = useGetAllProductsQuery(searchTerm ? searchTerm : '');

  return (
    <div className="p-8">
      <Catalog
        title={searchTerm ? `Поиск по запросу "${searchTerm}"` : 'Каталог товаров'}
        products={data ? data : []}
        isScroll={true}
      />
    </div>
  );
};

export default Explorer;
