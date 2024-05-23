'use client';

import { reqPasswordChange } from '@/app/profile/[username]/settings/actions';
import { Input } from '@/ui/Form';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const ref = useRef(null);
  return (
    <form
      className="flex flex-col gap-8 px-6 py-12 md:px-12 my-8 mx-auto card max-w-[600px]"
      onSubmit={async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Processing Request...');
        const res = await reqPasswordChange('', {
          username: ref.current.value
        });

        if (res.error) {
          toast.update(toastId, {
            render: res.error,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            draggable: true,
            closeButton: true,
            closeOnClick: true
          });

          if (target) target.disabled = false;
          return;
        }
        toast.update(toastId, {
          render: res.message,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          draggable: true,
          closeButton: true,
          closeOnClick: true
        });
      }}
    >
      <Input
        type="text"
        placeholder="John Wick"
        label="Username or Email"
        id="username"
        name="username"
        inputRef={ref}
      />
      <input
        type="submit"
        value="Request Password Change"
        className="p-2 rounded-sm bg-green-600 text-white w-fit mx-auto my-0"
      />
    </form>
  );
}
