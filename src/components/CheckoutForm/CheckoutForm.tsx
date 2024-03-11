'use client';

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useReducer,
  useEffect,
  useState,
  useRef,
} from 'react';
import styles from './CheckoutForm.module.css';
import Input from './Input';
import Link from 'next/link';
import CashSvg from './CashSvg';
import Summary from './Summary';
import { useCart } from '@/context/CartProvider';

type StateWithoutErrors = Omit<typeof initialState, 'errors'>;
type FieldName = keyof StateWithoutErrors;
type StateError = {
  inputId: string;
  message: string;
  label: string;
};

type FormAction =
  | { type: 'RESET_STATE' }
  | {
      type: 'CHANGE_VALUE';
      payload: {
        name: FieldName;
        value: string;
      };
    }
  | {
      type: 'ADD_ERROR_MESSAGE' | 'REMOVE_ERROR_MESSAGE';
      payload: {
        inputId: string;
        message: string;
        label: string;
      };
    }
  | {
      type: 'REMOVE_ALL_ERRORS_FOR_FIELD';
      payload: {
        inputId: string;
      };
    };

const initialState = {
  name: {
    value: '',
    isUserTyped: false,
  },
  phone: {
    value: '',
    isUserTyped: false,
  },
  email: {
    value: '',
    isUserTyped: false,
  },
  address: {
    value: '',
    isUserTyped: false,
  },
  'zip-code': {
    value: '',
    isUserTyped: false,
  },
  city: {
    value: '',
    isUserTyped: false,
  },
  country: {
    value: '',
    isUserTyped: false,
  },
  'payment-method': {
    value: 'e-money',
    isUserTyped: false,
  },
  'e-money-number': {
    value: '',
    isUserTyped: false,
  },
  'e-money-pin': {
    value: '',
    isUserTyped: false,
  },
  errors: [] as StateError[],
};

function reducer(state: typeof initialState, action: FormAction) {
  switch (action.type) {
    case 'RESET_STATE': {
      return initialState;
    }

    case 'CHANGE_VALUE': {
      const { name } = action.payload;

      return {
        ...state,
        [name]: { value: action.payload.value, isUserTyped: true },
      };
    }

    case 'ADD_ERROR_MESSAGE': {
      const { message, inputId, label } = action.payload;

      const inputError = state.errors.find(
        (error) => error.inputId === inputId && error.message === message
      );
      // Error already exist
      if (inputError) return state;

      return {
        ...state,
        errors: [
          ...state.errors,
          {
            inputId,
            label,
            message,
          },
        ],
      };
    }

    case 'REMOVE_ERROR_MESSAGE': {
      const { inputId, message } = action.payload;
      const { errors } = state;

      return {
        ...state,
        errors: errors.filter(
          (error) => error.inputId !== inputId && error.message !== message
        ),
      };
    }

    case 'REMOVE_ALL_ERRORS_FOR_FIELD': {
      const { inputId } = action.payload;

      return {
        ...state,
        errors: state.errors.filter((error) => error.inputId !== inputId),
      };
    }

    default:
      return state;
  }
}

function CheckoutForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [showRedirectingDialog, setShowRedirectingDialog] = useState(false);

  const errorSummaryHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const { errors } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as FieldName;

    if (name === 'payment-method' && e.target.value === 'cash') {
      dispatch({
        type: 'REMOVE_ALL_ERRORS_FOR_FIELD',
        payload: {
          inputId: 'e-money-number',
        },
      });

      dispatch({
        type: 'REMOVE_ALL_ERRORS_FOR_FIELD',
        payload: {
          inputId: 'e-money-pin',
        },
      });
    }

    dispatch({
      type: 'REMOVE_ALL_ERRORS_FOR_FIELD',
      payload: {
        inputId: e.target.id,
      },
    });
    dispatch({
      type: 'CHANGE_VALUE',
      payload: {
        name,
        value: e.target.value,
      },
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    const name = e.target.name as FieldName;

    // user had already typed in a field and the field is empty
    if (state[name].isUserTyped && !state[name].value) {
      const label = e.target.labels![0].innerText;

      dispatch({
        type: 'ADD_ERROR_MESSAGE',
        payload: {
          label,
          inputId: e.target.id,
          message: `Can't be empty`,
        },
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target;
    if (target instanceof HTMLFormElement) {
      const inputes = target.querySelectorAll('input');

      inputes.forEach((input) => {
        const label = input.labels![0].innerText;

        if (input.validity.valueMissing) {
          dispatch({
            type: 'ADD_ERROR_MESSAGE',
            payload: {
              label,
              inputId: input.id,
              message: `Can't be empty`,
            },
          });
        }

        if (input.validity.typeMismatch) {
          dispatch({
            type: 'ADD_ERROR_MESSAGE',
            payload: {
              label,
              inputId: input.id,
              message: 'wrong format',
            },
          });
        }
      });

      if (target.checkValidity() === false) {
        showErrorSummary
          ? errorSummaryHeadingRef.current?.focus()
          : setShowErrorSummary(true);
      }

      if (target.checkValidity()) {
        dispatch({ type: 'RESET_STATE' });
        setShowRedirectingDialog(true);
      }
    }
  };

  const getErrorsByField = (inputId: string) => {
    return errors
      .filter((error) => error.inputId === inputId)
      .map((error) => error.message);
  };

  useEffect(() => {
    if (showErrorSummary) {
      errorSummaryHeadingRef.current?.focus();
    }
  }, [showErrorSummary]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={`${styles['form-inputs']} | box`}>
        <h1 className="h3">Checkout</h1>

        {showErrorSummary && errors.length > 0 && (
          <div className={styles['error-summary']}>
            <h2 tabIndex={-1} ref={errorSummaryHeadingRef} className="h6">
              There{' '}
              {errors.length > 1
                ? `were ${errors.length} errors`
                : 'is 1 error'}{' '}
              found in the information you submitted.
            </h2>
            <ol className={styles['errors-list']}>
              {errors.map((error, index) => (
                <li key={index}>
                  <Link
                    href={`#${error.inputId}`}
                    className={styles['error-link']}
                  >
                    {error.label}: {error.message}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}

        <fieldset className={styles.group}>
          <legend className="subtitle" data-selection="dark">
            Billing details
          </legend>
          <div className={styles.grid}>
            <Input
              label="Name"
              id="name"
              name="name"
              value={state.name.value}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={getErrorsByField('name')}
              autoComplete="name"
              inputMode="text"
            />
            <Input
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={state.email.value}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={getErrorsByField('email')}
              autoComplete="email"
              inputMode="email"
            />
            <Input
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
              value={state.phone.value}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={getErrorsByField('phone')}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className="subtitle" data-selection="dark">
            Shipping info
          </legend>
          <div className={styles.grid}>
            <Input
              label="Address"
              id="address"
              name="address"
              value={state.address.value}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={getErrorsByField('address')}
              autoComplete="shipping street-address"
            />
            <Input
              label="ZIP Code"
              id="zip-code"
              name="zip-code"
              value={state['zip-code'].value}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={getErrorsByField('zip-code')}
              autoComplete="postal-code"
              inputMode="decimal"
            />
            <Input
              label="City"
              id="city"
              name="city"
              value={state.city.value}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={getErrorsByField('city')}
              autoComplete="shipping address-level2"
            />
            <Input
              label="Country"
              id="country"
              name="country"
              value={state.country.value}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={getErrorsByField('country')}
              autoComplete="shipping country-name"
            />
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className="subtitle" data-selection="dark">
            Payment details
          </legend>

          <fieldset className={`${styles['payment-method']} ${styles.grid}`}>
            <legend className={`${styles.legend} | small-text`} hidden>
              Payment method
            </legend>
            <span
              className={`${styles.legend} | small-text`}
              aria-hidden={true}
            >
              Payment method
            </span>

            <Input
              type="radio"
              id="e-money"
              label="e-Money"
              value="e-money"
              name="payment-method"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={state['payment-method'].value === 'e-money'}
            />
            <Input
              type="radio"
              id="cash"
              label="Cash on Delivery"
              value="cash"
              name="payment-method"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={state['payment-method'].value === 'cash'}
              describedby="cash-method-description"
            />
          </fieldset>
          {state['payment-method'].value === 'e-money' && (
            <div className={styles.grid}>
              <Input
                type="text"
                label="e-Money Number"
                id="e-money-number"
                name="e-money-number"
                value={state['e-money-number'].value}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={getErrorsByField('e-money-number')}
                autoComplete="cc-number"
                inputMode="numeric"
              />
              <Input
                type="text"
                label="e-Money PIN"
                id="e-money-pin"
                name="e-money-pin"
                value={state['e-money-pin'].value}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={getErrorsByField('e-money-pin')}
                autoComplete="cc-csc"
                inputMode="decimal"
              />
            </div>
          )}

          <div
            className={`${styles['cash-description']} | flex-center`}
            hidden={state['payment-method'].value !== 'cash'}
          >
            <CashSvg />
            <p id="cash-method-description" className="opaque">
              The &lsquo;Cash on Delivery&rsquo; option enables you to pay in
              cash when our delivery courier arrives at your residence. Just
              make sure your address is correct so that your order will not be
              cancelled.
            </p>
          </div>
        </fieldset>
      </div>

      <Summary showDialog={showRedirectingDialog} />
    </form>
  );
}

export default CheckoutForm;
