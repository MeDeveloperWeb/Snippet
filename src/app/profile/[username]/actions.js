'use server';

import { apiPath } from '@/app/Auth';
import { revalidateTag } from 'next/cache';

export default async function getUserSnippets(
  username,
  offset = 0,
  limit = 14,
  cacheResult = true
) {
  let response;
  if (cacheResult) {
    response = await fetch(
      apiPath(`/snippet/user/${username}?limit=${limit}&offset=${offset}`),
      {
        next: {
          tags: [`profile-${username}`]
        }
      }
    );
  } else {
    response = await fetch(
      apiPath(`/snippet/user/${username}?limit=${limit}&offset=${offset}`),
      {
        cache: 'no-store'
      }
    );
  }

  return await response.json();
}

export async function deleteSnippet(id, access) {
  if (!access) {
    throw Error('Unauthorized');
  }

  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access}`
  };

  const bodyContent = JSON.stringify({ id });

  const response = await fetch(apiPath('/snippet/delete'), {
    method: 'DELETE',
    body: bodyContent,
    headers: headersList
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data);
  }

  return data;
}

export async function refreshCachedSnippets(username) {
  revalidateTag(`profile-${username}`);
}
