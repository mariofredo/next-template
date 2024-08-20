import React from 'react';
import {Sidebar} from '@/components';
import '@/styles/SidebarLayout.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'container'}>
      <Sidebar />
      <div className={'content'}>
        <h1>Welcome to My Website</h1>
        <p>This is the main content area.</p>
        {children}
      </div>
    </div>
  );
}
