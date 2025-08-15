'use client';
import { Button } from '@/components';
import { useCommon } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
export default function ButtonPage() {
  const { data, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log('unauthenticated');
    },
  });

  return (
    <div className="page_ctr">
      <h1 className="font-bold text-[24px]">Button Solid</h1>
      <div className="page_wrapper">
        <Button variant="solid" colorScheme="primary" text="Submit" />
        <Button variant="solid" colorScheme="secondary" text="Submit" />
        <Button variant="solid" colorScheme="neutral" text="Submit" />
        <Button variant="solid" colorScheme="danger" text="Submit" />
        <Button variant="solid" colorScheme="warning" text="Submit" />
      </div>
      <h1 className="font-bold text-[24px]">Button Outline</h1>
      <div className="page_wrapper">
        <Button variant="outline" colorScheme="primary" text="Submit" />
        <Button variant="outline" colorScheme="secondary" text="Submit" />
        <Button variant="outline" colorScheme="neutral" text="Submit" />
        <Button variant="outline" colorScheme="danger" text="Submit" />
        <Button variant="outline" colorScheme="warning" text="Submit" />
      </div>
      <h1 className="font-bold text-[24px]">Button Text</h1>
      <div className="page_wrapper">
        <Button variant="text" colorScheme="primary" text="Submit" />
        <Button variant="text" colorScheme="secondary" text="Submit" />
        <Button variant="text" colorScheme="neutral" text="Submit" />
        <Button variant="text" colorScheme="danger" text="Submit" />
        <Button variant="text" colorScheme="warning" text="Submit" />
      </div>
    </div>
  );
}
