import { ERROR_MESSAGE } from '../constants/errorConstants';
import { signValidate } from './signValidate';

describe('이메일, 이름, 비밀번호, 확인 비밀번호가 주어지면', () => {
  describe('이메일을 확인하여', () => {
    const name = '밧드';
    const password = 'qwerty1234!';
    const confirmPassword = 'qwerty1234!';

    test('한글이 들어가면 에러를 throw한다', () => {
      const email = '밧ndud5548@gmail.com';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.INVALID_EMAIL
      );
    });

    test('@앞 특수문자로 -_. 이외에 문자가 들어가면 에러를 throw한다.', () => {
      const email = '*ndud5548@gmail.com';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.INVALID_EMAIL
      );
    });

    test('@~.뒤 문자가 1이하 4이상이면 에러를 throw한다.', () => {
      const email = '*ndud5548@gmail.abcd';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.INVALID_EMAIL
      );
    });
  });

  describe('이름을 확인하여', () => {
    const email = 'dndud5548@gmail.com';
    const password = 'qwerty1234!';
    const confirmPassword = 'qwerty1234!';

    test('한글과 영문이 혼용되면 에러를 throw 한다.', () => {
      const name = '밧드bodde';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.INVALID_NAME
      );
    });

    test('한글 이름이 1자 이하 9이상이면 에러를 throw 한다.', () => {
      const name = '한빛가람무지개하늘';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.INVALID_NAME
      );
    });

    test('영어 이름의 fist name과 last name이 없다면 에러를 throw 한다.', () => {
      const name = 'donald';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.INVALID_NAME
      );
    });
  });

  describe('비밀번호를 확인하여', () => {
    const email = 'dndud5548@gmail.com';
    const name = '밧드';
    const confirmPassword = 'qwerty1234!';

    test('확인 비밀번호와 일치하지 않으면 에러를 throw한다.', () => {
      const password = 'werty1234!';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.NOT_MATCH_PASSWORD
      );
    });

    test('한 글자 이상의 문자가 없으면 에러를 throw한다.', () => {
      const password = '1234!';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.NOT_MATCH_PASSWORD
      );
    });

    test('한 글자 이상의 숫자가 없으면 에러를 throw한다.', () => {
      const password = 'werty!';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.NOT_MATCH_PASSWORD
      );
    });

    test('한 글자 이상의 특수문자가 없으면 에러를 throw한다.', () => {
      const password = 'werty1234';

      expect(() => signValidate.signUp({ email, name, password, confirmPassword })).toThrowError(
        ERROR_MESSAGE.INPUT_SIGN.NOT_MATCH_PASSWORD
      );
    });
  });
});
