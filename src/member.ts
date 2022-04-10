import { API_ERROR, MEMBER } from './constatns/auth-constants';
import { ACTION } from './constatns/flux-constants';
import createAction from './flux/createAction';
import Store from './flux/store';
import Router from './router';
import { consoleErrorWithConditionalAlert, showSnack } from './utils';

const API = 'https://nine-db-api.herokuapp.com';

export async function login(email: BodyInit, password: BodyInit) {
  try {
    const response = await fetch(`${API}/login`, {
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

    Store.instance.dispatch(createAction(ACTION.LOGIN, { email, name: info.user.name }));
    showSnack(MEMBER.SUCCESS_LOGIN);
    Router.pushState('/');
  } catch (e: any) {
    consoleErrorWithConditionalAlert(e);
    showSnack(e.message);
  }
}

export async function signUp(email: string, name: string, password: string) {
  try {
    const response = await fetch(`${API}/register`, {
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
  } catch (e: any) {
    consoleErrorWithConditionalAlert(e);
    showSnack(e.message);
  }
}

export async function updateInfo(name: string, password: string) {
  const userInfo = await localStorage.getItem('user-info');
  if (!userInfo) {
    showSnack(API_ERROR.NON_EXIST_MEMBER);
    return undefined;
  }

  const user = JSON.parse(userInfo);

  try {
    const response = await fetch(`${API}/600/users/${user.id}`, {
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
  } catch (e: any) {
    consoleErrorWithConditionalAlert(e);
    showSnack(e.message);
  }
}

export async function getUserInfo() {
  const userInfo = await localStorage.getItem('user-info');
  if (!userInfo) {
    showSnack(API_ERROR.NON_EXIST_MEMBER);
    return undefined;
  }
  const user = JSON.parse(userInfo);

  try {
    const response = await fetch(`${API}/600/users/${user.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.key}`,
      },
    });

    if (!response.ok) {
      throwAPIError(response.status);
    }

    const body = await response.json();
    return body;
  } catch (e: any) {
    showSnack(e.message);
    consoleErrorWithConditionalAlert(e);
  }
}

function throwAPIError(status: number) {
  switch (status) {
    case 400:
      throw new Error(API_ERROR.INVALID_API);
    case 401:
      throw new Error(API_ERROR.INVALID_LOGIN_INFO);
    case 403:
      throw new Error(API_ERROR.NON_AUTHORIZED_USER);
    case 404:
      throw new Error(API_ERROR.CANNOT_FIND_PAGE);
    default:
      throw new Error(API_ERROR.DEFAULT_ERROR);
  }
}
