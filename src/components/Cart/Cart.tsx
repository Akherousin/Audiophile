'use client';

import CartSvg from './CartSvg';
import styles from './Cart.module.css';
import { useCart } from '@/context/CartProvider';
import Button from '@/components/Button';
import paths from '@/paths';

import { formatPrice } from '@/helpers';
import CartItem from './CartItem';
import { useRef, useState } from 'react';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { useTrapFocus } from '@/hooks/use-trap-focus.hook';
import { useEscapeKey } from '@/hooks/use-escape-key.hook';
import { useOnClickOutside } from '@/hooks/use-on-click-outside.hook';
import { useToasts } from '@/context/ToastProvider';

import { motion, AnimatePresence } from 'framer-motion';

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, cartSize, totalPrice, emptyCart } = useCart();
  const { createToast } = useToasts();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const cartWrapperRef = useRef<HTMLDivElement | null>(null);

  const closeCart = () => {
    setIsOpen(false);
  };

  useTrapFocus(cartWrapperRef, isOpen);
  useEscapeKey(cartWrapperRef, closeCart);
  useOnClickOutside(cartWrapperRef, closeCart);

  return (
    <div ref={cartWrapperRef}>
      <button
        className={`${styles.cart} | click-target-helper`}
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="cart-dropdown"
        aria-expanded={isOpen}
      >
        <CartSvg />
        <span className="visually-hidden">
          {cartSize}
          {cartSize === 1 ? 'item' : 'items'}
          in Cart
        </span>
        {cartSize > 0 && (
          <span className={styles.size} aria-hidden="true">
            {cartSize}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.article
            className={`${styles.dropdown} | box overflow-hidden`}
            id="cart-dropdown"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: {
                height: {
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 350,
                  damping: 40,
                  restDelta: 0.01,
                },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  restDelta: 0.01,
                },
              },
            }}
          >
            <div>
              <header className="flex-center">
                <h2 className="h6">Cart ({cartSize})</h2>
                <button
                  className={`${styles.remove} | click-target-helper`}
                  onClick={() => dialogRef.current?.showModal()}
                >
                  Remove all
                </button>
              </header>

              <ConfirmationDialog
                id="dialog-label-remove-all"
                dialogRef={dialogRef}
                onConfirm={() => {
                  emptyCart();
                  createToast(`Removed all items from the cart`);
                }}
              >
                <p className="h6" id={`dialog-label-remove-all`}>
                  Remove all items from the cart
                </p>

                <p>Are you sure you want to remove all items from the cart?</p>
              </ConfirmationDialog>

              <ul className={styles.list}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    image={item.image}
                    price={item.price}
                  />
                ))}
              </ul>

              <p className={`${styles.total} | flex-center`}>
                <span>Total</span> <span>{formatPrice(totalPrice)}</span>
              </p>
              <Button
                as={'link'}
                href={paths.showCheckoutPage()}
                variant="colored"
                onClick={() => closeCart()}
              >
                Checkout
              </Button>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;
