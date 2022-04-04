const isNotEmailFormat = (email: string): boolean | never => {
  const emailRegex = /[0-9a-zA-Z]+@([0-9a-zA-Z]+)(.[0-9a-zA-Z]+){1,2}$/;

  if (emailRegex.test(email)) {
    return true;
  }

  throw new Error('이메일 형식에 맞지 않습니다.');
};

const isValidNameRange = (name: string): boolean | never => {
  if (name.length >= 2 && name.length <= 6) {
    return true;
  }

  throw new Error('이름은 2글자 이상 6글자 이하로 작성해 주세요.');
};

const isValidPasswordRange = (password: string): boolean | never => {
  if (password.length >= 8 && password.length <= 16) {
    return true;
  }

  throw new Error('비밀번호는 8글자 이상 16글자 이하로 작성해 주세요.');
};

const isSameVerificationPassword = (
  password: string,
  verificationPassword: string
): boolean | never => {
  if (password === verificationPassword) {
    return true;
  }

  throw new Error(
    '비밀번호와 비밀번호 확인이 일치하지 않습니다. 비밀번호 확인을 다시 입력해주세요.'
  );
};

describe('인증 입력 값 유효성 검사', () => {
  test('입력한 이메일이 이메일 형식에 맞지 않으면 에러가 발생한다.', () => {
    const email = 'woowa!test.email.com';

    expect(() => isNotEmailFormat(email)).toThrow('이메일 형식에 맞지 않습니다.');
  });

  test('입력한 이름의 길이가 2자보다 적으면 에러가 발생한다.', () => {
    const name = 'a';

    expect(() => isValidNameRange(name)).toThrow('이름은 2글자 이상 6글자 이하로 작성해 주세요.');
  });

  test('입력한 이름의 길이가 6자보다 많으면 에러가 발생한다.', () => {
    const name = 'a';

    expect(() => isValidNameRange(name)).toThrow('이름은 2글자 이상 6글자 이하로 작성해 주세요.');
  });

  test('입력한 비밀번호의 길이가 8자보다 많으면 에러가 발생한다.', () => {
    const password = 'a!12345';

    expect(() => isValidPasswordRange(password)).toThrow(
      '비밀번호는 8글자 이상 16글자 이하로 작성해 주세요.'
    );
  });

  test('입력한 비밀번호의 길이가 16자보다 적으면 에러가 발생한다.', () => {
    const password = 'a!123456789123456';

    expect(() => isValidPasswordRange(password)).toThrow(
      '비밀번호는 8글자 이상 16글자 이하로 작성해 주세요.'
    );
  });

  test('처음 입력한 비밀번호와 재입력한 비밀번호가 일치하지 않으면 에러가 발생한다.', () => {
    const password = 'a!123456789123456';
    const verificationPassword = 'a!123456789123455';

    expect(() => isSameVerificationPassword(password, verificationPassword)).toThrow(
      '비밀번호와 비밀번호 확인이 일치하지 않습니다. 비밀번호 확인을 다시 입력해주세요.'
    );
  });
});
