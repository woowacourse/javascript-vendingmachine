import { USER_SESSION_SETTING } from 'Constants';
import { getCookie } from 'Utils';

const HOST_NAME = 'https://api.vendingmachine.compy.life';

const request = async (
  url: string,
  option: RequestInit,
  accessTokenEnable?: boolean,
): Promise<IRequest> => {
  const fetchOption = option;

  if (accessTokenEnable) {
    const headersOption = new Headers(option.headers);
    const accessToken = getCookie(USER_SESSION_SETTING.TOKEN_COOKIE_NAME);

    accessToken && headersOption.set('Authorization', `Bearer ${accessToken}`);
    fetchOption.headers = headersOption;
  }

  const response: Response = await fetch(HOST_NAME + url, fetchOption);
  const data = await response.json();

  return { status: response.ok, content: data };
};

export const requestRegister = async (email: string, name: string, password: string) => {
  const response = await request('/register', {
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

  return response;
};

export const requestLogin = async (email: string, password: string) => {
  const response = await request(
    '/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
    true,
  );

  return response;
};

export const requestUserInfo = async (id: number) => {
  const response = await request(
    `/users/${id}`,
    {
      method: 'GET',
    },
    true,
  );

  return response;
};

export const requestProfileEdit = async (id: number, name: string, password: string) => {
  const response = await request(
    `/users/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    },
    true,
  );

  return response;
};
