import GoBackLink from '@/components/GoBackLink';
import styles from './page.module.css';
import CheckoutForm from '@/components/CheckoutForm';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Audiophile',
};

export default function CheckoutPage() {
  return (
    <div className={styles.background}>
      <div className={`${styles.back} | wrapper`}>
        <GoBackLink />
      </div>
      <main className={`${styles.main} | wrapper`} id="main">
        <CheckoutForm />
      </main>
    </div>
  );
}
