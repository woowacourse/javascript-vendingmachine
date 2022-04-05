import { ALERT_MESSAGE, ERROR_MESSAGE } from '../constants';
import { RegisterUser } from '../interfaces/UserData.interface';

const requestRegister = async (userData: RegisterUser) => {
  const response = await fetch('http://localhost:3000/users', {
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
  }

  return ALERT_MESSAGE.REGISTER_SUCCESS;
};

export default requestRegister;
