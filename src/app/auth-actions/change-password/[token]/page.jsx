'use server';

import { apiPath } from '@/app/Auth';
import { PasswordInput } from '@/ui/Form';
import { changePassword } from './action';

export default async function ChangePassword({ params, searchParams }) {
  const { token } = params;
  const { changed } = searchParams;

  if (changed)
    return (
      <h1 className="text-center my-16">
        Changed Password Successfully! You can now close this window
      </h1>
    );

  const canReqPasswordChange = await fetch(apiPath('/users/forgot-password'), {
    headers: {
      Authorization: `Reset ${token}`
    }
  });
  if (!canReqPasswordChange.ok) {
    return (
      <h1 className="text-center my-16">
        Invalid or Expired link! Please try again
      </h1>
    );
  }

  const handleForm = changePassword.bind(null, token);

  return (
    <div className="flex items-center justify-center mt-20">
      <form
        action={handleForm}
        className="flex flex-col gap-8 card px-6 py-12 md:px-12 m-2 sm:m-0"
      >
        <h1 className="text-center text-3xl">Create a new Account</h1>
        <PasswordInput />
        <input
          type="submit"
          value="Change Password"
          className="p-2 rounded bg-blue-400 text-slate-100 font-medium cursor-pointer"
        />
      </form>
    </div>
  );
}
