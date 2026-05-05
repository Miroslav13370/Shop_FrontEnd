import Link from 'next/link';

import { ICatalog } from './catalog.interface';
import { ProductCard } from './product-card/ProductCard';

export const Catalog = ({ title, description, linkTitle, link, products, isScroll }: ICatalog) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-sm text-black/60">{description}</p>}
        </div>
        {link && linkTitle && (
          <Link href={link} className="text-blue-500 text-sm">
            {linkTitle}
          </Link>
        )}
      </div>

      <div>
        <div className={`flex items-center ${isScroll ? 'flex-wrap' : 'overflow-auto'} gap-5`}>
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div>Ничего не найдено</div>
          )}
        </div>
      </div>
    </div>
  );
};
