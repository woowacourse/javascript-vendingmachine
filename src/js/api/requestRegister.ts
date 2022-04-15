import { ERROR_MESSAGE } from '../constants';
import { User } from '../interfaces/UserData.interface';
import ApiWrapper from '../utils/ApiWrapper';

const apiWrapper = new ApiWrapper();

const requestRegister = async (userData: User) => {
  const response = await apiWrapper.post('/users', userData);

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

  return true;
};

export default requestRegister;
