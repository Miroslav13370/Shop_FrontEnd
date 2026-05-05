'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { PUBLIC_URL } from '@/src/config/url.config';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  return (
    <div className="flex w-120 ">
      <Input
        placeholder="Поиск товаров"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-sm rounded-tr-none rounded-br-none w-full"
      />
      <Button
        variant="primary"
        onClick={() => router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))}
        className="rounded-sm rounded-tl-none rounded-bl-none border-blue-500 hover:border-blue-400"
      >
        <Search className="text-white" />
      </Button>
    </div>
  );
};

export default SearchInput;
