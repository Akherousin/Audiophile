import GoBackLink from '@/components/GoBackLink';
import styles from './page.module.css';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className={styles.background}>
      <div className={`${styles.back} | wrapper`}>
        <GoBackLink />
      </div>
      <main className={`${styles.main} | wrapper`}>
        <CheckoutForm />
      </main>
    </div>
  );
}
