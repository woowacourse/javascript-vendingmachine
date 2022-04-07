import { ADMIN_DATA_RULES, ERROR_MESSAGE } from '../constant';
import validator from '../interactor/validator';

describe('회원 가입', () => {
  it(`이메일 형식이 잘못됐을 때, 회원 가입할 수 없다.`, () => {
    const adminData = { email: 'asd', name: 'hi', password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.INVALID_FORM_EMALI);
  });

  it(`이름이 ${ADMIN_DATA_RULES.MIN_NAME_LENGTH - 1}글자일 때, 회원 가입, 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'h'.repeat(ADMIN_DATA_RULES.MIN_NAME_LENGTH - 1), password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_NAME);
  });

  it(`이름이 ${ADMIN_DATA_RULES.MAX_NAME_LENGTH + 1}글자일 때, 회원 가입, 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'h'.repeat(ADMIN_DATA_RULES.MAX_NAME_LENGTH + 1), password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_NAME);
  });

  it(`비밀번호가 ${ADMIN_DATA_RULES.MIN_PASSWORD_LENGTH - 1}글자일 때, 회원 가입, 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'asdf12', passwordConfirmation: 'asdf12' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_PASSWORD);
  });

  it(`비밀번호가 ${ADMIN_DATA_RULES.MAX_PASSWORD_LENGTH + 1}글자일 때, 회원 가입, 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'abcde12345123456', passwordConfirmation: 'abcde12345123456' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_PASSWORD);
  });

  it('비밀번호가 문자로만 이뤄졌을 때, 회원 가입, 수정할 수 없다.', () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'abcdabcde', passwordConfirmation: 'abcdabcde' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.INVALID_FORM_ADMIN_PASSWORD);
  });

  it('비밀번호가 숫자로만 이뤄졌을 때, 회원 가입, 수정할 수 없다.', () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: '12345123', passwordConfirmation: '12345123' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.INVALID_FORM_ADMIN_PASSWORD);
  });

  it('비밀번호와 비밀번호 확인이 일치하지 않을 때, 회원 가입, 수정할 수 없다.', () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'asdf123', passwordConfirmation: 'asdf125' };
    const test = () => validator.checkSignupAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.MISMATCH_PASSWORD_CONFIRMATION);
  });
});

describe('회원 수정', () => {
  it(`이름이 ${ADMIN_DATA_RULES.MIN_NAME_LENGTH - 1}글자일 때, 회원 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'h'.repeat(ADMIN_DATA_RULES.MIN_NAME_LENGTH - 1), password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_NAME);
  });

  it(`이름이 ${ADMIN_DATA_RULES.MAX_NAME_LENGTH + 1}글자일 때, 회원 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'h'.repeat(ADMIN_DATA_RULES.MAX_NAME_LENGTH + 1), password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_NAME);
  });

  it(`비밀번호가 ${ADMIN_DATA_RULES.MIN_PASSWORD_LENGTH - 1}글자일 때, 회원 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'asdf12', passwordConfirmation: 'asdf12' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_PASSWORD);
  });

  it(`비밀번호가 ${ADMIN_DATA_RULES.MAX_PASSWORD_LENGTH + 1}글자일 때, 회원 수정할 수 없다.`, () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'abcde12345123456', passwordConfirmation: 'abcde12345123456' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_PASSWORD);
  });

  it('비밀번호가 문자로만 이뤄졌을 때, 회원 수정할 수 없다.', () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'abcdabcde', passwordConfirmation: 'abcdabcde' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.INVALID_FORM_ADMIN_PASSWORD);
  });

  it('비밀번호가 숫자로만 이뤄졌을 때, 회원 수정할 수 없다.', () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: '12345123', passwordConfirmation: '12345123' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.INVALID_FORM_ADMIN_PASSWORD);
  });

  it('비밀번호와 비밀번호 확인이 일치하지 않을 때, 회원 수정할 수 없다.', () => {
    const adminData = { email: 'woowa123@gmail.com', name: 'hi', password: 'asdf123', passwordConfirmation: 'asdf125' };
    const test = () => validator.checkModifyAdmin(adminData);

    expect(test).toThrow(ERROR_MESSAGE.MISMATCH_PASSWORD_CONFIRMATION);
  });
});
