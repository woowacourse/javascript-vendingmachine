import { manageErrors } from '../utils/domUtil';

const baseURL = 'https://dory-vending-machine.herokuapp.com';

interface UserInfo {
  email: string;
  name: string;
  password: string;
}

export const registerUser = async (userInfo: UserInfo) => {
  const response = await fetch(`${baseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch(({ message }) => {
      throw new Error(message);
    });

  return response;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${baseURL}/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch(({ message }) => {
      throw new Error(message);
    });

  return response;
};

export const editUser = async (id: string, userInfo: UserInfo) => {
  await fetch(`${baseURL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(manageErrors)
    .then((res) => res.json())
    .catch(({ message }) => {
      throw new Error(message);
    });
};

export const deleteUser = async (id: string) => {
  await fetch(`${baseURL}/users/${id}`, {
    method: 'DELETE',
  })
    .then(manageErrors)
    .then((res) => res.json())
    .catch(({ message }) => {
      throw new Error(message);
    });
};
