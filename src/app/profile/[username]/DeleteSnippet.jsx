'use client';

import { AuthContext } from '@/app/AuthContext';
import { DeleteSvg } from '@/assets/icons';
import { useContext } from 'react';
import { deleteSnippet, refreshCachedSnippets } from './actions';
import { isRevalidationRequired } from '@/app/Auth';
import { getRevalidatedUser } from '@/app/actions';
import { toast } from 'react-toastify';

export default function DeleteSnippetBtn({ id, title, userId, removeSnippet }) {
  const [user, setUser] = useContext(AuthContext);

  return (
    user.id === userId && (
      <button
        aria-label={`Delete ${title} Snippet`}
        title={`Delete ${title} Snippet`}
        className="hover:scale-110"
        onClick={async (e) => {
          e.preventDefault();

          const toastId = toast.loading('Deleting Snippet...', {
            position: 'top-center'
          });

          let userData = user;

          if (isRevalidationRequired(user.access)) {
            userData = await getRevalidatedUser();
            setUser({
              access: userData.access,
              username: userData.username,
              id: userData.id
            });

            if (userData.error) {
              toast.update(toastId, {
                render: userData.error,
                type: 'error',
                isLoading: false,
                autoClose: 3000
              });
              return;
            }
          }

          const el = e.target.closest('.card');
          el.classList.add('animate-popIn');

          el.addEventListener('animationend', () => removeSnippet(id), true);
          const deleteResult = await deleteSnippet(id, userData.access);

          toast.update(toastId, {
            render: 'Deleted Snippet Successfully',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            position: 'top-center'
          });
          refreshCachedSnippets(userData.username);
        }}
      >
        <DeleteSvg />
      </button>
    )
  );
}
