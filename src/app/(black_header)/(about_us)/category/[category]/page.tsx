import styles from './page.module.css';

import ProductCard from '@/components/ProductCard';

import { type Category } from '@/types';
import { fetchProductsByCategory } from '@/db/queries';

export default async function CategoryPage({
  params,
}: {
  params: {
    category: Category;
  };
}) {
  const products = await fetchProductsByCategory(params.category);

  return (
    <>
      <section className={styles.hero}>
        <div className="wrapper">
          <h1 className="h2">{params.category}</h1>
        </div>
      </section>

      <section className="wrapper">
        <ul className={styles.products}>
          {products.map(
            ({ id, slug, name, description, image, isNew }, productIndex) => {
              const isOdd = productIndex % 2 !== 0;

              return (
                <li key={id}>
                  <ProductCard
                    id={id}
                    headingLevel={1}
                    slug={slug}
                    name={name}
                    description={description}
                    image={image}
                    isNew={isNew}
                    isReversed={isOdd}
                  />
                </li>
              );
            }
          )}
        </ul>
      </section>
    </>
  );
}
