import { ERROR_MESSAGE } from '../../src/ts/constants';

describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  it('계정이 있다면 로그인을 할 수 있다.', () => {
    cy.login();

    cy.url().should('eq', 'http://localhost:9000/products');
  });

  it('계정이 없다면 에러 메세지가 보인다.', () => {
    cy.login('nonExist@email.com', 'nonExist123');

    cy.checkErrorMessage(ERROR_MESSAGE.NOT_EXIST_USER);
  });

  it('비밀번호가 틀렸다면 에러 메세지가 보인다.', () => {
    const existEmail = 'test@test.com';
    const wrongPassword = 'wrongpassword123!';

    cy.login(existEmail, wrongPassword);

    cy.checkErrorMessage(ERROR_MESSAGE.WRONG_PASSWORD_LOGIN);
  });
});
