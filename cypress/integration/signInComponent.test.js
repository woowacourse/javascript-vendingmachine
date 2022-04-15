import { ERROR_MESSAGE } from '../../src/ts/constants/errorMessage';
import { VALID, INVALID } from './testConstant';

describe('로그인 유효성 검사', () => {
  before(() => {
    cy.visit('/');
  });

  it('메인화면에서 로그인 버튼을 누르면, 로그인 화면이 보여진다.', () => {
    cy.get('.sign-in-button').click('');
    cy.get('.sign-in-section').should('be.visible');
  });

  it('잘못된 이메일 형식의 이메일을 기입 후 확인 버튼을 누르면 에러메시지가 스넥바로 보여진다.', () => {
    cy.get('.sign-in-form__email-input').clear().type(INVALID.EMAIL);
    cy.get('.sign-in-form__password-input').clear().type(VALID.PASSWORD);

    cy.get('.sign-in-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      ERROR_MESSAGE.WRONG_FORMAT_EMAIL
    );
  });
});
