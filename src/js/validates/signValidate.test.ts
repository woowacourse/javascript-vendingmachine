import { checkConfirmPassword, checkEmail, checkName, checkPassword } from './signValidate';

describe('이메일, 이름, 비밀번호, 확인 비밀번호가 주어지면', () => {
  describe('이메일을 확인하여', () => {
    test('한글이 들어가면 에러를 throw한다', () => {
      const email = '밧ndud5548@gmail.com';

      expect(checkEmail(email)).toBeFalsy();
    });

    test('@앞 특수문자로 -_. 이외에 문자가 들어가면 에러를 throw한다.', () => {
      const email = '*ndud5548@gmail.com';

      expect(checkEmail(email)).toBeFalsy();
    });

    test('@~.뒤 문자가 1이하 4이상이면 에러를 throw한다.', () => {
      const email = '*ndud5548@gmail.abcd';

      expect(checkEmail(email)).toBeFalsy();
    });
  });

  describe('이름을 확인하여', () => {
    test('한글과 영문이 혼용되면 에러를 throw 한다.', () => {
      const name = '밧드bodde';

      expect(checkName(name)).toBeFalsy();
    });

    test('한글 이름이 1자 이하 7자 이상이면 에러를 throw 한다.', () => {
      const name = '한빛가람무지개';

      expect(checkName(name)).toBeFalsy();
    });

    test('영어 이름의 fist name과 last name이 없다면 에러를 throw 한다.', () => {
      const name = 'donald';

      expect(checkName(name)).toBeFalsy();
    });
  });

  describe('비밀번호를 확인하여', () => {
    test('확인 비밀번호와 일치하지 않으면 에러를 throw한다.', () => {
      const password = 'werty1234!';
      const confirmPassword = 'qwerty1234!';

      expect(checkConfirmPassword(password, confirmPassword)).toBeFalsy();
    });

    test('한 글자 이상의 문자가 없으면 에러를 throw한다.', () => {
      const password = '1234!';

      expect(checkPassword(password)).toBeFalsy();
    });

    test('한 글자 이상의 숫자가 없으면 에러를 throw한다.', () => {
      const password = 'werty!';

      expect(checkPassword(password)).toBeFalsy();
    });

    test('한 글자 이상의 특수문자가 없으면 에러를 throw한다.', () => {
      const password = 'werty1234';

      expect(checkPassword(password)).toBeFalsy();
    });
  });
});
