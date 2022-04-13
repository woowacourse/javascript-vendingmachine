const HOME_URL = 'https://vendingmachine-coke-test.herokuapp.com';
const DEV_URL = 'http://localhost:3000';

const postUserLogin = async data => {
  const response = await fetch(`${HOME_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });

  const res = await response.json();

  return res;
};

const putEditProfile = async ({ id, data }) => {
  const response = await fetch(`${HOME_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const res = await response.json();

  return res;
};

const postSingup = async data => {
  const response = await fetch(`${HOME_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const res = await response.json();

  return res;
};

export default {
  postUserLogin,
  putEditProfile,
  postSingup,
};
