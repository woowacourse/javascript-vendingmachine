import { UserInfoType, validateLoginBehavior } from '../ts/vendingMachine/authLogic';

import { LOGIN_ERROR_MESSAGE, REGISTER_ERROR_MESSAGE } from '../ts/constant/errorMessage';
import { validateRegisterBehavior } from '../ts/vendingMachine/authLogic';

describe('회원가입 입력값 유효성 테스트', () => {
  test('어떤 입력값이라도 공백이면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '',
      password: '1234!@#$abcd',
      confirmPassword: '1234!@#$abcd',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      REGISTER_ERROR_MESSAGE.BLANK_NOT_ALLOWED
    );
  });

  test('이름이 2 ~ 6 글자 사이가 아니면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박가나다라',
      password: '1234!@#$abcd',
      confirmPassword: '1234!@#$abcd',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      REGISTER_ERROR_MESSAGE.EXCEED_NAME_RANGE
    );
  });

  test('비밀번호가 8 글자 이상이 아니면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '김이박',
      password: '12!@abc',
      confirmPassword: '12!@abc',
    };
    expect(() => validateRegisterBehavior(userInfo)).toThrow(
      REGISTER_ERROR_MESSAGE.VIOLATE_PASSWORD_RULE
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
      REGISTER_ERROR_MESSAGE.VIOLATE_PASSWORD_RULE
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
      REGISTER_ERROR_MESSAGE.VIOLATE_PASSWORD_RULE
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
      REGISTER_ERROR_MESSAGE.NO_MATCH_PASSWORD_CONFIRM
    );
  });
});

describe('로그인 입력값 유효성 테스트', () => {
  test('어떤 입력값이라도 공백이면 에러가 발생한다.', () => {
    const email = 'a@woowahan.com';
    const password = '';

    expect(() => validateLoginBehavior(email, password)).toThrow(
      LOGIN_ERROR_MESSAGE.BLANK_NOT_ALLOWED
    );
  });
});
