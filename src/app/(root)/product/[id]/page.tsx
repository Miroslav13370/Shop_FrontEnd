import { notFound } from 'next/navigation';

import { SERVER_URL } from '@/src/config/api.config';
import { IProduct } from '@/src/types/product.interface';
import { returnImagesUrl } from '@/src/utils/url/returnImagesUrl';

import Product from './Product';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const allProductsJson = await fetch(`${SERVER_URL}/api/product`);
  const data: IProduct[] = await allProductsJson.json();

  const paths = data.map((product) => {
    return {
      params: product.id,
    };
  });
  return paths;
}

const getData = async (
  param: string,
): Promise<{ product: IProduct; similarProducts: IProduct[] }> => {
  try {
    const productJson = await fetch(`${SERVER_URL}/api/product/by-id/${param}`);
    const product = await productJson.json();

    const similarProductsJSON = await fetch(`${SERVER_URL}/api/product/similar/${param}`);
    const similarProducts = await similarProductsJSON.json();

    return { product, similarProducts };
  } catch {
    return notFound();
  }
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const { product } = await getData(id);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [
        {
          url: returnImagesUrl(product.images[0]),
          with: 1000,
          height: 1000,
          alt: product.title,
        },
      ],
    },
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { id } = await params;
  const { product, similarProducts } = await getData(id);
  return <Product initialProduct={product} similarProducts={similarProducts} id={id} />;
};

export default CategoryPage;
