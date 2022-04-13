const HOME_URL = 'https://vendingmachine-coke-test.herokuapp.com';
const DEV_URL = 'http://localhost:3000';

const postUserLogin = async data => {
  const response = await fetch(`${HOME_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });

  const res = await response.json();

  if (!response.ok) throw new Error(res);

  return res;
};

const putEditProfile = async ({ id, data }) => {
  const response = await fetch(`${HOME_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const res = await response.json();

  if (!response.ok) {
    if (response.status === 404) throw new Error('잘못된 id 입니다.');

    throw new Error(res);
  }

  return res;
};

const postSingup = async data => {
  const response = await fetch(`${HOME_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const res = await response.json();

  if (!response.ok) throw new Error(res);

  return res;
};

export default {
  postUserLogin,
  putEditProfile,
  postSingup,
};
