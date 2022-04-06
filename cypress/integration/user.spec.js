import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../src/ts/constants.ts';
import { getRandomNumber } from '../../src/ts/utils.ts';

describe('회원가입 및 로그인 테스트', () => {
  const baseUrl = '/index.html';
  const email = `${getRandomNumber(0, 10000000)}@gmail.com`;
  const password = 'goodpass123!';
  const name = '마르코';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('2글자에서 6글자 사이가 아닌 이름으로 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const invalidName = '김';
    cy.signup(email, invalidName, password, password);

    cy.checkToastMessage(ERROR_MESSAGE.OUT_OF_NAME_LENGTH);
  });

  it('비밀번호 확인 칸에 다른 비밀번호를 입력하여 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const differentPasswordCheck = 'wrong';
    cy.signup(email, name, password, differentPasswordCheck);

    cy.checkToastMessage(ERROR_MESSAGE.DIFFERENT_PASSWORD);
  });

  it('규칙에 어긋나는 비밀번호(7자리 이하)로 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const invalidPassword = 'abcde1';
    cy.signup(email, name, invalidPassword, invalidPassword);

    cy.checkToastMessage(ERROR_MESSAGE.INVALID_PASSWORD);
  });

  it('규칙에 어긋나는 비밀번호(17자리 이상)로 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const invalidPassword = '123456789123456789';
    cy.signup(email, name, invalidPassword, invalidPassword);

    cy.checkToastMessage(ERROR_MESSAGE.INVALID_PASSWORD);
  });

  it('규칙에 어긋나는 비밀번호(숫자 없음)로 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const invalidPassword = 'abcdef!@!';
    cy.signup(email, name, invalidPassword, invalidPassword);

    cy.checkToastMessage(ERROR_MESSAGE.INVALID_PASSWORD);
  });

  it('규칙에 어긋나는 비밀번호(특수문자 없음)로 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const invalidPassword = 'abcdef123';
    cy.signup(email, name, invalidPassword, invalidPassword);

    cy.checkToastMessage(ERROR_MESSAGE.INVALID_PASSWORD);
  });

  it('규칙에 어긋나는 비밀번호(영문자 없음)로 가입하려고 하면, 회원가입이 되지 않는다.', () => {
    const invalidPassword = '123456!@#';
    cy.signup(email, name, invalidPassword, invalidPassword);

    cy.checkToastMessage(ERROR_MESSAGE.INVALID_PASSWORD);
  });

  it('적합한 회원 정보를 입력하면, 회원가입이 되어야 한다.', () => {
    cy.signup(email, name, password, password);

    cy.checkToastMessage(SUCCESS_MESSAGE.SIGNUP_COMPLETE);
  });

  it('가입된 정확한 이메일과 비밀번호를 입력하면, 로그인되어야 한다.', () => {
    cy.login(email, password);

    cy.checkToastMessage(SUCCESS_MESSAGE.LOGIN_COMPLETE);
  });

  it('잘못된 비밀번호를 입력하면, 로그인이 되지 않는다.', () => {
    const wrongPassword = 'thisiswrong';
    cy.login(email, wrongPassword);

    cy.checkToastMessage(ERROR_MESSAGE.LOGIN_FAILED);
  });
});
