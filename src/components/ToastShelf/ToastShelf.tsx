'use client';

import { useToasts } from '@/context/ToastProvider';
import styles from './ToastShelf.module.css';
import SuccessSvg from './SuccessSvg';
import { useEscapeKey } from '@/hooks/use-escape-key.hook';
import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.li
            key={toast.id}
            initial={{
              x: '150%',
            }}
            animate={{
              x: '0',
            }}
            exit={{
              x: '150%',
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              restDelta: 0.01,
            }}
          >
            <div
              className={`${styles.toast} | box flex-center overflow-hidden`}
            >
              <SuccessSvg />
              {toast.message}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  );
}

export default ToastShelf;
