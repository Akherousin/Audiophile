import { formatPrice } from '@/helpers';
import styles from './DialogItem.module.css';
import Image from 'next/image';

type DialogItemProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
};

function DialogItem({ image, name, price, quantity }: DialogItemProps) {
  return (
    <div className={`${styles.item}`}>
      <div className={`${styles.image} | image-wrapper box overflow-hidden`}>
        <Image src={image} alt="" width={64} height={64} />
      </div>

      <p className={styles.name}>{name}</p>
      <p className={`${styles.price} | opaque`}>{formatPrice(price)}</p>
      <p className={`${styles.quantity} | opaque`}>
        <span className="visually-hidden">Quantity - </span>
        <span aria-hidden="true">x</span>
        {quantity}
      </p>
    </div>
  );
}

export default DialogItem;
