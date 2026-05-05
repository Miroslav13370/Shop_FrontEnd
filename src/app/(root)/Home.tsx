'use client';

import { useGetMostPopularProductsQuery } from '@/src/api/product/productApi';
import { Catalog } from '@/src/components/ui/catalog/Catalog';
import { PUBLIC_URL } from '@/src/config/url.config';

import Hero from './hero/hero';

const Home = () => {
  const { data } = useGetMostPopularProductsQuery();
  return (
    <div>
      <Hero />
      <div className="p-8">
        <Catalog
          title="Хиты продаж"
          description="Самые популярные товары нашего магазина"
          linkTitle="Узнать больше"
          link={PUBLIC_URL.explorer()}
          products={data ? data : []}
        />
      </div>
    </div>
  );
};

export default Home;
