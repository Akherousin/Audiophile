'use client';

import styles from './GoBackLink.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function GoBackLink() {
  const router = useRouter();

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      className={`${styles.link} | opaque click-target-helper`}
    >
      Go Back
    </Link>
  );
}

export default GoBackLink;
