import { ALERT_MESSAGE, ERROR_MESSAGE, SERVER_URL } from '../constants';

const requestLogin = async (accountData: Object) => {
  const response = await fetch(SERVER_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });

  const dataResult = await response.json();

  if (!response.ok) {
    switch (dataResult) {
      case 'Cannot find user':
        throw new Error(ERROR_MESSAGE.USER_IS_NOT_EXIST);
      case 'Incorrect password':
        throw new Error(ERROR_MESSAGE.PASSWORD_IS_INCORRECT);
    }
  }

  localStorage.setItem('accessToken', dataResult.accessToken);
  localStorage.setItem('user', JSON.stringify(dataResult.user));
  return ALERT_MESSAGE.LOGIN_SUCCESS(dataResult.user.name);
};

export default requestLogin;
