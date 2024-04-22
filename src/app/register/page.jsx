'use client';

import { Input, PasswordInput } from '@/ui/Form';
import { apiPath } from '../Auth';
import { useContext } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '../AuthContext';

export default function Register() {
  const [user, setUser] = useContext(AuthContext);
  const query = useSearchParams().get('q') || '';

  if (user.access) {
    redirect(`/${query}`);
  }

  const registerUser = async (event) => {
    event.preventDefault();

    const bodyContent = new FormData(event.target.closest('form'));

    const response = await fetch(apiPath('/users/register'), {
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
        onSubmit={(event) => registerUser(event)}
        className="flex flex-col gap-8 card px-6 py-12 md:px-12 m-2 sm:m-0"
      >
        <h1 className="text-center text-3xl">Create a new Account</h1>
        <Input
          type="text"
          placeholder="John Wick"
          label="Username"
          id="username"
          name="username"
        />
        <Input
          type="email"
          placeholder="johnwick@cool.com"
          label="Email"
          id="email"
          name="email"
        />
        <PasswordInput />
        <input
          type="submit"
          value="Register"
          className="p-2 rounded bg-blue-400 text-slate-100 font-medium cursor-pointer"
        />
        <p className="text-center">
          Already have an Account?{' '}
          <Link href="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
