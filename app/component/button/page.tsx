'use client';
import {Button} from '@/components';
import {useCommon} from '@/hooks';
import {useSession} from 'next-auth/react';
import {useEffect} from 'react';
export default function ButtonPage() {
  const {data, status, update} = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log('unauthenticated');
    },
  });

  return (
    <div className='page_ctr'>
      <h1>Button Solid</h1>
      <div className='page_wrapper'>
        <Button
          bgColor='#0070f3'
          color='#fff'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
        />
        <Button
          bgColor='#0070f3'
          color='#fff'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
        />
        <Button
          bgColor='#0070f3'
          color='#fff'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
          loading
        />
      </div>
      <h1>Button Outline</h1>
      <div className='page_wrapper'>
        <Button
          type='outline'
          bgColor='#fff'
          color='#0070f3'
          borderColor='#0070f3'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
        />
        <Button
          type='outline'
          bgColor='#fff'
          color='#0070f3'
          borderColor='#0070f3'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
        />
        <Button
          type='outline'
          bgColor='#fff'
          color='#0070f3'
          borderColor='#0070f3'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
          loading
        />
      </div>
    </div>
  );
}
