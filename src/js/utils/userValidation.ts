import { ALERT_MESSAGE, ERROR_MESSAGE } from '../constants';
import { RegisterUser } from '../interfaces/UserData.interface';
import { checkEmailValidation, checkPasswordValidation } from './RegExpCheck';

export const checkUserDataValidate = (userData: RegisterUser) => {
  if (userData.password !== userData.passwordCheck) {
    throw new Error(ERROR_MESSAGE.PASSWORDCHECK_IS_NOT_EQUAL);
  }

  if (!checkEmailValidation(userData.email)) {
    throw new Error(ERROR_MESSAGE.EMAIL_IS_INVALID);
  }

  if (!checkPasswordValidation(userData.password)) {
    throw new Error(ERROR_MESSAGE.PASSWORD_IS_INVALID);
  }

  return ALERT_MESSAGE.WAITING_STATE;
};
