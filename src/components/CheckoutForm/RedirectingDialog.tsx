'use client';

import paths from '@/paths';
import Button from '../Button';
import { useEffect, useRef, useState } from 'react';
import styles from './RedirectingDialog.module.css';
import SuccessSvg from './SuccessSvg';
import { formatPrice } from '@/helpers';
import { useCart } from '@/context/CartProvider';
import { useEscapeKey } from '@/hooks/use-escape-key.hook';
import router from 'next/router';
import DialogItem from './DialogItem';

type RedirectingDialogProps = {
  isDialogShown: boolean;
};

function RedirectingDialog({ isDialogShown }: RedirectingDialogProps) {
  const { cartItems, totalPrice, emptyCart } = useCart();
  const [showAllItems, setShowAllItems] = useState(false);
  const firstItem = cartItems[0];
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isDialogShown) {
      dialogRef.current?.showModal();
    }
  }, [isDialogShown]);

  const handleClick = () => {
    emptyCart();
  };

  useEscapeKey(dialogRef, (e) => {
    e.preventDefault();
    emptyCart();
    router.replace(paths.home());
  });

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="form-dialog-label"
    >
      <SuccessSvg />
      <p className={`${styles.title} | h3`} id={'form-dialog-label'}>
        Thank you for your order
      </p>
      <p className="opaque">You will receive an email confirmation shortly.</p>
      <div className={`${styles['dialog-summary']} | box overflow-hidden`}>
        <div className={styles.purchased}>
          <ul
            className={styles['purchased-list']}
            role="list"
            id="purchased-items-list"
          >
            <li>
              <DialogItem
                image={firstItem.image}
                name={firstItem.name}
                price={firstItem.price}
                quantity={firstItem.quantity}
              />
            </li>

            {showAllItems &&
              cartItems.slice(1).map((item) => (
                <li key={item.id}>
                  <DialogItem
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    quantity={item.quantity}
                  />
                </li>
              ))}
          </ul>

          {cartItems.length > 1 && (
            <button
              className={styles['show-other-button']}
              onClick={() => setShowAllItems(!showAllItems)}
              aria-controls="purchased-items-list"
              aria-expanded={showAllItems}
            >
              {showAllItems
                ? 'Show less'
                : `and ${cartItems.length - 1} other ${
                    cartItems.length - 1 === 1 ? 'item' : 'items'
                  }`}
            </button>
          )}
        </div>
        <div className={styles.total}>
          <p className={`${styles.term} | opaque`}>Grand Total</p>
          <p className={styles['bill-price']}>
            {' '}
            {formatPrice(totalPrice + 50)}
          </p>
        </div>
      </div>

      <Button
        as="link"
        variant="colored"
        href={paths.home()}
        onClick={handleClick}
      >
        Back to Home
      </Button>
    </dialog>
  );
}

export default RedirectingDialog;
