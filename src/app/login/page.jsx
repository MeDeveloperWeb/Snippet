'use client';

import { Input, PasswordInput } from '@/ui/Form';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '../AuthContext';
import { logUserIn } from '../actions';
import { toast } from 'react-toastify';

export default function Login({ searchParams }) {
  const [user, setUser] = useContext(AuthContext);
  const query = searchParams?.q || '';
  const router = useRouter();

  useEffect(() => {
    if (user.username) {
      router.push(`/${query}`);
    }
  }, [query, router, user.username]);

  if (user.username) {
    return <h1>Already logged In</h1>;
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <form
        // onSubmit={(event) => loginUser(event)}
        action={async (formData) => {
          const toastId = toast.loading('Logging User In...', {
            position: 'top-center'
          });

          const user = await logUserIn(formData);

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
            render: `User Logged in as ${user.username} Successfully`,
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
        <PasswordInput resetRequired={true} />
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
