import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

export default function Home() {
  return (
    <div className={clsx(`flex flex-col gap-[20px]`)}>
      WELCOME TO PLAYGROUND
      <Link href={'/component/sidebar'}>Sidebar</Link>
    </div>
  );
}
