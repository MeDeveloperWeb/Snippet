'use server';

import { apiPath } from '@/app/Auth';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function saveSnippet(snippet, access) {
  if (!access) {
    return {
      error: 'Unauthorized',
      errorCode: 401
    };
  }

  let path = '/snippet/add';
  if (snippet._id) path = '/snippet/update';

  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access}`
  };

  const bodyContent = JSON.stringify(snippet);

  const response = await fetch(apiPath(path), {
    method: 'POST',
    body: bodyContent,
    headers: headersList
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.error,
      errorCode: response.status
    };
  }

  revalidatePath(`/snippet/${snippet._id || data.id}`);
  return data;
}
