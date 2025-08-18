import { Sidebar } from '@/components';
import { GermanSheperdImage } from '@/public';

export default function SidebarNormalLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex w-full">
      <Sidebar logo={GermanSheperdImage} />
      <div className="w-[calc(100%_-_160px)]">{children}</div>
    </div>
  );
}
