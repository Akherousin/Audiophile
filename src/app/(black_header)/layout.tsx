import Header from '@/components/Header';

export default function BlackHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header variant="black" />
      {children}
    </>
  );
}
