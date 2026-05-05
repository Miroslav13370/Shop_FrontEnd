import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

import { PUBLIC_URL, STORE_URL } from '@/src/config/url.config';
import { IProduct } from '@/src/types/product.interface';
import { formatPrice } from '@/src/utils/string/format-price';

import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../dropdown-menu';

export const ProductColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Название
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Цена
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatPrice(row.original.price)}</div>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Категория
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.category?.title}</div>,
  },
  {
    accessorKey: 'color',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Цвет
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex gap-3">
        {row.original.color?.name}
        <div
          className="size-5 rounded-full border"
          style={{
            backgroundColor: row.original.color?.value,
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: () => <div className="flex justify-center">Действия</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={PUBLIC_URL.product(row.original.id)}
                className="flex text-md items-center whitespace-nowrap"
              >
                <ExternalLink className="size-4 mr-2" />
                Страница с продуктом
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={STORE_URL.productEdit(row.original.store?.id, row.original.id)}
                className="flex text-md items-center whitespace-nowrap"
              >
                <Pencil className="size-4 mr-2" />
                Изменить
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
