import Auth from '../Auth';

function register(userInfo = {}) {
  const data = {
    email: userInfo.email ?? 'woowacourse@gmail.com',
    name: userInfo.name ?? '우테코',
    password: userInfo.password ?? 'woowacourse123!',
    passwordConfirm: userInfo.passwordConfirm ?? 'woowacourse123!',
  };

  return Auth.register(data);
}

describe('회원가입 기능 테스트', () => {
  test('이메일을 입력하지 않으면, 오류가 발생한다.', () => {
    const email = '';

    expect(() => register({ email })).toThrow('이메일을 입력해주세요.');
  });

  test('이메일에 공백이 포함되면, 오류가 발생한다.', () => {
    const email = 'woowacou rse@gmail.com';

    expect(() => register({ email })).toThrow('이메일은 공백을 포함할 수 없습니다.');
  });

  test('이름을 입력하지 않으면, 오류가 발생한다.', () => {
    const name = '';

    expect(() => register({ name })).toThrow('이름을 입력해주세요.');
  });

  test('이름에 공백이 포함되면, 오류가 발생한다.', () => {
    const name = '김상 록';

    expect(() => register({ name })).toThrow('이름은 공백을 포함할 수 없습니다.');
  });

  test('이름을 2자 미만으로 입력 시, 오류가 발생한다.', () => {
    const name = '록';

    expect(() => register({ name })).toThrowError(
      '이름은 2자 미만이거나 6자를 초과할 수 없습니다.'
    );
  });

  test('이름을 6자 초과로 입력 시, 오류가 발생한다.', () => {
    const name = '우아한테크코스';

    expect(() => register({ name })).toThrowError(
      '이름은 2자 미만이거나 6자를 초과할 수 없습니다.'
    );
  });

  test('비밀번호를 입력하지 않으면, 오류가 발생한다.', () => {
    const password = '';

    expect(() => register({ password })).toThrow('비밀번호를 입력해주세요.');
  });

  test('비밀번호에 공백이 포함되면, 오류가 발생한다.', () => {
    const password = 'woowa course123';

    expect(() => register({ password })).toThrow('비밀번호는 공백을 포함할 수 없습니다.');
  });

  test('비밀번호를 10자리 미만으로 입력 시, 오류가 발생한다.', () => {
    const password = 'woowa123!';

    expect(() => register({ password })).toThrowError(
      '비밀번호는 10자 미만일 수 없습니다.'
    );
  });

  test('비밀번호를 오직 영어 대문자로 입력 시, 오류가 발생한다.', () => {
    const password = 'WOOWACOURSE';

    expect(() => register({ password })).toThrowError(
      '비밀번호는 소문자, 대문자, 숫자, 특수문자 중 2가지를 혼합해야 합니다.'
    );
  });

  test('비밀번호를 오직 영어 소문자로 입력 시, 오류가 발생한다.', () => {
    const password = 'woowacourse';

    expect(() => register({ password })).toThrowError(
      '비밀번호는 소문자, 대문자, 숫자, 특수문자 중 2가지를 혼합해야 합니다.'
    );
  });

  test('비밀번호를 오직 숫자로 입력 시, 오류가 발생한다.', () => {
    const password = '123123123123';

    expect(() => register({ password })).toThrowError(
      '비밀번호는 소문자, 대문자, 숫자, 특수문자 중 2가지를 혼합해야 합니다.'
    );
  });

  test('비밀번호를 오직 특수문자로 입력 시, 오류가 발생한다.', () => {
    const password = '!@#!@#!@#$%^$%^';

    expect(() => register({ password })).toThrowError(
      '비밀번호는 소문자, 대문자, 숫자, 특수문자 중 2가지를 혼합해야 합니다.'
    );
  });

  test('비밀번호 확인을 입력하지 않으면, 오류가 발생한다.', () => {
    const passwordConfirm = '';

    expect(() => register({ passwordConfirm })).toThrow('비밀번호 확인을 입력해주세요.');
  });

  test('비밀번호 확인에 공백이 포함되면, 오류가 발생한다.', () => {
    const passwordConfirm = 'woowa course123';

    expect(() => register({ passwordConfirm })).toThrow(
      '비밀번호 확인은 공백을 포함할 수 없습니다.'
    );
  });

  test('비밀번호와 비밀번호 확인이 일치하지 않으면, 오류가 발생한다.', () => {
    const password = 'happyday123!';
    const passwordConfirm = 'goodday123!';

    expect(() => register({ password, passwordConfirm })).toThrowError(
      '비밀번호와 비밀번호 확인이 일치해야 합니다.'
    );
  });

  test('회원가입을 정상적으로 할 수 있다.', () => {});
});
