'use server';

import { cookies } from 'next/headers';
import { apiPath, parseJwt } from './Auth';
import { fetchUserFromRefresh } from './refreshUser';

function setRefreshCookie(value, maxAge) {
  cookies().set('refresh', value, {
    httpOnly: true,
    secure: true,
    maxAge,
    sameSite: 'strict'
  });
}

export async function fetchInLoop(path = '', options = {}) {
  while (true) {
    try {
      const response = await fetch(path, options);
      return response;
    } catch (error) {}
  }
}

export async function registerUser(formData) {
  const response = await fetchInLoop(apiPath('/users/register'), {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  const data = await response.json();

  if (data.error) return data;

  setRefreshCookie(data.refresh, data.refreshMaxAge);

  return data;
}

export async function logUserIn(formData) {
  const response = await fetchInLoop(apiPath('/users/login'), {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  const data = await response.json();

  if (data.error) return data;

  setRefreshCookie(data.refresh, data.refreshMaxAge);

  return data;
}

export async function getUnverifiedUserDetails() {
  const refresh = cookies().get('refresh');
  if (refresh) {
    const payload = parseJwt(refresh.value);

    if (payload.error) cookies().delete('refresh');

    return payload;
  }

  return {
    error: "Refresh Token doesn't exist"
  };
}

export async function logUserOut() {
  cookies().delete('refresh');
}

export async function refreshToken() {
  const refresh = cookies().get('refresh')?.value;

  if (!refresh)
    return {
      error: 'Unauthorized'
    };

  const data = await fetchUserFromRefresh(refresh);

  if (data.error) cookies().delete('refresh');

  return data;
}

export async function getRevalidatedUser() {
  const user = await refreshToken();

  if (user.error) {
    return {
      access: undefined,
      username: undefined,
      id: undefined,
      error: user.error
    };
  }
  return user;
}
