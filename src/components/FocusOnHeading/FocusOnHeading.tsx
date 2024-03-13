'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePreviousPath } from '@/hooks/use-previous-path.hook';

function FocusOnHeading() {
  const pathname = usePathname();
  const prevPath = usePreviousPath();

  useEffect(() => {
    if (!prevPath || window.location.hash) return;

    const heading = document.querySelector('h1');
    const main = document.querySelector('main');

    main?.removeAttribute('inert');

    if (!heading) return;
    heading.tabIndex = -1;

    heading.focus();
    console.log('focused');
  }, [pathname, prevPath]);

  return <></>;
}

export default FocusOnHeading;
