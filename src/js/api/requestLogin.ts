import { ALERT_MESSAGE, ERROR_MESSAGE } from '../constants';

const requestLogin = async (accountData: Object) => {
  const response = await fetch('http://localhost:3000/login', {
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

  localStorage.setItem('user', JSON.stringify(dataResult));
  return ALERT_MESSAGE.LOGIN_SUCCESS(dataResult.name);
};

export default requestLogin;
