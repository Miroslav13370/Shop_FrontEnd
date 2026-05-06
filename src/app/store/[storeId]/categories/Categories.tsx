'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { CategoriesColumn } from '@/src/components/ui/data-loading/CategoriesColumn';
import { DataTable } from '@/src/components/ui/data-loading/DataTable';
import DataTableLoading from '@/src/components/ui/data-loading/DataTableLoading';
import { STORE_URL } from '@/src/config/url.config';
import useGetCategories from '@/src/hooks/queries/categories/useGetCategories';

const Categories = () => {
  const params = useParams<{ storeId: string }>();

  const { categoryListData, isLoadingCategory } = useGetCategories();
  console.log(categoryListData);
  return (
    <div className="p-5">
      {categoryListData && !isLoadingCategory ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <Heading
              title={`Категории (${categoryListData?.length ? categoryListData?.length : '0'})`}
              description="Все категории нашего магазина"
            />

            <Button variant="default" className="rounded-sm bg-blue-500 text-md font-bold h-9">
              <Link
                href={STORE_URL.categoryCreate(params.storeId)}
                className="flex flex-row items-center gap-1"
              >
                <Plus />
                Создать
              </Link>
            </Button>
          </div>

          <DataTable columns={CategoriesColumn} data={categoryListData} filterKey="title" />
        </>
      ) : (
        <DataTableLoading />
      )}
    </div>
  );
};

export default Categories;
