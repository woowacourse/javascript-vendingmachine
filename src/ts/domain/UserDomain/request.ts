import { UserInfo } from '../types';

type RequestType = 'signin' | 'signup';
const baseUrl = 'https://heroku-vending-lv1.herokuapp.com' as const;

const makeResponseDataType = <T>(response): T => response as T;

const requestSign = async (purpose: RequestType, user: UserInfo) => {
  const url = `${baseUrl}/${purpose === 'signup' ? 'register' : 'login'}`;
  type signResponseType = {
    accessToken: string;
    user: { email: string; id: string; name: string; password: string };
  };
  let resInfo: signResponseType;

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async response => {
    if (!response.ok) {
      throw new Error();
    }
    await response.json().then(res => {
      resInfo = makeResponseDataType<signResponseType>(res);
    });
  });

  return resInfo;
};

const requestUpdate = async (user: UserInfo, id: string) => {
  const url = `${baseUrl}/users/${id}`;
  type updateResponseType = {
    email: string;
    id: string;
    name: string;
    password: string;
  };
  let resInfo: updateResponseType;

  await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async response => {
    if (!response.ok) {
      throw new Error();
    }
    await response.json().then(res => {
      resInfo = makeResponseDataType<updateResponseType>(res);
    });
  });

  return resInfo;
};

export { requestSign, requestUpdate };
