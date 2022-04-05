export function isEmail(str: string) {
  if (!str.includes('@')) return false;

  const atIndex = str.indexOf('@');

  if (atIndex === 0 || atIndex === str.length) return false;

  return true;
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
    test: !isEmail(email),
    errorMsg: '이메일 형식으로 입력해주세요.',
    target: 'email',
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
