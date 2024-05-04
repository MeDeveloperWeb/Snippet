'use client';

import { AuthContext } from '@/app/AuthContext';
import { DeleteSvg } from '@/assets/icons';
import { useContext } from 'react';
import { deleteSnippet, refreshCachedSnippets } from './actions';
import { useRouter } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export default function DeleteSnippetBtn({ id, title, userId, removeSnippet }) {
  const [user] = useContext(AuthContext);
  const router = useRouter();

  return (
    user.id === userId && (
      <button
        aria-label={`Delete ${title} Snippet`}
        title={`Delete ${title} Snippet`}
        className="hover:scale-110"
        onClick={async (e) => {
          e.preventDefault();

          const el = e.target.closest('.card');
          el.classList.add('animate-popIn');

          el.addEventListener('animationend', () => removeSnippet(id), true);
          const deleteResult = await deleteSnippet(id, user.access);
          refreshCachedSnippets(user.username);
        }}
      >
        <DeleteSvg />
      </button>
    )
  );
}
