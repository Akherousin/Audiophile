'use client';
import { useCart } from '@/context/CartProvider';
import styles from './Summary.module.css';
import Image from 'next/image';
import { formatPrice } from '@/helpers';
import Button from '../Button';
import SuccessSvg from './SuccessSvg';
import { useEffect, useRef } from 'react';
import paths from '@/paths';
import { useEscapeKey } from '@/hooks/use-escape-key.hook';
import { useRouter } from 'next/navigation';

type SummaryProps = {
  showDialog: boolean;
};

function Summary({ showDialog }: SummaryProps) {
  const { cartItems, totalPrice, emptyCart } = useCart();
  const firstItem = cartItems[0];
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    }
  }, [showDialog]);

  const handleClick = () => {
    emptyCart();
  };

  useEscapeKey(dialogRef, (e) => {
    e.preventDefault();
    emptyCart();
    router.replace(paths.home());
  });

  return (
    <>
      <div className={`${styles.summary} | box`}>
        <h2 className="h6">Summary</h2>
        <ul className={styles.list}>
          {cartItems.map(({ id, image, name, quantity, price }) => (
            <li key={id} className={`${styles.item}`}>
              <div
                className={`${styles.image} | image-wrapper box overflow-hidden`}
              >
                <Image src={image} alt="" width={64} height={64} />
              </div>

              <p className={styles.name}>{name}</p>
              <p className={`${styles.price} | opaque`}>{formatPrice(price)}</p>
              <p className={`${styles.quantity} | opaque`}>
                <span className="visually-hidden">Quantity - </span>
                <span aria-hidden="true">x</span>
                {quantity}
              </p>
            </li>
          ))}
        </ul>
        <dl className={styles['bill-list']}>
          <div className={`${styles['bill-pair']} | flex-center`}>
            <dt className={`${styles.term} | opaque`}>total</dt>
            <dd className={styles['bill-price']}>{formatPrice(totalPrice)}</dd>
          </div>
          <div className={`${styles['bill-pair']} | flex-center`}>
            <dt className={`${styles.term} | opaque`}>shipping</dt>
            <dd className={styles['bill-price']}>{formatPrice(50)}</dd>
          </div>
          <div className={`${styles['bill-pair']} | flex-center`}>
            <dt className={`${styles.term} | opaque`}>VAT (included)</dt>
            <dd className={styles['bill-price']}>
              {formatPrice(totalPrice * 0.2)}
            </dd>
          </div>
          <div className={`${styles['bill-pair']} | flex-center`}>
            <dt className={`${styles.term} | opaque`}>Grand total</dt>
            <dd className={styles['bill-price']}>
              {formatPrice(totalPrice + 50)}
            </dd>
          </div>
        </dl>

        <Button as="button" variant="colored" type="submit">
          Continue & Pay
        </Button>
      </div>

      {firstItem && (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          aria-labelledby="form-dialog-label"
        >
          <SuccessSvg />
          <p className={`${styles.title} | h3`} id={'form-dialog-label'}>
            Thank you for your order
          </p>
          <p className="opaque">
            You will receive an email confirmation shortly.
          </p>
          <div className={`${styles['dialog-summary']} | box overflow-hidden`}>
            <div className={styles.purchased}>
              <div className={`${styles.item}`}>
                <div
                  className={`${styles.image} | image-wrapper box overflow-hidden`}
                >
                  <Image src={firstItem.image} alt="" width={64} height={64} />
                </div>

                <p className={styles.name}>{firstItem.name}</p>
                <p className={`${styles.price} | opaque`}>
                  {formatPrice(firstItem.price)}
                </p>
                <p className={`${styles.quantity} | opaque`}>
                  <span className="visually-hidden">Quantity - </span>
                  <span aria-hidden="true">x</span>
                  {firstItem.quantity}
                </p>
              </div>

              {cartItems.length > 2 && (
                <p className={styles.others}>
                  and {cartItems.length - 1} other item(s)
                </p>
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
      )}
    </>
  );
}

export default Summary;
