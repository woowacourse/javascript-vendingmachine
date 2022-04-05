import { USER_NAME_RULE } from '../constants';
import { RegExp } from '../utils/regexp';

function isProperLength(name: string) {
  return name.length >= USER_NAME_RULE.MIN && name.length <= USER_NAME_RULE.MAX;
}

interface Validator {
  test: boolean;
  errorMsg: string;
  target: 'email' | 'pw' | 'name';
}

const generateValidator = (
  email: string,
  pw: string,
  name: string,
): Validator[] => [
  {
    test: !RegExp.email.test(email),
    errorMsg: '이메일 형식으로 입력해주세요.',
    target: 'email',
  },
  {
    test: !isProperLength(name),
    errorMsg: `이름은 ${USER_NAME_RULE.MIN}~${USER_NAME_RULE.MAX}자로 입력해주세요.`,
    target: 'name',
  },
  {
    test: !RegExp.pw.test(pw),
    errorMsg: `비밀번호는 8~20자이어야 하며, 숫자/대문자/소문자/특수문자를 하나 이상 포함해야 합니다.`,
    target: 'pw',
  },
];

export function validateSignup(email: string, pw: string, name: string) {
  const validator = generateValidator(email, pw, name);
  return validator.every(({ test, errorMsg, target }) => {
    if (test) {
      const error = new Error(errorMsg);
      error.name = target;
      throw error;
    }
    return true;
  });
}
