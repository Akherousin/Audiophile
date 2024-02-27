import styles from './AboutUs.module.css';

import Image from 'next/image';
import bestGearImg from '@/assets/shared/desktop/image-best-gear.jpg';

function AboutUs() {
  return (
    <article className={`${styles.article} | two-columns`}>
      <div className={styles.info}>
        <h2>
          Bringing you the <em>best</em> audio gear
        </h2>
        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className={`${styles.image}  | image-wrapper box`}>
        <Image src={bestGearImg} alt="" />
      </div>
    </article>
  );
}

export default AboutUs;
