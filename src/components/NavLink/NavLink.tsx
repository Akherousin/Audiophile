'use client';
import React, { ComponentPropsWithoutRef } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = LinkProps & ComponentPropsWithoutRef<'a'>;

export function NavLink({ href, children, ...delegated }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <Link
      href={href}
      {...delegated}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

export default NavLink;
