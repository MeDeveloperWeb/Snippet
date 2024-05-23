'use server';

import { apiPath } from './Auth';
import { fetchInLoop } from './actions';

export async function fetchUserFromRefresh(refresh) {
  if (!refresh)
    return {
      error: 'Unauthorized'
    };

  const response = await fetchInLoop(apiPath('/users/token/refresh/'), {
    method: 'POST',
    body: JSON.stringify({
      refresh
    }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok)
    return {
      error: 'Something Went Wrong! Please try Again.'
    };
  const data = await response.json();
  return data;
}
