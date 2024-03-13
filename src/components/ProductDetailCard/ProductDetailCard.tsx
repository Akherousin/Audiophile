'use client';

import styles from './ProductDetailCard.module.css';

import Button from '@/components/Button';
import { useCart } from '@/context/CartProvider';
import Image from 'next/image';
import { type FormEvent, useState, useEffect } from 'react';
import QuantityInput from '@/components/QuantityInput';

import { formatPrice } from '@/helpers';
import Source from '../Source';
import { QUERIES } from '@/constants';
import { useToasts } from '@/context/ToastProvider';

type ProductDetailCardProps = {
  id: number;
  name: string;
  shortName: string;
  price: number;
  description: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
    alt: string;
  };
  isNew: boolean;
};

function ProductDetailCard({
  id,
  name,
  shortName,
  description,
  price,
  image,
  isNew,
}: ProductDetailCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useCart();
  const { createToast } = useToasts();

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    const nextCount = quantity === 1 ? quantity : quantity - 1;
    setQuantity(nextCount);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCartItem({
      id,
      price,
      quantity,
      name: shortName,
      image: image.mobile,
    });
    createToast(
      `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to the cart`
    );
  };

  return (
    <article className={`${styles.card} | two-columns`}>
      <div className={`info`}>
        {isNew && (
          <p className={`${styles.overline} | overline`} data-selection="dark">
            New product
          </p>
        )}

        <h1 className={`${styles.name} | h2`}>{name}</h1>

        <p className="description opaque">{description}</p>

        <p className={`${styles.price} | h6`}>
          <span className="visually-hidden">price: </span>
          {formatPrice(price)}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <QuantityInput
            productName={name}
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            size="big"
          />

          <Button as="button" variant="colored" type="submit">
            Add to Cart
          </Button>
        </form>
      </div>
      <picture className={`image-wrapper box overflow-hidden background-grey`}>
        <Source src={image.mobile} media={QUERIES.phoneAndSmaller} />
        <Source src={image.tablet} media={QUERIES.tabletAndSmaller} />
        <Image
          src={image.desktop}
          alt={image.alt}
          width={540}
          height={560}
          priority
        />
      </picture>
    </article>
  );
}

export default ProductDetailCard;
