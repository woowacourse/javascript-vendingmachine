import { Auth } from '../domain/Auth';
import { ERROR_MESSAGE } from '../utils/constants';

describe('회원가입시 예외사항 테스트', () => {
  let auth;

  beforeEach(() => {
    auth = new Auth();
  });

  test('name은 2~6글자까지 가능하다', () => {
    const oneCharName = '1';
    expect(() => auth.isValidatedName(oneCharName)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_NAME_LENGTH)
    );

    const sevenCharsName = '1234567';
    expect(() => auth.isValidatedName(sevenCharsName)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_NAME_LENGTH)
    );
  });

  test('password는 8자 ~ 16자이고 영어, 숫자, 특수문자로 구성되있어야 한다.', () => {
    const sevenCharsPassword = 'Abc123!';
    expect(() => auth.isValidatedPassword(sevenCharsPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const seventeenCharsPassword = 'Abcdefghijk123!@#';
    expect(() => auth.isValidatedPassword(seventeenCharsPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const onlyEnglishPassword = 'abcdefgh';
    expect(() => auth.isValidatedPassword(onlyEnglishPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const onlyNumberPassword = '12345678';
    expect(() => auth.isValidatedPassword(onlyNumberPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const onlySymbolPassword = '!@#!@#!@';
    expect(() => auth.isValidatedPassword(onlySymbolPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const EnglishNumberPassword = 'abcd1234';
    expect(() => auth.isValidatedPassword(EnglishNumberPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const EnglishSymbolPassword = 'abcd!@#!';
    expect(() => auth.isValidatedPassword(EnglishSymbolPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );

    const NumberSymbolPassword = '1234!@#!';
    expect(() => auth.isValidatedPassword(NumberSymbolPassword)).toThrowError(
      new Error(ERROR_MESSAGE.INVALID_USER_PASSWORD)
    );
  });
});
