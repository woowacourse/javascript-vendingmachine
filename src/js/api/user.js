const baseURL = 'https://immense-spire-44992.herokuapp.com/';

const userFetcher = async ({ method, path, token, body = {} }) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${baseURL}${path}`, {
    method,
    body: JSON.stringify(body),
    headers,
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw Error(errorMessage);
  }
  return response.json();
};

const UserApi = {
  signIn: (email, password) =>
    userFetcher({ method: 'POST', path: 'login', body: { email, password } }),

  signUp: (email, name, password) =>
    userFetcher({ method: 'POST', path: 'signup', body: { email, password, name } }),

  searchInfo: (token) => userFetcher({ method: 'GET', path: 'user/me', token }),

  update: (token, id, body) =>
    userFetcher({ method: 'PUT', path: `users/${id}`, token, body }),
};

export default UserApi;
