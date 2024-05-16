'use client';

import { Input, PasswordInput } from '@/ui/Form';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '../AuthContext';
import { registerUser } from '../actions';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

export default function Register({ searchParams }) {
  const [user, setUser] = useContext(AuthContext);
  const query = searchParams?.q || '';
  const router = useRouter();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (user.username) {
      router.push(`/${query}`);
    }
  }, [query, router, user.username]);

  if (user.username) {
    return <h1>Already Logged In.</h1>;
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <form
        action={async (formData) => {
          const toastId = toast.loading('Registering User...', {
            position: 'top-center'
          });

          const user = await registerUser(formData);

          if (user.error) {
            toast.update(toastId, {
              render: user.error,
              type: 'error',
              isLoading: false,
              autoClose: 3000,
              draggable: true,
              closeButton: true,
              closeOnClick: true
            });

            return;
          }
          // update Notification
          toast.update(toastId, {
            render: `User Registered as ${user.username} Successfully`,
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            draggable: true,
            closeButton: true,
            closeOnClick: true
          });

          setUser({
            access: user.access,
            id: user.id,
            username: user.username
          });

          router.push(`/${query}`);
        }}
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
          disabled={pending}
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
