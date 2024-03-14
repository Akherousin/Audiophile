'use client';

import styles from './ConfirmationDialog.module.css';
import { type ReactNode, type MutableRefObject } from 'react';
import Button from '@/components/Button';
import { useEscapeKey } from '@/hooks/use-escape-key.hook';

type ConfirmationDialogProps = {
  id: number | string;
  children: ReactNode;
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  onConfirm: (...args: any[]) => any;
};

function ConfirmationDialog({
  id,
  children,
  dialogRef,
  onConfirm,
}: ConfirmationDialogProps) {
  useEscapeKey(dialogRef, (e) => e.stopPropagation());

  return (
    <dialog
      className={`${styles.dialog} | box`}
      aria-labelledby={`${id}`}
      ref={dialogRef}
    >
      <form method="dialog">
        <article>{children}</article>
        <footer>
          <Button
            as="button"
            type="reset"
            variant="black"
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </Button>
          <Button
            as="button"
            variant="colored"
            type="submit"
            value="confirm"
            onClick={() => {
              onConfirm();
            }}
          >
            Confirm
          </Button>
        </footer>
      </form>
    </dialog>
  );
}

export default ConfirmationDialog;
