type UserInfoType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const validateRegisterBehavior = ({ name, password, confirmPassword }: UserInfoType) => {
  if (name.length < 2 || name.length > 6) {
    throw new Error('이름은 2 ~ 4 글자로 입력해주세요.');
  }

  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (!passwordRule.test(password)) {
    throw new Error(
      '비밀번호는 8글자 이상, 20글자 이하이고, 숫자 영문 특수기호가 최소 한 글자 이상 포함되어야 합니다.'
    );
  }

  if (password !== confirmPassword) {
    throw new Error('비밀번호와 확인이 일치하지 않습니다. 다시 입력해주세요.');
  }
};

describe('회원가입 입력값 유효성 테스트', () => {
  test('이름이 2 ~ 6 글자 사이가 아니면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박가나다라',
      password: '1234!@#$abcd',
      confirmPassword: '1234!@#$abcd',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow('이름은 2 ~ 4 글자로 입력해주세요.');
  });

  test('비밀번호가 8 글자 이상이 아니면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박',
      password: '12!@abc',
      confirmPassword: '12!@abc',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      '비밀번호는 8글자 이상, 20글자 이하이고, 숫자 영문 특수기호가 최소 한 글자 이상 포함되어야 합니다.'
    );
  });

  test('비밀번호가 20 글자 이하가 아니면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박',
      password: '12!@abcdefghijklmnopqrstuvwxyz',
      confirmPassword: '12!@abc',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      '비밀번호는 8글자 이상, 20글자 이하이고, 숫자 영문 특수기호가 최소 한 글자 이상 포함되어야 합니다.'
    );
  });

  test('비밀번호에 숫자, 영문, 특수기호가 최소 한 글자 이상 포함되지 않으면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박',
      password: '1234!@#$',
      confirmPassword: '1234!@#$',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      '비밀번호는 8글자 이상, 20글자 이하이고, 숫자 영문 특수기호가 최소 한 글자 이상 포함되어야 합니다.'
    );
  });

  test('비밀번호와 비밀번호 확인이 같지 않으면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박',
      password: '1234!@#$abcd',
      confirmPassword: '1234!@#$abc',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      '비밀번호와 확인이 일치하지 않습니다. 다시 입력해주세요.'
    );
  });
});
