import { BASE_SERVER_URL, ERROR_MESSAGE } from './constants';

const ERROR_MESSAGES = {
  'Email already exists': ERROR_MESSAGE.ALREADY_EXIST_EMAIL,
  'Cannot find user': ERROR_MESSAGE.NOT_EXIST_USER,
  'Incorrect password': ERROR_MESSAGE.WRONG_PASSWORD_LOGIN,
};

export const userHTTPRequest = async ({ method, body, path }) => {
  try {
    const response = await fetch(`${BASE_SERVER_URL}/${path}/`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json;
  } catch ({ message }) {
    throw new Error(ERROR_MESSAGES[message]);
  }
};
