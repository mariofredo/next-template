import Link from 'next/link';

import { clsx } from 'clsx';

export default function GSAPPage() {
  const DOCS_ITEMS = [
    {
      name: 'Basic',
      href: '/gsap/docs',
    },
    {
      name: 'Scroll',
      href: '/gsap/docs/scroll',
    },
  ];
  const SANDBOX_ITEMS = [
    {
      name: 'Practice 1',
      href: '/gsap/sandbox/practice-1',
    },
  ];
  return (
    <div className={clsx(`h-dvh w-full`)}>
      <h1 className={clsx(`text-4xl font-bold`)}>GSAP</h1>
      <div className={clsx(`grid grid-cols-2`)}>
        <div className={clsx(`flex flex-col gap-4 bg-green-400 p-5`)}>
          <h2 className={clsx(`text-2xl font-bold`)}>Documentation</h2>
          {DOCS_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={clsx(`text-2xl hover:underline`)}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={clsx(`flex flex-col gap-4 bg-blue-400 p-5`)}>
          <h2 className={clsx(`text-2xl font-bold`)}>Sandbox</h2>
          {SANDBOX_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={clsx(`text-2xl hover:underline`)}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
