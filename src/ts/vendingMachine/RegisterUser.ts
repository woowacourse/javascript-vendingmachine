import { REGISTER_ERROR_MESSAGE } from '../constant/errorMessage';
import { REGISTER } from '../constant/rule';

export type UserInfoType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

class RegisterUser {
  async register(userInfo: UserInfoType) {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      return [response.ok, await response.json()];
    } catch (error) {
      throw new Error('회원가입에 실패했습니다. 개발자에게 문의해주세요.');
    }
  }

  validateRegisterBehavior({ email, name, password, confirmPassword }: UserInfoType) {
    if (this.isBlankInput(email, name, password, confirmPassword)) {
      throw new Error(REGISTER_ERROR_MESSAGE.BLANK_NOT_ALLOWED);
    }

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

  private isBlankInput(email: string, name: string, password: string, confirmPassword: string) {
    return !email.length || !name.length || !password.length || !confirmPassword.length;
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
