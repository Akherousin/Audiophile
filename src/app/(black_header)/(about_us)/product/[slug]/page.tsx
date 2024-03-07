import styles from './page.module.css';
import ProductDetailCard from '@/components/ProductDetailCard';
import { fetchProductBySlug } from '@/db/queries';
import { notFound } from 'next/navigation';
import GoBackLink from '@/components/GoBackLink';
import Image from 'next/image';
import Button from '@/components/Button';
import paths from '@/paths';

export default async function ProductPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const product = await fetchProductBySlug(params.slug);

  if (!product) notFound();

  const {
    id,
    name,
    shortName,
    description,
    price,
    image,
    isNew,
    features,
    includes,
    gallery,
    others,
  } = product;

  return (
    <>
      <div className={`${styles.back} | wrapper`}>
        <GoBackLink />
      </div>
      <section className="wrapper">
        <ProductDetailCard
          id={id}
          name={name}
          shortName={shortName}
          description={description}
          image={image}
          isNew={isNew}
          price={price}
          isReversed={false}
        />
      </section>
      <section className={`${styles.features} | wrapper two-columns`}>
        <div>
          <h2 className="h3">Features</h2>
          <p className="opaque">{features}</p>
        </div>

        <aside>
          <h2 className="h3">In the Box</h2>
          <ul className={`${styles.list}`}>
            {includes.map(({ item, quantity }) => {
              return (
                <li key={item}>
                  <p className={`${styles.item} | flex-center`}>
                    <span className={styles.quantity} data-selection="dark">
                      {quantity}{' '}
                      <span aria-hidden="true" data-selection="dark">
                        x
                      </span>
                    </span>

                    <span className="opaque">{item}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      <section className={`${styles.gallery} | wrapper`}>
        <div className="image-wrapper box overflow-hidden">
          <Image alt="" src={gallery.first.desktop} width={445} height={280} />
        </div>
        <div className="image-wrapper box overflow-hidden">
          <Image alt="" src={gallery.second.desktop} width={445} height={280} />
        </div>
        <div className="image-wrapper box overflow-hidden">
          <Image alt="" src={gallery.third.desktop} width={635} height={592} />
        </div>
      </section>

      <section className={`${styles.others} | wrapper`}>
        <h2 className="h3">You may also like</h2>
        <ul>
          {others.map(({ slug, name, image }) => {
            return (
              <li key={slug} className={styles.other}>
                <div className="image-wrapper box overflow-hidden">
                  <Image src={image.desktop} alt="" width={350} height={318} />
                </div>
                <h3 className="h5">{name}</h3>
                <Button
                  as={'link'}
                  href={paths.showProductPage(slug)}
                  variant="colored"
                >
                  See product <span className="visually-hidden">{name}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
