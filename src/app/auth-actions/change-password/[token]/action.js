'use server';

import { apiPath } from '@/app/Auth';
import { notFound, redirect } from 'next/navigation';

export async function changePassword(token, formData) {
  const headersList = {
    Accept: '*/*',
    Authorization: `Reset ${token}`
  };

  const response = await fetch(apiPath('/users/reset-password'), {
    method: 'POST',
    body: formData,
    headers: headersList
  });

  if (!response.ok) {
    return notFound();
  } else {
    redirect('?changed=true');
  }
}
