'use client';

import paths from '@/paths';
import styles from './Header.module.css';

import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';
import Cart from '@/components/Cart';
import Links from '@/components/Links';
import MenuSvg from './MenuSvg';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '@/hooks/use-on-click-outside.hook';
import { useMakeInert } from '@/hooks/use-make-inert.hook';

type HeaderProps = {
  variant: 'dark' | 'black';
};

function Header({ variant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setIsOpen(false));
  useMakeInert(isOpen);

  return (
    <header className={styles.header} data-variant={variant}>
      <div className="wrapper">
        <nav
          className={styles['navigation-mobile']}
          ref={navRef}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsOpen(false);
            }
          }}
        >
          <button
            className={`${styles.button} | click-target-helper`}
            aria-expanded={isOpen}
            aria-controls={'mobile-navigation-dropdown'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuSvg />
            <span className="visually-hidden">
              {isOpen ? 'Close navigation' : 'Open navigation'}
            </span>
          </button>
          <div
            className={styles.dropdown}
            id="mobile-navigation-dropdown"
            hidden={!isOpen}
          >
            <div className="wrapper">
              <Links />
            </div>
          </div>
        </nav>

        <Logo />

        <nav className={styles.navigation}>
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

        <Cart />
      </div>
    </header>
  );
}

export default Header;
