'use server';

import { apiPath, parseJwt } from '@/app/Auth';

export async function changeUsername(newUsername, access) {
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${access}`,
    'Content-Type': 'application/json'
  };

  const bodyContent = JSON.stringify({
    username: newUsername
  });

  const response = await fetch(apiPath('/users/change-username'), {
    method: 'POST',
    body: bodyContent,
    headers: headersList
  });

  const data = await response.json();

  return data;
}

export async function changeEmail(email, access) {
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${access}`,
    'Content-Type': 'application/json'
  };

  const bodyContent = JSON.stringify({
    email
  });

  const response = await fetch(apiPath('/users/change-email'), {
    method: 'POST',
    body: bodyContent,
    headers: headersList
  });

  const data = await response.json();

  return data;
}

export async function reqVerification(access) {
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${access}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(apiPath('/users/req-verification'), {
    headers: headersList
  });

  const data = await response.json();

  return data;
}

export async function reqPasswordChange(access, { username }) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json'
  };

  const response = await fetch(apiPath('/users/req-password'), {
    method: 'POST',
    body: JSON.stringify({
      username
    }),
    headers: headersList
  });

  const data = await response.json();

  return data;
}
