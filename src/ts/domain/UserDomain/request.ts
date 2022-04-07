import { UserInfo } from '../types';

type RequestType = 'signin' | 'signup';
const baseUrl = 'https://heroku-vending-lv1.herokuapp.com' as const;

const requestSign = async (purpose: RequestType, user: UserInfo) => {
  const url = `${baseUrl}/${purpose === 'signup' ? 'register' : 'login'}`;
  let resInfo;

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
      resInfo = res;
    });
  });

  return resInfo;
};

const requestUpdate = async (user: UserInfo, id: string) => {
  const url = `${baseUrl}/users/${id}`;
  let resInfo;

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
      resInfo = res;
    });
  });

  return resInfo;
};

export { requestSign, requestUpdate };
