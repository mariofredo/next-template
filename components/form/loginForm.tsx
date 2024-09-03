'use client';
import {Button, Input} from '@/components';
import {signIn, SignInResponse} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {FormEvent, useCallback, useState} from 'react';

export default function LoginForm() {
  const {push} = useRouter();
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const handleSubmitLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await signIn('credentials', {
          email: payload.email,
          password: payload.password,
          redirect: false,
        });
        console.log(response, 'response');
        if (response?.status === 200) {
          push('/dashboard/button');
        } else if (response?.status === 401) {
          alert('Wrong email or password');
        }
      } catch (error) {
        console.log(error, 'error');
      }
    },
    [payload]
  );
  return (
    <form className='auth_form' method='post' onSubmit={handleSubmitLogin}>
      <Input
        type='email'
        placeholder='Email'
        onChange={(e) => setPayload({...payload, email: e.target.value})}
        value={payload.email}
        name='email'
      />
      <Input
        type='password'
        placeholder='Password'
        value={payload.password}
        onChange={(e) => setPayload({...payload, password: e.target.value})}
        name='password'
      />
      <Button
        text='Submit'
        type='outline'
        bgColor='#f5f5f5'
        borderColor='#3c3c3c'
        padding='10px 20px'
        borderRadius='10px'
      />
    </form>
  );
}
