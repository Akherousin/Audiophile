import styles from './AboutUs.module.css';

import Image from 'next/image';
import bestGearImg from '@/assets/shared/desktop/image-best-gear.jpg';

function AboutUs() {
  return (
    <div className="two-columns" data-reversed-columns="true">
      <div className="info">
        <h2>
          Bringing you the{' '}
          <em className={`${styles.colored}`} data-selection="dark">
            best
          </em>{' '}
          audio gear
        </h2>
        <p className="description opaque">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className={`image-wrapper box overflow-hidden background-grey`}>
        <Image src={bestGearImg} alt="" width={540} height={588} />
      </div>
    </div>
  );
}

export default AboutUs;
