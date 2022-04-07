import { getCookie } from '../utils';

export async function signup(email: string, name: string, password: string) {
  const response = await fetch('https://vendingmachine-auth-server.herokuapp.com/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  });
  const jsonResponse = await response.json();

  if (!jsonResponse.accessToken) {
    throw new Error(jsonResponse);
  }
}

export async function login(email: string, password: string) {
  const response = await fetch('https://vendingmachine-auth-server.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const jsonResponse = await response.json();

  if (!jsonResponse.accessToken) {
    throw new Error(jsonResponse);
  }

  document.cookie = `user_id=${jsonResponse.user.id}`;
  document.cookie = `access_token=${jsonResponse.accessToken}`;
}

export function logout() {
  document.cookie = `user_id=`;
  document.cookie = `access_token=`;
}

export async function getUser(): Promise<object> {
  const userId: string = getCookie('user_id');
  const accessToken: string = getCookie('access_token');

  const response = await fetch(`https://vendingmachine-auth-server.herokuapp.com/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user: Promise<object> = await response.json();

  return user;
}

export function isLoggedIn() {
  const userId: string = getCookie('user_id');
  const accessToken: string = getCookie('access_token');

  return userId !== '' && accessToken !== '';
}
