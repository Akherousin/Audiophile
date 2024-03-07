'use client';

import styles from './CartItem.module.css';
import { formatPrice } from '@/helpers';

import Image from 'next/image';
import Button from '@/components/Button';
import QuantityInput from '@/components/QuantityInput';
import { useRef } from 'react';
import { useCart } from '@/context/CartProvider';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

type CartItemProps = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
};

function CartItem({ id, image, name, price, quantity }: CartItemProps) {
  const { incrementItemQuantity, decrementItemQuantity, deleteCartItem } =
    useCart();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <li className={`${styles.item} | flex-center`}>
      <div className="image-wrapper box overflow-hidden">
        <Image src={image} alt="" width={64} height={64} />
      </div>
      <div>
        <p className={styles.name}>{name}</p>
        <p className="opaque">{formatPrice(price)}</p>
      </div>
      <QuantityInput
        productName={name}
        quantity={quantity}
        incrementQuantity={() => incrementItemQuantity(id)}
        decrementQuantity={() => {
          if (quantity === 1) {
            dialogRef.current?.showModal();
          } else {
            decrementItemQuantity(id);
          }
        }}
        size="small"
      />

      <ConfirmationDialog
        id={`dialog-label-${id}`}
        onConfirm={() => deleteCartItem(id)}
        dialogRef={dialogRef}
      >
        <p className="h6" id={`dialog-label-${id}`}>
          Remove {name} from the cart
        </p>

        <p>Are you sure you want to remove this item from the cart?</p>

        <div className={`${styles.item} | flex-center`}>
          <div className="image-wrapper box overflow-hidden">
            <Image src={image} alt="" width={64} height={64} />
          </div>
          <div>
            <p className={styles.name}>{name}</p>
            <p className="opaque">{formatPrice(price)}</p>
          </div>
        </div>
      </ConfirmationDialog>
    </li>
  );
}

export default CartItem;
