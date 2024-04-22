'use client';

import { Input, PasswordInput } from '@/ui/Form';
import { apiPath } from '../Auth';
import { useContext } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '../AuthContext';

export default function Login() {
  const [user, setUser] = useContext(AuthContext);
  const query = useSearchParams().get('q') || '';

  if (user.access) {
    redirect(`/${query}`);
  }

  const loginUser = async (event) => {
    event.preventDefault();

    const bodyContent = new FormData(event.target.closest('form'));

    const response = await fetch(apiPath('/users/login'), {
      method: 'POST',
      body: bodyContent,
      credentials: 'include'
    });

    const data = await response.json();

    setUser(data);
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <form
        onSubmit={(event) => loginUser(event)}
        className="flex flex-col gap-8 px-6 py-12 md:px-12 m-2 sm:m-0 card"
      >
        <h1 className="text-center text-3xl">Login to Snippett</h1>
        <Input
          type="text"
          placeholder="John Wick"
          label="Username or Email"
          id="username"
          name="username"
        />
        <PasswordInput />
        <input
          type="submit"
          value="Log In"
          className="p-2 rounded bg-blue-400 text-slate-100 font-medium cursor-pointer"
        />
        <p className="text-center">
          New User?{' '}
          <Link href="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
