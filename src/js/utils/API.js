const fetcher = async (method, path, body) =>
  fetch(`https://json-web-server-ronci.herokuapp.com/${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const signup = (name, email, password) =>
  fetcher('POST', 'register', { name, email, password });
export const login = (email, password) => fetcher('POST', 'login', { email, password });
export const modifyUserInfo = (name, email, password, id) =>
  fetcher('PATCH', `users/${id}`, { name, email, password });
