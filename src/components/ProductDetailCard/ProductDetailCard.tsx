'use client';

import styles from './ProductDetailCard.module.css';

import Button from '@/components/Button';
import { useCart } from '@/context/CartProvider';
import Image from 'next/image';
import { type FormEvent, useState, useEffect } from 'react';
import QuantityInput from '@/components/QuantityInput';

import { formatPrice } from '@/helpers';

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
  };
  isNew: boolean;
  isReversed: boolean;
};

function ProductDetailCard({
  id,
  name,
  shortName,
  description,
  price,
  image,
  isNew,
  isReversed,
}: ProductDetailCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useCart();

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
  };

  return (
    <article className={`two-columns`} data-reversed-columns={isReversed}>
      <div className={`info`}>
        {isNew && (
          <p className="overline" data-selection="dark">
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
      <div className={`image-wrapper box overflow-hidden background-grey`}>
        <Image src={image.desktop} alt="" width={540} height={560} priority />
      </div>
    </article>
  );
}

export default ProductDetailCard;
