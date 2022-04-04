import { MEMBER } from './constants';
import Router from './router';
import { showSnack } from './utils';

export async function login(email: BodyInit, password: BodyInit) {
  if (!email) {
    showSnack(MEMBER.PLEASE_EMAIL);
    return;
  }
  if (!password) {
    showSnack(MEMBER.PLEASE_PASSWORD);
    return;
  }

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const info = await response.json();

  if (!response.ok) {
    showSnack(info);
    return;
  }

  const user = {
    key: info.accessToken,
    id: info.user.id,
    name: info.user.name,
  };
  localStorage.setItem('user-info', JSON.stringify(user));

  showSnack(MEMBER.SUCCESS_LOGIN);
  Router.pushState('/');
}

export async function signUp(email: string, name: string, password: string) {
  const response = await fetch('http://localhost:3000/register', {
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
  const info = await response.json();
  if (!response.ok) {
    showSnack(info);
    return;
  }
  showSnack(MEMBER.SUCCESS_SIGN_UP);
  Router.pushState('/');
}

export async function updateInfo(name: string, password: string) {
  const userInfo = await localStorage.getItem('user-info');
  if (!userInfo) {
    return undefined;
  }
  const user = JSON.parse(userInfo);

  const response = await fetch(`http://localhost:3000/600/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.key}`,
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });
  const info = await response.json();

  if (!response.ok) {
    showSnack(info);
    return;
  }
  showSnack(MEMBER.SUCCESS_MODIFY_INFO);
  Router.pushState('/');
}

export async function getUserInfo() {
  const userInfo = await localStorage.getItem('user-info');

  if (!userInfo) {
    return undefined;
  }
  const user = JSON.parse(userInfo);

  const response = await fetch(`http://localhost:3000/600/users/${user.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.key}`,
    },
  });

  const body = await response.json();

  return body;
}
