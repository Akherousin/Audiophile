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

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, cartSize, totalPrice, emptyCart } = useCart();
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

      <article
        className={`${styles.dropdown} | box`}
        hidden={!isOpen}
        id="cart-dropdown"
      >
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
          onConfirm={() => emptyCart()}
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
      </article>
    </div>
  );
}

export default Cart;
