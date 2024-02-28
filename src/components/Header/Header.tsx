import paths from '@/paths';
import styles from './Header.module.css';

import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';

import CartSvg from './CartSvg';

type HeaderProps = {
  variant: 'dark' | 'black';
};

function Header({ variant }: HeaderProps) {
  return (
    <header className={styles.header} data-variant={variant}>
      <div className="wrapper">
        <Logo />

        <nav>
          <ul className={'navlinks'}>
            <li>
              <NavLink
                href={paths.home()}
                className={`navlink subtitle click-target-helper`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                href={paths.showCategoryPage('headphones')}
                className={`navlink subtitle click-target-helper`}
              >
                Headphones
              </NavLink>
            </li>
            <li>
              <NavLink
                href={paths.showCategoryPage('speakers')}
                className={`navlink subtitle click-target-helper`}
              >
                Speakers
              </NavLink>
            </li>
            <li>
              <NavLink
                href={paths.showCategoryPage('earphones')}
                className={`navlink subtitle click-target-helper`}
              >
                Earphones
              </NavLink>
            </li>
          </ul>
        </nav>

        <button className={`${styles.cart} | click-target-helper`}>
          <CartSvg />
          <span className="visually-hidden">Cart</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
