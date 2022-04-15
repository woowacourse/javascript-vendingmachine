const HOME_URL = 'https://json-vendingmachine-server.herokuapp.com';

export const logIn = data => {
  const response = fetch(`${HOME_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  }).then(res => {
    return res.json();
  });

  return response;
};

export const editProfile = (id, data) => {
  const response = fetch(`${HOME_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  }).then(res => {
    return res.json();
  });

  return response;
};

export const singUp = data => {
  const response = fetch(`${HOME_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  }).then(res => {
    return res.json();
  });

  return response;
};
