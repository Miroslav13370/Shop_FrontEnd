'use client';

import { useGetProfileQuery } from '@/src/api/user/userApi';
import { Catalog } from '@/src/components/ui/catalog/Catalog';

const Favorites = () => {
  const { data } = useGetProfileQuery();

  if (!data) return null;

  return (
    <div className="p-8">
      <Catalog title="Избранное" products={data.favorites} isScroll={false} />
    </div>
  );
};

export default Favorites;
