import { ALERT_MESSAGE, ERROR_MESSAGE } from '../constants';
import { LoginSuccess } from '../interfaces/apiStatus.interface';
import ApiWrapper from '../utils/ApiWrapper';

const apiWrapper = new ApiWrapper();

const requestLogin = async (accountData: Object) => {
  const response = await apiWrapper.post('/login', accountData);
  const dataResult: LoginSuccess | string = await response.json();

  if (typeof dataResult === 'string') {
    switch (dataResult) {
      case 'Cannot find user':
        throw new Error(ERROR_MESSAGE.USER_IS_NOT_EXIST);
      case 'Incorrect password':
        throw new Error(ERROR_MESSAGE.PASSWORD_IS_INCORRECT);
    }
    throw new Error(dataResult);
  }

  localStorage.setItem('accessToken', dataResult.accessToken);
  localStorage.setItem('user', JSON.stringify(dataResult.user));
  return ALERT_MESSAGE.LOGIN_SUCCESS(dataResult.user.name);
};

export default requestLogin;
