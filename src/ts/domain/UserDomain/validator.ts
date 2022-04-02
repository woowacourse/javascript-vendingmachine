import { USER_INFO_RULE } from '../../constants';
import { UserInfo } from '../types';

const validateUserInfo = (user: UserInfo, confirmPassword: string) => {
  const { email, name, password } = user;
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_PASSWORD_LENGTH } =
    USER_INFO_RULE;

  if (!email || !name || !password || !confirmPassword) {
    throw new Error('모든 값을 입력해주세요.');
  }
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    throw new Error(
      `사용자 이름은 ${MIN_NAME_LENGTH}~${MAX_NAME_LENGTH}자 이내여야 합니다.`,
    );
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`);
  }
  if (password !== confirmPassword) {
    throw new Error('비밀번호가 다릅니다. 다시 입력해주세요.');
  }
};

export { validateUserInfo };
