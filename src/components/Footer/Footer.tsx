import Logo from '@/components/Logo';
import styles from './Footer.module.css';
import NavLink from '@/components/NavLink';
import paths from '@/paths';

import FacebookSvg from './FacebookSvg';
import TwitterSvg from './TwitterSvg';
import InstagramSvg from './InstagramSvg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrapper two-columns`}>
        <Logo />
        <ul className={`${styles.links} | navlinks`}>
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
              href={paths.home()}
              className={`navlink subtitle click-target-helper`}
            >
              Headphones
            </NavLink>
          </li>
          <li>
            <NavLink
              href={paths.home()}
              className={`navlink subtitle click-target-helper`}
            >
              Speakers
            </NavLink>
          </li>
          <li>
            <NavLink
              href={paths.home()}
              className={`navlink subtitle click-target-helper`}
            >
              Earphones
            </NavLink>
          </li>
        </ul>
        <p>
          Audiophile is an all in one stop to fulfill your audio needs.
          We&apos;re a small team of music lovers and sound specialists who are
          devoted to helping you get the most out of personal audio. Come and
          visit our demo facility - we&apos;re open 7 days a week.
        </p>
        <ul aria-labelledby="social-links-label" className={styles.socials}>
          <span hidden id="social-links-label">
            Social links
          </span>
          <a href="https://www.facebook.com/" className="click-target-helper">
            <span className="visually-hidden">Facebook</span>
            <FacebookSvg />
          </a>
          <li>
            <a href="https://www.twitter.com/" className="click-target-helper">
              <span className="visually-hidden">Twitter</span>
              <TwitterSvg />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              className="click-target-helper"
            >
              <span className="visually-hidden">Instagram</span>
              <InstagramSvg />
            </a>
          </li>
        </ul>
        <p>Copyright 2024. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
