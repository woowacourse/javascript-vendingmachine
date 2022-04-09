const BASE_URL = 'https://ahn-project.herokuapp.com';

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
};

export const requestRegister = (user) => {
  return request(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const requestLogin = (email, password) => {
  return request(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const requestUpdate = (user, id) => {
  return request(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const requestUserInfo = (id, accessToken) => {
  return request(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
