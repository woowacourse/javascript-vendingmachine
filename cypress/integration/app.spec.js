import { ALERT_MESSAGE } from '../../src/js/constants';

describe('기본 시나리오 동작 확인', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
  });

  describe('로그인 / 회원가입 테스트', () => {
    const userEmail = `${Date.now()}@test.com`;
    const userName = 'test';
    const userPassword = '1q2w3e!!';

    it('로그인 버튼을 누르면 로그인 화면으로 이동해야한다.', () => {
      cy.get('#login-page-button')
        .click()
        .then(() => {
          cy.url().should('contain', '#!/login');
        });
    });

    it('회원가입 버튼을 누르면 회원가입 화면으로 이동해야한다.', () => {
      cy.get('#register-link')
        .click()
        .then(() => {
          cy.url().should('contain', '#!/register');
        });
    });

    it('입력창에 유효한 값을 입력하여 회원가입을 할 수 있어야한다.', () => {
      cy.get('#email-input').type(userEmail);
      cy.get('#name-input').type(userName);
      cy.get('#password-input').type(userPassword);
      cy.get('#password-check-input').type(userPassword);

      cy.get('#register-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.REGISTER_SUCCESS);
        });
    });

    it('회원가입한 계정을 입력하여 로그인을 할 수 있어야한다.', () => {
      cy.get('#email-input').type(userEmail);
      cy.get('#password-input').type(userPassword);

      cy.get('#login-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.LOGIN_SUCCESS(userName));
        });
    });
  });
});
