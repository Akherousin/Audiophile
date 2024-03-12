import styles from './page.module.css';
import ProductDetailCard from '@/components/ProductDetailCard';
import { fetchProductBySlug } from '@/db/queries';
import { notFound } from 'next/navigation';
import GoBackLink from '@/components/GoBackLink';
import Image from 'next/image';
import Button from '@/components/Button';
import paths from '@/paths';
import Source from '@/components/Source';
import { QUERIES } from '@/constants';

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
        />
      </section>
      <section className={`${styles.features} | wrapper`}>
        <div>
          <h2 className="h3">Features</h2>
          <p className="opaque">{features}</p>
        </div>

        <aside className={styles.aside}>
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
        <picture className="image-wrapper box overflow-hidden">
          <Source src={gallery.first.mobile} media={QUERIES.phoneAndSmaller} />
          <Source src={gallery.first.tablet} media={QUERIES.tabletAndSmaller} />
          <Image
            alt={gallery.first.alt}
            src={gallery.first.desktop}
            width={445}
            height={280}
          />
        </picture>
        <picture className="image-wrapper box overflow-hidden">
          <Source src={gallery.second.mobile} media={QUERIES.phoneAndSmaller} />
          <Source
            src={gallery.second.tablet}
            media={QUERIES.tabletAndSmaller}
          />
          <Image
            alt={gallery.second.alt}
            src={gallery.second.desktop}
            width={445}
            height={280}
          />
        </picture>
        <picture className="image-wrapper box overflow-hidden">
          <Source src={gallery.third.mobile} media={QUERIES.phoneAndSmaller} />
          <Source src={gallery.third.tablet} media={QUERIES.tabletAndSmaller} />
          <Image
            alt={gallery.third.alt}
            src={gallery.third.desktop}
            width={635}
            height={592}
          />
        </picture>
      </section>

      <section className={`${styles.others} | wrapper`}>
        <h2 className="h3">You may also like</h2>
        <ul>
          {others.map(({ slug, name, image }) => {
            return (
              <li key={slug} className={styles.other}>
                <picture className="image-wrapper box overflow-hidden">
                  <Source src={image.mobile} media={QUERIES.phoneAndSmaller} />
                  <Source src={image.tablet} media={QUERIES.tabletAndSmaller} />
                  <Image src={image.desktop} alt="" width={350} height={318} />
                </picture>
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
