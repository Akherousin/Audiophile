'use client';

import { useEscapeKey } from '@/hooks/use-escape-key.hook';
import {
  type ReactNode,
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';

type Toast = {
  id: string;
  message: string;
};

type ToastContext = {
  createToast: (message: string) => void;
  dismissToasts: () => void;
  toasts: Toast[];
};

const ToastContext = createContext<ToastContext>({} as ToastContext);

export function useToasts() {
  return useContext(ToastContext);
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const createToast = (message: string) => {
    const id = crypto.randomUUID();

    const nextToasts = [
      ...toasts,
      {
        id,
        message,
      },
    ];

    setToasts(nextToasts);
    setTimeout(
      () =>
        setToasts((prev) => {
          return prev.filter((toast) => toast.id !== id);
        }),
      1800
    );
  };

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
