import { ERROR_MESSAGE } from '../constants';
import { checkUserDataValidate } from '../utils/userValidation';

describe('회원가입 유효성 테스트', () => {
  it('잘못된 이메일 주소로 계정 생성을 시도하면, 오류를 발생시킨다.', () => {
    const newUserData = {
      email: 'test@',
      name: 'test',
      password: '1q2w3e!!',
      passwordCheck: '1q2w3e!!',
      id: null,
    };

    expect(() => checkUserDataValidate(newUserData)).toThrowError(ERROR_MESSAGE.EMAIL_IS_INVALID);
  });

  it('이름의 길이가 2~6자 사이가 아니면, 오류를 발생시킨다.', () => {
    const newUserData = {
      email: 'test@test.com',
      name: 't',
      password: '1q2w3e!!',
      passwordCheck: '1q2w3e!!',
      id: null,
    };

    expect(() => checkUserDataValidate(newUserData)).toThrowError(ERROR_MESSAGE.NAME_LENGTH_IS_INVALID);

    newUserData.name = 'testest';
    expect(() => checkUserDataValidate(newUserData)).toThrowError(ERROR_MESSAGE.NAME_LENGTH_IS_INVALID);
  });
});
