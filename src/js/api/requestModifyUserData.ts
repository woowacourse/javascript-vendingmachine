import { ALERT_MESSAGE, ERROR_MESSAGE } from '../constants';
import { User } from '../interfaces/UserData.interface';
import ApiWrapper from '../utils/ApiWrapper';

const apiWrapper = new ApiWrapper();

const requestModifyUserData = async (userData: User) => {
  const response = await apiWrapper.put(`/users/${userData.id}`, userData);
  const dataResult = await response.json();

  if (!response.ok) {
    switch (dataResult) {
      case 'Password is too short':
        throw new Error(ERROR_MESSAGE.PASSWORD_IS_TOO_SHORT);
    }
    throw new Error(dataResult);
  }

  const updatedInfo = {
    email: dataResult.email,
    name: dataResult.name,
    id: dataResult.id,
  };

  localStorage.setItem('user', JSON.stringify(updatedInfo));
  return ALERT_MESSAGE.USER_INFO_MODIFY_SUCCESS;
};

export default requestModifyUserData;
