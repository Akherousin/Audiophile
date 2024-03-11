import { useEffect } from 'react';

export function useMakeInert(isActive: boolean) {
  useEffect(() => {
    const main = document.querySelector('body > main');
    const footer = document.querySelector('body > footer');

    if (isActive) {
      main?.setAttribute('inert', 'true');
      footer?.setAttribute('inert', 'true');
    } else {
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
    }

    return () => {
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
    };
  }, [isActive]);
}
