import { MutableRefObject, useEffect } from 'react';

export function useEscapeKey<TRef extends HTMLElement>(
  ref: MutableRefObject<TRef | null> | null,
  callback: (e: KeyboardEvent, ...args: any[]) => any
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback(e);
      }
    };
    const element = ref?.current;
    element?.addEventListener('keydown', handleKeyDown);

    if (ref === null) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      element?.removeEventListener('keydown', handleKeyDown);

      if (ref === null) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [ref, callback]);
}
