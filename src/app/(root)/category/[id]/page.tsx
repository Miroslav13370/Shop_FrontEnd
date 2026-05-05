import { Catalog } from '@/src/components/ui/catalog/Catalog';
import { SERVER_URL } from '@/src/config/api.config';
import { ICategory } from '@/src/types/category.interface';
import { IProduct } from '@/src/types/product.interface';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

type Props = {
  params: Promise<{ id: string }>;
};

const getData = async (param: string): Promise<{ products: IProduct[]; categories: ICategory }> => {
  const productsJson = await fetch(`${SERVER_URL}/api/product/by-categoryId/${param}`);
  const products = await productsJson.json();

  const categoriesJson = await fetch(`${SERVER_URL}/api/categories/by-id/${param}`);
  const categories = await categoriesJson.json();

  return { products, categories };
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const { categories, products } = await getData(id);

  return {
    title: categories.title,
    description: categories.description,
    openGraph: {
      images: [
        {
          url: returnImagesUrl(products[0].images[0]),
          with: 1000,
          height: 1000,
          alt: categories.title,
        },
      ],
    },
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { id } = await params;
  const { products, categories } = await getData(id);
  return (
    <div className="p-8">
      <Catalog
        isScroll={true}
        title={categories.title}
        description={categories.description}
        products={products}
      />
    </div>
  );
};

export default CategoryPage;
