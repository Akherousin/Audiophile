'use client';

import { useToasts } from '@/context/ToastProvider';
import React, { useEffect, useRef } from 'react';
import styles from './ToastShelf.module.css';
import SuccessSvg from './SuccessSvg';
import { useEscapeKey } from '@/hooks/use-escape-key.hook';

function ToastShelf() {
  const { toasts, dismissToasts } = useToasts();

  useEscapeKey(null, dismissToasts);

  return (
    <ol
      role="status"
      aria-live="polite"
      aria-label="Notification"
      className={styles.toasts}
    >
      {toasts.map((toast) => (
        <li key={toast.id}>
          <div className={`${styles.toast} | box flex-center overflow-hidden`}>
            <SuccessSvg />
            {toast.message}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
