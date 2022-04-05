import { REGISTER_ERROR_MESSAGE } from '../ts/constant/errorMessage';
import type { UserInfoType } from '../ts/vendingMachine/RegisterUser';
import RegisterUser from '../ts/vendingMachine/RegisterUser';

describe('회원가입 입력값 유효성 테스트', () => {
  const registerUser = new RegisterUser();

  test('어떤 입력값이라도 공백이면 에러가 발생한다.', () => {
    const userInfo: UserInfoType = {
      email: 'a@woowahan.com',
      name: '',
      password: '1234!@#$abcd',
      confirmPassword: '1234!@#$abcd',
    };
    expect(() => registerUser.validateRegisterBehavior(userInfo)).toThrow(
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
    expect(() => registerUser.validateRegisterBehavior(userInfo)).toThrow(
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
    expect(() => registerUser.validateRegisterBehavior(userInfo)).toThrow(
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
    expect(() => registerUser.validateRegisterBehavior(userInfo)).toThrow(
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
    expect(() => registerUser.validateRegisterBehavior(userInfo)).toThrow(
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
    expect(() => registerUser.validateRegisterBehavior(userInfo)).toThrow(
      REGISTER_ERROR_MESSAGE.NO_MATCH_PASSWORD_CONFIRM
    );
  });
});
