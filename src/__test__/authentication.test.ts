import UserStore from '../ts/domain/UserStore';
import { AUTHENTICATION_MESSAGE } from '../ts/constant/errorMessage';

describe('인증 입력 값 유효성 검사', () => {
  const userStore = new UserStore();

  const validEmail = 'woowa@test.email.com';
  const validName = 'woowa';
  const validPassword = 'abcd1234!';
  const validVerificationPassword = 'abcd1234!';

  test('입력한 이메일이 이메일 형식에 맞지 않으면 에러가 발생한다.', () => {
    const email = 'woowa!test.email.com';

    expect(() =>
      userStore.validateUserInfoInput({
        email,
        name: validName,
        password: validPassword,
        verificationPassword: validVerificationPassword,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.NOT_EMAIL_FORMAT);
  });

  test('입력한 이름의 길이가 2자보다 적으면 에러가 발생한다.', () => {
    const name = 'a';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: name,
        password: validPassword,
        verificationPassword: validVerificationPassword,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.EXCEED_NAME_LENGTH_RANGE);
  });

  test('입력한 이름의 길이가 6자보다 많으면 에러가 발생한다.', () => {
    const name = 'abcdefg';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: name,
        password: validPassword,
        verificationPassword: validVerificationPassword,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.EXCEED_NAME_LENGTH_RANGE);
  });

  test('입력한 비밀번호의 길이가 8자보다 적으면 에러가 발생한다.', () => {
    const password = 'a!12345';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: password,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.EXCEED_PASSWORD_LENGTH_RANGE);
  });

  test('입력한 비밀번호의 길이가 16자보다 많으면 에러가 발생한다.', () => {
    const password = 'a!123456789123456';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: password,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.EXCEED_PASSWORD_LENGTH_RANGE);
  });

  test('입력한 비밀번호에 영어가 들어가지 않으면 에러가 발생한다.', () => {
    const password = '1234567!';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: password,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT);
  });

  test('입력한 비밀번호에 숫자가 들어가지 않으면 에러가 발생한다.', () => {
    const password = 'abcdefg!';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: password,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT);
  });

  test('입력한 비밀번호에 특수문자(! # $ % & ( ) * + , - . / : ; < = > ? @)가 들어가지 않으면 에러가 발생한다.', () => {
    const password = 'abcd1234';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: password,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT);
  });

  test('입력한 비밀번호에 영어, 숫자, 특수문자(! # $ % & ( ) * + , - . / : ; < = > ? @) 이외의 문자가 들어가 있으면 에러가 발생한다.', () => {
    const password = 'abc123!!~';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: password,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT);
  });

  test('처음 입력한 비밀번호와 재입력한 비밀번호가 일치하지 않으면 에러가 발생한다.', () => {
    const password = 'a!123456';
    const verificationPassword = 'a!123457';

    expect(() =>
      userStore.validateUserInfoInput({
        email: validEmail,
        name: validName,
        password: password,
        verificationPassword: verificationPassword,
      })
    ).toThrow(AUTHENTICATION_MESSAGE.DIFFERENT_VERIFICATION_PASSWORD);
  });
});
