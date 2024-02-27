import Link, { LinkProps } from 'next/link';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant: 'colored' | 'colorless' | 'black' | 'plain';
} & (
  | ({
      as?: 'button';
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'link' } & LinkProps)
);

function Button({
  variant,
  className,
  children,
  as = 'button',
  ...rest
}: ButtonProps) {
  const classes = `${className ? className : ''} ${styles.button} | subtitle 
  `.trim();

  if (as === 'link') {
    return (
      <Link className={classes} data-variant={variant} {...(rest as LinkProps)}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={classes}
        data-variant={variant}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
}

export default Button;
