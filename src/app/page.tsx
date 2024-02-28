import styles from './page.module.css';
import paths from '@/paths';

import Button from '@/components/Button';
import Image from 'next/image';

import heroImg from '@/assets/home/desktop/image-hero.png';
import patternImg from '@/assets/home/desktop/pattern-circles.svg';
import speakerZX9Img from '@/assets/home/desktop/image-speaker-zx9.png';
import speakerZX7Img from '@/assets/home/desktop/image-speaker-zx7.jpg';
import earphonesYX1Img from '@/assets/home/desktop/image-earphones-yx1.jpg';

import Header from '@/components/Header';
import Links from '@/components/Links';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header variant="dark" />
      <main>
        <section className={styles.hero}>
          <div className="wrapper overflow-hidden">
            <div className={styles.image}>
              <Image src={heroImg} alt="" />
            </div>
            <div className={styles.info}>
              <p className="overline">New product</p>
              <h1>XX99 Mark II Headphones</h1>
              <p>
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Button as="link" href={paths.home()} variant="colored">
                See product
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.links}>
          <div className="wrapper">
            <Links />
          </div>
        </section>

        <section>
          <div className="wrapper">
            <article className={`${styles.product1} | box overflow-hidden`}>
              <div className={`${styles.product1__pattern} | image-wrapper`}>
                <Image src={patternImg} alt="" />
              </div>

              <div className={`${styles.product1__image} | image-wrapper`}>
                <Image src={speakerZX9Img} alt="" />
              </div>
              <div className={styles.product1__info}>
                <h2 className="h1" data-selection="dark">
                  ZX9 SPEAKER
                </h2>
                <p data-selection="dark">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound.
                </p>
                <Button as="link" variant="black" href={paths.home()}>
                  See product
                </Button>
              </div>
            </article>

            <article className={`${styles.product2} | box overflow-hidden`}>
              <div className={`${styles.product2__image} | image-wrapper`}>
                <Image src={speakerZX7Img} alt="" />
              </div>

              <div>
                <h2 className="h4">ZX7 SPEAKER</h2>
                <Button as={'link'} variant="colorless" href={paths.home()}>
                  See product
                </Button>
              </div>
            </article>

            <article className={`${styles.product3} | two-columns`}>
              <div
                className={`${styles.product3__image} | image-wrapper box overflow-hidden`}
              >
                <Image src={earphonesYX1Img} alt="" />
              </div>
              <div className="box">
                <h2 className="h4">YX1 EARPHONES</h2>
                <Button as={'link'} variant="colorless" href={paths.home()}>
                  See product
                </Button>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.about}>
          <div className="wrapper">
            <AboutUs />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
