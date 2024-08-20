import React from 'react';
import Link from 'next/link';
import '@/styles/sidebar.scss';

export default function Sidebar() {
  const sidebarItems = [
    {label: 'Home', href: '/'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '/contact'},
    {label: 'Profile', href: '/profile'},
  ];
  return (
    <div className={'sidebar'}>
      <ul className={'list'}>
        {sidebarItems.map((item) => (
          <li className={'listItem'}>
            <Link href={item.href} className={'link'}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
