'use client';
import {useUser} from '@/hooks/useUser';
import {useEffect} from 'react';

export default function UserPage() {
  const {getUser} = useUser();
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className='user_ctr'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
