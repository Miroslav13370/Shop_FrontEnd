'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { DataTable } from '@/src/components/ui/data-loading/DataTable';
import DataTableLoading from '@/src/components/ui/data-loading/DataTableLoading';
import { ProductColumns } from '@/src/components/ui/data-loading/ProductColumns';
import { STORE_URL } from '@/src/config/url.config';
import useGetProducts from '@/src/hooks/queries/products/useGetProducts';

const Products = () => {
  const params = useParams<{ storeId: string }>();

  const { productsListData, isLoadingProducts } = useGetProducts();
  return (
    <div className="p-5">
      {productsListData && !isLoadingProducts ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <Heading
              title={`Товары (${productsListData?.length ? productsListData?.length : '0'})`}
              description="Все товары нашего магазина"
            />

            <Button variant="default" className="rounded-sm bg-blue-500 text-md font-bold h-9">
              <Link
                href={STORE_URL.productCreate(params.storeId)}
                className="flex flex-row items-center gap-1"
              >
                <Plus />
                Создать
              </Link>
            </Button>
          </div>

          <DataTable columns={ProductColumns} data={productsListData} filterKey="title" />
        </>
      ) : (
        <DataTableLoading />
      )}
    </div>
  );
};

export default Products;
