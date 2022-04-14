import { ALERT_MESSAGE, ERROR_MESSAGE, SERVER_URL } from '../constants';
import { User } from '../interfaces/UserData.interface';

const requestRegister = async (userData: User) => {
  const response = await fetch(SERVER_URL + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    switch (errorMessage) {
      case 'Password is too short':
        throw new Error(ERROR_MESSAGE.PASSWORD_IS_TOO_SHORT);
      case 'Email already exists':
        throw new Error(ERROR_MESSAGE.EMAIL_IS_DUPLICATED);
    }
    throw new Error(errorMessage);
  }

  return ALERT_MESSAGE.REGISTER_SUCCESS;
};

export default requestRegister;
