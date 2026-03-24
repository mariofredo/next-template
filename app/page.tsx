import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

export default function Home() {
  return (
    <div className={clsx(`flex h-screen flex-col items-center justify-center gap-[20px]`)}>
      <h1 className={clsx(`text-[32px] font-bold`)}>Welcome to Next Template</h1>
    </div>
  );
}
