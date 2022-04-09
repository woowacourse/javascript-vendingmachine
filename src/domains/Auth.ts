import { getCookie } from '../utils';
import { AUTH_BASE_URL } from '../constants';

export async function signup(email: string, name: string, password: string) {
  const response = await fetch(`${AUTH_BASE_URL}/register`, {
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
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
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

export function isLoggedIn() {
  const userId: string = getCookie('user_id');
  const accessToken: string = getCookie('access_token');

  return userId && userId !== '' && accessToken && accessToken !== '';
}

export async function getUser(): Promise<object> {
  const userId: string = getCookie('user_id');
  const accessToken: string = getCookie('access_token');

  if (!isLoggedIn()) return undefined;

  const response = await fetch(`${AUTH_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user: Promise<object> = await response.json();

  return user;
}
