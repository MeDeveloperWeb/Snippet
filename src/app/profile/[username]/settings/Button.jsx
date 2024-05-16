'use client';

import { toast } from 'react-toastify';
import { isRevalidationRequired } from '@/app/Auth';
import { getRevalidatedUser } from '@/app/actions';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';

export default function Button({
  value,
  access,
  clickFn = async () => {},
  clickFnArgs = {}
}) {
  const [_, setUser] = useContext(AuthContext);

  return (
    <button
      className="p-2 rounded-sm bg-green-600 text-white"
      onClick={async ({ target }) => {
        if (target) target.disabled = true;

        const toastId = toast.loading(`Processing...`, {
          position: 'top-center'
        });

        let accessToken = access;

        if (isRevalidationRequired(accessToken)) {
          const userData = await getRevalidatedUser();
          setUser({
            access: userData.access,
            username: userData.username,
            id: userData.id
          });

          if (userData.error) {
            toast.update(toastId, {
              render: `Unauthenticated`,
              type: 'error',
              isLoading: false,
              autoClose: 3000,
              draggable: true,
              closeButton: true,
              closeOnClick: true
            });
          }
        }

        const res = await clickFn(accessToken, { ...clickFnArgs });

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
        if (target) target.disabled = false;
      }}
    >
      {value}
    </button>
  );
}
