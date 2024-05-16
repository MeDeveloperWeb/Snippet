'use server';

import { apiPath } from '@/app/Auth';
import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

export async function getUser(username, access) {
  const response = await fetch(apiPath('/users'), {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`
    },
    body: JSON.stringify({
      username
    })
  });

  if (!response.ok) {
    return notFound();
  }

  const user = await response.json();

  return user;
}

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

  if (!response.ok) {
    if (response.status === 404) return notFound();
    return [];
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
