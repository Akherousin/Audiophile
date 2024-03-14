import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Footer from '@/components/Footer';
import './globals.css';
import CartProvider from '@/context/CartProvider';
import ToastProvider from '@/context/ToastProvider';
import ToastShelf from '@/components/ToastShelf';
import FocusOnHeading from '@/components/FocusOnHeading';
import RespectMotionPreferences from '@/components/RespectMotionPreferences';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Homepage - Audiophile',
  description:
    'Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RespectMotionPreferences>
      <html lang="en">
        <body className={manrope.className}>
          <a href="#main" id="skip-link">
            Skip to Main Content
          </a>
          <FocusOnHeading />
          <ToastProvider>
            <CartProvider>{children}</CartProvider>
            <ToastShelf />
          </ToastProvider>
          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}
