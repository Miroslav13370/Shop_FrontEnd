'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Heading } from '@/src/components/ui/Heading';
import { Button } from '@/src/components/ui/button';
import { ColorColumns } from '@/src/components/ui/data-loading/ColorColumns';
import { DataTable } from '@/src/components/ui/data-loading/DataTable';
import DataTableLoading from '@/src/components/ui/data-loading/DataTableLoading';
import { STORE_URL } from '@/src/config/url.config';
import useGetColor from '@/src/hooks/queries/colors/useGetColors';

const Colors = () => {
  const params = useParams<{ storeId: string }>();

  const { colorListData, isLoadingColor } = useGetColor();
  return (
    <div className="p-5">
      {colorListData && !isLoadingColor ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <Heading
              title={`Цвета (${colorListData?.length ? colorListData?.length : '0'})`}
              description="Все Цвета нашего магазина"
            />

            <Button variant="default" className="rounded-sm bg-blue-500 text-md font-bold h-9">
              <Link
                href={STORE_URL.colorCreate(params.storeId)}
                className="flex flex-row items-center gap-1"
              >
                <Plus />
                Создать
              </Link>
            </Button>
          </div>

          <DataTable columns={ColorColumns} data={colorListData} filterKey="name" />
        </>
      ) : (
        <DataTableLoading />
      )}
    </div>
  );
};

export default Colors;
