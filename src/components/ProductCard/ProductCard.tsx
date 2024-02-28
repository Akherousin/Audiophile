import paths from '@/paths';
import styles from './ProductCard.module.css';

import Button from '@/components/Button';
import Image from 'next/image';

type ProductCardProps = {
  id: number;
  headingLevel: 1 | 2;
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
  id,
  headingLevel,
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

        {headingLevel === 1 ? (
          <h1 className={`${styles.name} | h2`}>{name}</h1>
        ) : (
          <h2 className={`${styles.name} | h2`}>{name}</h2>
        )}

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
      <div className={`${styles.image} | image-wrapper box overflow-hidden`}>
        <Image src={image.desktop} alt="" width={540} height={560} priority />
      </div>
    </article>
  );
}

export default ProductCard;
