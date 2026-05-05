import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

import { STORE_URL } from '@/src/config/url.config';
import { ICategory } from '@/src/types/category.interface';
import { formatDateRu } from '@/src/utils/string/formatDate';

import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../dropdown-menu';

export const CategoriesColumn: ColumnDef<ICategory>[] = [
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
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8 px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Дата создания
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatDateRu(row.original.createdAt)}</div>,
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
                href={STORE_URL.categoryEdit(row.original.storeId, row.original.id)}
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
