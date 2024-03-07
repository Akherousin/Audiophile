import styles from './QuantityInput.module.css';

type QuantityInputProps = {
  productName: string;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  size: 'small' | 'big';
};

function QuantityInput({
  productName,
  quantity,
  incrementQuantity,
  decrementQuantity,
  size,
}: QuantityInputProps) {
  return (
    <div
      className={`${styles.input} | flex-center subtitle background-grey`}
      data-size={size}
    >
      <output htmlFor="decrement-button increment-button">
        <span className="visually-hidden">Current quantity {productName} </span>
        {quantity}
      </output>
      <button
        type="button"
        id="decrement-button"
        onClick={decrementQuantity}
        className="click-target-helper"
      >
        <span className="visually-hidden">
          Decrease quantity {productName}, current quantity {quantity}
        </span>
        <span aria-hidden="true">-</span>
      </button>
      <button
        type="button"
        id="increment-button"
        onClick={incrementQuantity}
        className="click-target-helper"
      >
        <span className="visually-hidden">
          {' '}
          Increase quantity {productName}, current quantity {quantity}
        </span>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export default QuantityInput;
