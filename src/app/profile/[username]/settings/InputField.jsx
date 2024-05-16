'use client';

import { isRevalidationRequired } from '@/app/Auth';
import { AuthContext } from '@/app/AuthContext';
import { getRevalidatedUser } from '@/app/actions';
import { EditSvg } from '@/assets/icons';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function InputField({
  name,
  value: initValue,
  type,
  inputColor,
  submitFn = async (value, access) => {},
  access,
  ...inputProps
}) {
  const [inEdit, setInEdit] = useState(false);
  const [value, setValue] = useState(initValue);
  const [_, setUser] = useContext(AuthContext);

  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-1 py-12">
      <label className="flex-1 capitalize" htmlFor={name}>
        {name}:
      </label>
      {inEdit ? (
        <input
          type={type}
          id={name}
          value={value}
          autoFocus
          className={`flex-[3] p-2 rounded-xl bg-[#e0e0e088]`}
          onChange={({ target }) => setValue(target.value)}
          {...inputProps}
        />
      ) : (
        <div className={`flex-[3] p-2 rounded-xl ${inputColor}`}>{value}</div>
      )}
      <div className="flex-[2] flex justify-center gap-1">
        {inEdit ? (
          <>
            <button
              className="bg-green-600 text-white w-fit py-1 px-2 rounded-sm flex gap-1 my-0 mx-auto"
              onClick={async () => {
                setInEdit(false);

                const toastId = toast.loading(`Changing ${name}...`, {
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

                const data = await submitFn(value, accessToken);

                if (data.error) {
                  setValue(initValue);
                  toast.update(toastId, {
                    render: data.error,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    draggable: true,
                    closeButton: true,
                    closeOnClick: true
                  });
                  return;
                }

                toast.update(toastId, {
                  render: data.message,
                  type: 'success',
                  isLoading: false,
                  autoClose: 3000,
                  draggable: true,
                  closeButton: true,
                  closeOnClick: true
                });
              }}
              aria-label={`Change ${name}`}
            >
              Submit
            </button>
            <button
              className="bg-[#e0e0e088] text-white w-fit py-1 px-2 rounded-sm flex gap-1 my-0 mx-auto"
              onClick={() => {
                setInEdit(false);
                setValue(initValue);
              }}
              aria-label={`Change ${name}`}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white w-fit py-1 px-2 rounded-sm flex gap-1 my-0 mx-auto"
            onClick={() => {
              setInEdit(true);
            }}
            aria-label={`Edit ${name}`}
          >
            <EditSvg />
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
