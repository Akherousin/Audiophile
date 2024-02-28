import { promises as fs } from 'fs';
import { type Product, type Category } from '@/types';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const data = await fs.readFile(process.cwd() + '/src/db/data.json', 'utf8');
  const products = JSON.parse(data);

  return products;
};

export const fetchProductsByCategory = async (category: Category) => {
  const products = await fetchAllProducts();
  const filteredProducts = products
    .filter((product) => product.category === category)
    .map(({ id, slug, name, description, image, isNew }) => {
      return {
        id,
        slug,
        name,
        description,
        image,
        isNew,
      };
    })
    .reverse();

  return filteredProducts;
};

export const fetchProductBySlug = async (slug: string) => {
  const products = await fetchAllProducts();
  let product = products.find((product) => product.slug == slug) || null;

  return product;
};
