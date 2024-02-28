import AboutUs from '@/components/AboutUs';
import styles from './layout.module.css';
import Links from '@/components/Links';

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        {children}
        <section className={`${styles.links} | wrapper`}>
          <Links />
        </section>
        <section className={`${styles.about} | wrapper`}>
          <AboutUs />
        </section>
      </main>
    </>
  );
}
