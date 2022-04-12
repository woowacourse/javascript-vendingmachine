import { ERROR_MESSAGE } from '../constants';
import { User } from '../interfaces/UserData.interface';
import ApiWrapper from '../utils/ApiWrapper';

const apiWrapper = new ApiWrapper();

const requestModifyUserData = async (userData: User) => {
  const response = await apiWrapper.put(`/users/${userData.id}`, userData);
  const dataResult: User | string = await response.json();

  if (typeof dataResult === 'string') {
    switch (dataResult) {
      case 'Password is too short':
        throw new Error(ERROR_MESSAGE.PASSWORD_IS_TOO_SHORT);
    }
    throw new Error(dataResult);
  }

  return dataResult;
};

export default requestModifyUserData;
