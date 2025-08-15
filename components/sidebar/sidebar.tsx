import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import '@/styles/sidebar.scss';
import clsx from 'clsx';

export default function Sidebar({ logo }: Readonly<{ logo: string | StaticImageData }>) {
  const sidebarItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Profile', href: '/profile' },
  ];
  return (
    <div className={clsx(`sticky top-0 h-screen w-[300px] bg-purple-600 text-white p-[20px]`)}>
      <Image className={clsx(`w-full h-auto rounded-[10px]`)} src={logo} alt="logo" />
      <ul className={``}>
        {sidebarItems.map((item) => (
          <li className={clsx(`my-[10px] text-[18px]`)} key={item.label}>
            <Link href={item.href} className={clsx(`block w-full text-white p-[10px]`)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
