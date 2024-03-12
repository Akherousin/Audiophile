import styles from './page.module.css';
import paths from '@/paths';

import Button from '@/components/Button';
import Image from 'next/image';

import heroImg from '@/assets/home/desktop/image-hero.png';
import heroImgTablet from '@/assets/home/tablet/image-hero.png';
import heroImgMobile from '@/assets/home/mobile/image-hero.png';

import patternImg from '@/assets/home/desktop/pattern-circles.svg';
import speakerZX9Img from '@/assets/home/desktop/image-speaker-zx9.png';
import speakerZX9ImgTablet from '@/assets/home/tablet/image-speaker-zx9.png';
import speakerZX9ImgMobile from '@/assets/home/mobile/image-speaker-zx9.png';

import speakerZX7Img from '@/assets/home/desktop/image-speaker-zx7.jpg';
import speakerZX7ImgTablet from '@/assets/home/tablet/image-speaker-zx7.jpg';
import speakerZX7ImgMobile from '@/assets/home/mobile/image-speaker-zx7.jpg';

import earphonesYX1Img from '@/assets/home/desktop/image-earphones-yx1.jpg';
import earphonesYX1ImgTablet from '@/assets/home/tablet/image-earphones-yx1.jpg';
import earphonesYX1ImgMobile from '@/assets/home/mobile/image-earphones-yx1.jpg';

import Header from '@/components/Header';
import Links from '@/components/Links';
import AboutUs from '@/components/AboutUs';
import Source from '@/components/Source';
import { QUERIES } from '@/constants';

export default function Home() {
  return (
    <>
      <Header variant="dark" />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className="wrapper overflow-hidden">
            <picture className={`${styles['hero-image']} | image-wrapper`}>
              <Source src={heroImgMobile} media={QUERIES.phoneAndSmaller} />
              <Source src={heroImgTablet} media={QUERIES.tabletAndSmaller} />
              <Image
                src={heroImg}
                alt="A pair of over-ear headphones in black. The headphones have a sleek, modern design with round ear cups and a padded headband. "
                priority
              />
            </picture>
            <div className={styles['hero-info']}>
              <p className="overline opaque">New product</p>
              <h1 className={styles['hero-title']}>XX99 Mark II Headphones</h1>
              <p className={styles['hero-description']}>
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Button
                as="link"
                href={paths.showProductPage('xx99-mark-two-headphones')}
                variant="colored"
                className={styles['hero-cta']}
              >
                See product{' '}
                <span className="visually-hidden">XX99 Mark II Headphones</span>
              </Button>
            </div>
          </div>
        </header>

        <section className={`${styles.links} | wrapper`}>
          <Links />
        </section>

        <section className="wrapper">
          <article className={`${styles.product1} | box overflow-hidden`}>
            <div className={`${styles['product1-pattern']} | image-wrapper`}>
              <Image src={patternImg} alt="" />
            </div>
            <picture className={`${styles['product1-image']} | image-wrapper`}>
              <Source
                src={speakerZX9ImgMobile}
                media={QUERIES.phoneAndSmaller}
              />
              <Source
                src={speakerZX9ImgTablet}
                media={QUERIES.tabletAndSmaller}
              />
              <Image
                src={speakerZX9Img}
                alt="The ZX9 speaker is black with a slightly textured finish. The top woofer has a white ring around the outside. There is a Stein Music logo on the front, below the woofer.
                The base of the speaker slants inwards slightly."
              />
            </picture>

            <div className={styles['product1-info']}>
              <h2
                className={`${styles['product1-title']} | h1`}
                data-selection="dark"
              >
                ZX9 SPEAKER
              </h2>
              <p
                data-selection="dark"
                className={styles['product1-description']}
              >
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Button
                as="link"
                variant="black"
                href={paths.showProductPage('zx9-speaker')}
                className={styles['product1-link']}
              >
                See product <span className="visually-hidden">ZX9 SPEAKER</span>
              </Button>
            </div>
          </article>

          <article className={`${styles.product2} | box overflow-hidden`}>
            <picture className={`${styles['product2-image']} | image-wrapper`}>
              <Source
                src={speakerZX7ImgMobile}
                media={QUERIES.phoneAndSmaller}
              />
              <Source
                src={speakerZX7ImgTablet}
                media={QUERIES.tabletAndSmaller}
              />
              <Image
                src={speakerZX7Img}
                alt="
                A black ZX7 speaker sitting on a wooden table. The speaker is a rectangular prism with a black, fabric grille on the front. It has a small, silver logo on the bottom right corner of the front grille."
              />
            </picture>

            <div>
              <h2 className="h4">ZX7 SPEAKER</h2>
              <Button
                as={'link'}
                variant="colorless"
                href={paths.showProductPage('zx7-speaker')}
              >
                See product <span className="visually-hidden">ZX7 SPEAKER</span>
              </Button>
            </div>
          </article>

          <article className={`${styles.product3}`}>
            <picture
              className={`${styles['product3-image']} | image-wrapper box overflow-hidden`}
            >
              <Source
                src={earphonesYX1ImgMobile}
                media={QUERIES.phoneAndSmaller}
              />
              <Source
                src={earphonesYX1ImgTablet}
                media={QUERIES.tabletAndSmaller}
              />
              <Image
                src={earphonesYX1Img}
                alt="A pair of wireless earbuds in a charging case. The earbuds are black and have a glossy finish. They appear to have a touch sensor on the outside. The charging case is also black and has a rounded rectangular shape. There is a small LED light on the front of the case, which may indicate the charging status of the earbuds."
              />
            </picture>
            <div className={`${styles['product3-info']} | box`}>
              <h2 className="h4">YX1 EARPHONES</h2>
              <Button
                as={'link'}
                variant="colorless"
                href={paths.showProductPage('yx1-earphones')}
              >
                See product{' '}
                <span className="visually-hidden">YX1 EARPHONES</span>
              </Button>
            </div>
          </article>
        </section>

        <section className={`${styles.about} | wrapper`}>
          <AboutUs />
        </section>
      </main>
    </>
  );
}
