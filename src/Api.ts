import { USER_SESSION_SETTING } from 'Constants';
import { getCookie } from 'Utils';

const HOST_NAME = 'https://api.vendingmachine.compy.life';

const addAuthorizationHeader = (headers: HeadersInit) => {
  const headersOption = new Headers(headers);
  const accessToken = getCookie(USER_SESSION_SETTING.TOKEN_COOKIE_NAME);

  accessToken && headersOption.set('Authorization', `Bearer ${accessToken}`);
  return headersOption;
};

const request = async (
  url: string,
  option: RequestInit,
  isAccessTokenEnable?: boolean,
): Promise<IRequest> => {
  const fetchOption = option;

  if (isAccessTokenEnable) fetchOption.headers = addAuthorizationHeader(option.headers);

  try {
    const response: Response = await fetch(HOST_NAME + url, fetchOption);
    const jsonBody = await response.json();

    return { status: response.ok ? 'success' : 'fail', content: jsonBody };
  } catch (error) {
    return { status: 'fail', content: `서버와의 통신에 실패하였습니다. (${error.message})` };
  }
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
