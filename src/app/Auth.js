export function apiPath(route = '') {
  return process.env.NEXT_PUBLIC_API_URL + route;
}

/**
 * ! DISCLAIMER: Doesn't validate jwt
 * @param {string} token
 * @returns {username} userObject
 */
export function parseJwt(token) {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (error) {
    console.log(error);
    return {
      error: 'Invalid JWT'
    };
  }
}

export function isRevalidationRequired(access) {
  return !access || parseJwt(access).exp < Math.round(Date.now() / 1000) + 30;
}

export async function getUserAuthDetails() {
  try {
    const response = await fetch(apiPath('/users/token/refresh/'), {
      credentials: 'include'
    });
    if (!response.ok)
      return {
        access: null,
        username: null,
        id: null
      };

    const result = await response.json();

    return result;
  } catch (err) {
    console.log(err);
    return {
      access: null,
      username: null,
      id: null
    };
  }
}
