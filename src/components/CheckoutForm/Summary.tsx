'use client';
import { useCart } from '@/context/CartProvider';
import styles from './Summary.module.css';
import Image from 'next/image';
import { formatPrice } from '@/helpers';
import Button from '../Button';
import RedirectingDialog from './RedirectingDialog';

type SummaryProps = {
  showDialog: boolean;
};

function Summary({ showDialog }: SummaryProps) {
  const { cartItems, totalPrice } = useCart();

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

      {cartItems.length > 0 && <RedirectingDialog isDialogShown={showDialog} />}
    </>
  );
}

export default Summary;
