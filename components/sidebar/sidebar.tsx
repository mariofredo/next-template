import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { BiHome } from 'react-icons/bi';

interface SidebarProps {
  logo: StaticImageData;
}

export default function Sidebar({ logo }: SidebarProps) {
  const sidebarItems = [
    { label: 'Home', href: '/', icon: <BiHome fontSize={28} className="block w-[40px] h-[40px]" /> },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Profile', href: '/profile' },
  ];
  return (
    <div className={clsx(`sticky top-0 h-screen w-[160px] bg-gray-800 text-white p-[20px]`)}>
      {/* <Image className={clsx(`w-full h-auto rounded-[10px]`)} src={logo} alt="logo" /> */}
      <ul className={clsx(`mt-[20px] list-none px-[10px]`)}>
        {sidebarItems.map((item) => (
          <li className={clsx(`my-[10px] text-[18px] flex justify-center`)} key={item.label}>
            <Link
              href={item.href}
              className={clsx(
                `inline-flex justify-center items-center gap-[10px] text-white font-semibold text-[20px]`,
                `w-[40px] h-[40px] rounded-[10px] overflow-hidden`,
              )}
            >
              {item.icon && item.icon}
              <span className="hidden">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
