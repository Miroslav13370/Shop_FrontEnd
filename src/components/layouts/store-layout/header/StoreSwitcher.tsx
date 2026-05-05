'use client';

import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetStoreByOwnerQuery } from '@/src/api/store/storeApi';
import { Button } from '@/src/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/src/components/ui/command';
import CreateStoreModal from '@/src/components/ui/modals/CreateStoreModal';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { STORE_URL } from '@/src/config/url.config';
import { IStore } from '@/src/types/store.interface';

const StoreSwitcher = () => {
  const { data } = useGetStoreByOwnerQuery();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onStoreSelect = (itemStore: IStore) => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}${STORE_URL.home(itemStore.id)}`);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Выберите магазин"
        >
          <StoreIcon className="" />
          Текущий магазин
          <ChevronsUpDown className="opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Найти магазин..." />
          <CommandSeparator className="mt-2" />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup heading="Магазины">
              {data
                ? data.map((item) => (
                    <CommandItem key={item.id} onSelect={() => onStoreSelect(item)}>
                      <StoreIcon />
                      <div className="line-clamp-1">{item.title}</div>
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
          </CommandList>
          <CommandSeparator className="mb-1.5" />
          <CommandList>
            <CommandGroup>
              <CreateStoreModal closeFunc={setOpen}>
                <CommandItem>
                  <Plus /> Создать магазин
                </CommandItem>
              </CreateStoreModal>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
