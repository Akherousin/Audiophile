import { promises as fs } from 'fs';
import { type Product, type Category } from '@/types';
import path from 'path';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const file = path.join(process.cwd() + '/src/db/', 'data.json');
  const data = await fs.readFile(file, 'utf8');
  const products = JSON.parse(data);

  return products;
};

export const fetchProductsByCategory = async (category: Category) => {
  const products = await fetchAllProducts();
  const filteredProducts = products
    .filter((product) => product.category === category)
    .map(({ id, slug, name, description, categoryImage, isNew }) => {
      return {
        id,
        slug,
        name,
        description,
        categoryImage,
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

export const fetchProductById = async (id: number) => {
  const products = await fetchAllProducts();
  let product = products.find((product) => product.id === id) || null;

  return product;
};
