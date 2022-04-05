import { REGISTER_ERROR_MESSAGE } from '../constant/errorMessage';
import { REGISTER } from '../constant/rule';

export type UserInfoType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

class RegisterUser {
  validateRegisterBehavior({ name, password, confirmPassword }: UserInfoType) {
    if (this.isExceedNameRange(name)) {
      throw new Error(REGISTER_ERROR_MESSAGE.EXCEED_NAME_RANGE);
    }

    if (this.isViolatePasswordRule(password)) {
      throw new Error(REGISTER_ERROR_MESSAGE.VIOLATE_PASSWORD_RULE);
    }

    if (this.isNotMatchWithPassword(password, confirmPassword)) {
      throw new Error(REGISTER_ERROR_MESSAGE.NO_MATCH_PASSWORD_CONFIRM);
    }
  }

  private isExceedNameRange(name: string) {
    return name.length < REGISTER.NAME_MIN_LENGTH || name.length > REGISTER.NAME_MAX_LENGTH;
  }
  private isViolatePasswordRule(password: string) {
    return !REGISTER.PASSWORD_RULE.test(password);
  }
  private isNotMatchWithPassword(password: string, confirmPassword: string) {
    return password !== confirmPassword;
  }
}

export default RegisterUser;
