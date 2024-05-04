export function apiPath(route) {
  return process.env.NEXT_PUBLIC_API_URL + route;
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
