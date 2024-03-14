import { type HTMLInputAutoCompleteAttribute } from 'react';
import styles from './Input.module.css';
import { AnimatePresence, motion } from 'framer-motion';

type VariantInputProps =
  | {
      type?: 'text' | 'email' | 'tel';
      errors: string[];
      checked?: undefined;
      autoComplete?: HTMLInputAutoCompleteAttribute;
      inputMode?:
        | 'text'
        | 'email'
        | 'tel'
        | 'search'
        | 'url'
        | 'none'
        | 'numeric'
        | 'decimal';
    }
  | {
      type: 'radio';
      checked: boolean;
      errors?: undefined;
      autoComplete?: undefined;
      placeholder?: undefined;
      inputMode?: undefined;
    };

type InputProps = VariantInputProps & {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  describedby?: string;
};

function Input({
  type = 'text',
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  errors,
  checked,
  autoComplete,
  inputMode = 'text',
  describedby,
}: InputProps) {
  if (type === 'text' || type === 'email' || type === 'tel')
    return (
      <div className={styles.field}>
        <label
          htmlFor={name}
          className={`${styles.label} | small-text`}
          data-invalid={errors && errors.length > 0 ? 'true' : undefined}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          required={true}
          aria-invalid={errors && errors.length > 0 ? 'true' : undefined}
          aria-describedby={`${id}-error-message ${
            describedby ? describedby : ''
          }`}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={styles.input}
        />
        <p
          id={`${id}-error-message`}
          aria-live="assertive"
          className={`${styles.error} | small-text`}
        >
          <AnimatePresence>
            {errors && errors.length > 0 && (
              <motion.span
                initial={{
                  y: '100%',
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: '100%',
                  opacity: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  restDelta: 0.01,
                }}
                style={{
                  display: 'block',
                }}
              >
                {errors[0]}
              </motion.span>
            )}
          </AnimatePresence>
        </p>
      </div>
    );

  if (type === 'radio')
    return (
      <div>
        <label
          htmlFor={id}
          className={`${styles.radio} | flex-center small-text`}
          data-checked={checked}
        >
          <span className={styles.checkmark}>
            {checked && (
              <motion.span
                className={styles.circle}
                layoutId="radio-circle"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  restDelta: 0.01,
                }}
              />
            )}
          </span>
          <input
            id={id}
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
            aria-describedby={describedby}
            className={styles['radio-input']}
          />
          {label}
        </label>
      </div>
    );
}

const SPRING = {};

export default Input;
