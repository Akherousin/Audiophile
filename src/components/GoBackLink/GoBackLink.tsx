'use client';

import paths from '@/paths';
import styles from './GoBackLink.module.css';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function GoBackLink() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let isFirstVisit = false;

  if (typeof window !== 'undefined') {
    isFirstVisit = sessionStorage.getItem('isFirstVisit') === null;
  }
  const goToHomePage = searchParams.get('updated') === 'true';

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        sessionStorage.setItem('isFirstVisit', 'false');
        if (isFirstVisit) return router.push(paths.home());
        if (goToHomePage) {
          return router.push(paths.home());
        } else {
          return router.back();
        }
      }}
      className={`${styles.link} | opaque click-target-helper`}
    >
      Go Back
    </Link>
  );
}

function SuspensedGoBackLink() {
  return (
    <Suspense fallback={null}>
      <GoBackLink />
    </Suspense>
  );
}

export default SuspensedGoBackLink;
