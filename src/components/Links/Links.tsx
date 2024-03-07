import paths from '@/paths';
import styles from './Links.module.css';

import Image from 'next/image';
import ChevronRightSvg from './ChevronRightSvg';
import NavLink from '@/components/NavLink';

import headphonesImg from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import speakersImg from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';
import earphonesImg from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';

function Links() {
  return (
    <ul className={styles.list}>
      <li className={`${styles.item} | box`}>
        <h2 className="h6">Headphones</h2>
        <NavLink
          href={paths.showCategoryPage('headphones')}
          className={`${styles.link} | flex-center subtitle`}
        >
          <span>
            Shop <span className="visually-hidden">for Headphones</span>
          </span>
          <ChevronRightSvg />
        </NavLink>
        <div
          className={`${styles.image}  | image-wrapper`}
          data-image="headphones"
        >
          <Image alt="" src={headphonesImg} />
        </div>
      </li>

      <li className={`${styles.item} | box`}>
        <h2 className="h6">Speakers</h2>
        <NavLink
          href={paths.showCategoryPage('speakers')}
          className={`${styles.link} | flex-center subtitle`}
        >
          <span>
            Shop <span className="visually-hidden">for Speakers</span>
          </span>
          <ChevronRightSvg />
        </NavLink>
        <div
          className={`${styles.image}  | image-wrapper`}
          data-image="speakers"
        >
          <Image alt="" src={speakersImg} />
        </div>
      </li>

      <li className={`${styles.item} | box`}>
        <h2 className="h6">Earphones</h2>
        <NavLink
          href={paths.showCategoryPage('earphones')}
          className={`${styles.link} | flex-center subtitle`}
        >
          <span>
            Shop <span className="visually-hidden">for Earphones</span>
          </span>
          <ChevronRightSvg />
        </NavLink>
        <div
          className={`${styles.image}  | image-wrapper`}
          data-image="earphones"
        >
          <Image alt="" src={earphonesImg} />
        </div>
      </li>
    </ul>
  );
}

export default Links;
