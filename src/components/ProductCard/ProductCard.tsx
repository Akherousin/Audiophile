import paths from '@/paths';
import styles from './ProductCard.module.css';

import Button from '@/components/Button';
import Source from '@/components/Source';
import Image from 'next/image';

type ProductCardProps = {
  slug: string;
  name: string;
  description: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  isNew: boolean;
  isReversed: boolean;
};

function ProductCard({
  slug,
  name,
  description,
  image,
  isNew,
  isReversed,
}: ProductCardProps) {
  return (
    <article className={`two-columns`} data-reversed-columns={isReversed}>
      <div className={`info`}>
        {isNew && (
          <p className="overline" data-selection="dark">
            New product
          </p>
        )}
        <h2 className={`${styles.name} | h2`}>{name}</h2>
        <p className="description opaque">{description}</p>
        <Button
          as="link"
          variant="colored"
          href={paths.showProductPage(slug)}
          className={styles.link}
        >
          See Product <span className="visually-hidden">name</span>
        </Button>
      </div>
      <picture className={`image-wrapper box overflow-hidden background-grey`}>
        <Source src={image.mobile} media="(max-width: 600px)" />
        <Source src={image.tablet} media="(max-width: 800px)" />
        <Image src={image.desktop} alt="" width={540} height={560} priority />
      </picture>
    </article>
  );
}

export default ProductCard;
