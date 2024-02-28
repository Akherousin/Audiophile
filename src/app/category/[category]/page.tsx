import AboutUs from '@/components/AboutUs';
import styles from './page.module.css';

import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Links from '@/components/Links';
import Footer from '@/components/Footer';

import { type Category } from '@/types';
import { fetchAllProducts, fetchProductsByCategory } from '@/db/queries';

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
      <Header variant="black" />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="wrapper">
            <h1 className="h2">{params.category}</h1>
          </div>
        </section>
        <section>
          <div className="wrapper">
            <ul className={styles.products}>
              {products.map(
                (
                  { id, slug, name, description, image, isNew },
                  productIndex
                ) => {
                  const isOdd = productIndex % 2 !== 0;

                  return (
                    <li key={id}>
                      <ProductCard
                        id={id}
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
          </div>
        </section>
        <section className={styles.links}>
          <div className="wrapper">
            <Links />
          </div>
        </section>
        <section className={styles.about}>
          <div className="wrapper">
            <AboutUs />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
