import { isStringLengthInRange } from 'Utils';

export const isPassEmailRules = (email: string): boolean => {
  const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]*$/g;
  return regex.test(email);
};

export const isPassPasswordRules = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g;
  return regex.test(password);
};

export const isUserNameRules = (name: string): boolean => isStringLengthInRange(name, 1, 6);

export const validateUserRegister = (
  email: string,
  name: string,
  password: string,
  passwordConfirm: string,
): boolean => {
  if (!isPassEmailRules(email)) throw new Error('이메일 주소를 정확히 입력해주세요.');

  if (!isStringLengthInRange(name, 1, 6))
    throw new Error('이름은 1자에서 6자 이내로 입력하여야 합니다.');

  if (!isPassPasswordRules(password))
    throw new Error('비밀번호는 숫자와 영문을 포함하여 6자리 이상 입력하여야 합니다.');

  if (password !== passwordConfirm) throw new Error('비밀번호를 다시 확인해주세요.');

  return true;
};

export const validateUserLogin = (email: string, password: string): boolean => {
  if (!isPassEmailRules(email)) throw new Error('이메일 주소를 정확히 입력해주세요.');

  if (!isPassPasswordRules(password))
    throw new Error('비밀번호는 숫자와 영문을 포함하여 6자리 이상 입력하여야 합니다.');

  return true;
};

export const validateUserProfileEdit = (
  name: string,
  password: string,
  passwordConfirm: string,
): boolean => {
  if (!isStringLengthInRange(name, 1, 6))
    throw new Error('이름은 1자에서 6자 이내로 입력하여야 합니다.');

  if (!isPassPasswordRules(password))
    throw new Error('비밀번호는 숫자와 영문을 포함하여 6자리 이상 입력하여야 합니다.');

  if (password !== passwordConfirm) throw new Error('비밀번호를 다시 확인해주세요.');

  return true;
};
