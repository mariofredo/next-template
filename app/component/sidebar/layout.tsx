import {Sidebar} from '@/components';
import {GermanSheperdImage} from '@/public';

export default function SidebarNormalLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className='main_container'>
      <Sidebar logo={GermanSheperdImage} />
      <div className='content'>{children}</div>
    </div>
  );
}
