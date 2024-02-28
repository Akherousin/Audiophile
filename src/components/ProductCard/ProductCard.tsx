import paths from '@/paths';
import styles from './ProductCard.module.css';

import Button from '@/components/Button';
import Image from 'next/image';

type ProductCardProps = {
  id: number;
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
  slug,
  name,
  description,
  image,
  isNew,
  isReversed,
}: ProductCardProps) {
  return (
    <article className={`two-columns`} data-reversed-columns={isReversed}>
      <div className={`${styles.image} | image-wrapper box overflow-hidden`}>
        <Image src={image.desktop} alt="" width={540} height={560} />
      </div>
      <div className={`info`}>
        {isNew && <p className="overline">New product</p>}
        <h2 className={styles.name}>{name}</h2>
        <p className="description">{description}</p>
        <Button
          as="link"
          variant="colored"
          href={paths.showProductPage(slug)}
          className={styles.link}
        >
          See Product
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
